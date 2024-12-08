import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { encryptFile, decryptToString, decryptToFile, encryptString } from "@lit-protocol/encryption";
import { LIT_ABILITY } from "@lit-protocol/constants";
import { ethers } from "ethers";

import {
  createSiweMessage,
  generateAuthSig,
  LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
import fs from 'fs';
import { Blob } from 'buffer';
import { getEnv, getEthersSigner, getLitNodeClient } from "./utils.js";

const ETHEREUM_PRIVATE_KEY = "4560901e92310976371c75c3e9bcfb6512b8091594cc51021be9e13c6bc5d7bc";
const ethersWallet = new ethers.Wallet('4560901e92310976371c75c3e9bcfb6512b8091594cc51021be9e13c6bc5d7bc');

async function decryptData(ciphertext, dataToEncryptHash, accessControlConditions) {
  // Initialize LitNodeClient
  const litNodeClient = new LitNodeClient({
    litNetwork: "datil-dev",
    debug: false,
  });
  await litNodeClient.connect();

  // Get session signatures
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: "ethereum",
    expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
    resourceAbilityRequests: [
      {
        resource: new LitAccessControlConditionResource('*'),
        ability: LIT_ABILITY.AccessControlConditionDecryption,
      },
    ],
    authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
      const toSign = await createSiweMessage({
        uri,
        expiration,
        resources: resourceAbilityRequests,
        walletAddress: ethersWallet.address,
        nonce: await litNodeClient.getLatestBlockhash(),
        litNodeClient,
      });

      return await generateAuthSig({
        signer: ethersWallet,
        toSign,
      });
    },
  });
  const decryptedString = await decryptToString(
      {
        accessControlConditions,
        chain: "ethereum",
        ciphertext,
        dataToEncryptHash,
        sessionSigs,
      },
      litNodeClient,
    );

  // Decrypt the message
  // const decryptedString = await LitJsSdk.decryptToString(
  //   {
  //     chain: "ethereum",
  //     ciphertext,
  //     dataToEncryptHash,
  //     accessControlConditions,
  //     sessionSigs,
  //   },
  //   litNodeClient
  // );
  // const textDecoder = new TextDecoder();
  console.log(`ℹ️  decryptedString: ${decryptedString}`);
  // decrypt the data

  
  const decryptedString2 = textDecoder.decode(new Uint8Array(decryptedString.decryptedData));
  console.log(`ℹ️  decryptedString: ${decryptedString2.toString()}`);
  console.log(`ℹ️  decryptedString: ${decryptedString.decryptedData}`);
  return decryptedString;
}
export const runExample = async () => {
  let litNodeClient;

  try {
    const ethersSigner = getEthersSigner(ETHEREUM_PRIVATE_KEY);
    litNodeClient = await getLitNodeClient();

    // Function to read PDF file and return buffer
    // function readPdfFile(filePath) {
    //   try {
    //     const fileBuffer = fs.readFileSync(filePath); // Read as binary buffer
    //     return fileBuffer;
    //   } catch (err) {
    //     console.error(`Error reading PDF file at ${filePath}:`, err);
    //     return null;
    //   }
    // }

    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: await ethersSigner.getAddress(),
        },
      },
    ];

    // Read PDF file
    const pdfFilePath = 'GATE.pdf'; // Path to the PDF file to encrypt
    const pdfData = readPdfFile(pdfFilePath);
    if (!pdfData) {
        throw new Error(`Failed to read PDF file at ${pdfFilePath}`);
    }

    // Convert PDF data to Blob
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

    // Encrypt the PDF file
    const encryptedPdf = await encryptString(
      {
        file: pdfBlob, // Pass the Blob here
        accessControlConditions, // Define access controls
      },
      litNodeClient
    );

    // Check the type of encryptedPdf and ensure it is in the correct format (Buffer or Array)
    if (!Buffer.isBuffer(encryptedPdf)) {
      console.error("Encrypted data is not in Buffer format:", encryptedPdf);
     
    }

    // Save encrypted file
    const encryptedFilePath = "GATE.pdf.encrypted"; // Save with .encrypted extension
    // await fs.promises.writeFile(encryptedFilePath, encryptedPdf);

    console.log("PDF encrypted successfully and saved to:", encryptedFilePath);
    // await decryptData(encryptedPdf.ciphertext, encryptedPdf.dataToEncryptHash, accessControlConditions);

   
  } catch (error) {
    console.error(error);
  }
}

await runExample();
