import fs from "fs/promises";
import { ethers } from "ethers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import pkg from "@lit-protocol/auth-helpers";
const { LitAccessControlCondition } = pkg;


const ethersWallet = new ethers.Wallet(
  "4560901e92310976371c75c3e9bcfb6512b8091594cc51021be9e13c6bc5d7bc"
);

async function encryptFile(fileName) {
  const filePath = `./${fileName}`;
  const fileContent = await fs.readFile(filePath);

  const litNodeClient = new LitNodeClient({ litNetwork: "datil-dev" });
  await litNodeClient.connect();

  // Encrypting the file
  const { encryptedData, symmetricKey } = await litNodeClient.encrypt({
    file: fileContent
  });

  const accessControlConditions = [
    new LitAccessControlCondition({
      contractAddress: "",
      chain: "ethereum",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        value: ethersWallet.address,
      },
    }),
  ];

  // Saving the encryption key
  const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    chain: "ethereum",
  });

  const encryptedFilePath = `./${fileName}.encrypted`;
  await fs.writeFile(encryptedFilePath, encryptedData);

  console.log(`File encrypted and saved as ${encryptedFilePath}`);
  return { accessControlConditions, encryptedSymmetricKey, encryptedFilePath };
}

async function decryptFile(encryptedFilePath, accessControlConditions, encryptedSymmetricKey) {
  const fileContent = await fs.readFile(encryptedFilePath);

  const litNodeClient = new LitNodeClient({ litNetwork: "datil-dev" });
  await litNodeClient.connect();

  // Retrieving the encryption key
  const symmetricKey = await litNodeClient.getEncryptionKey({
    accessControlConditions,
    toDecrypt: encryptedSymmetricKey,
    chain: "ethereum",
  });

  // Decrypting the file
  const decryptedData = await litNodeClient.decrypt({
    file: fileContent,
    symmetricKey
  });

  const decryptedFilePath = `./${encryptedFilePath.replace(".encrypted", ".decrypted")}`;
  await fs.writeFile(decryptedFilePath, decryptedData);

  console.log(`File decrypted and saved as ${decryptedFilePath}`);
  return decryptedFilePath;
}

async function main() {
  const fileName = "IPODetails.json";

  const { accessControlConditions, encryptedSymmetricKey, encryptedFilePath } =
    await encryptFile(fileName);

  await decryptFile(encryptedFilePath, accessControlConditions, encryptedSymmetricKey);
}

main().catch((error) => {
  console.error("Error:", error);
});
