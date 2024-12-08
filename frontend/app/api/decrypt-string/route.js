// import { NextResponse } from 'next/server';
// // import axios from 'axios';
// import fs from 'fs';
// import path from 'path';
// import FormData from 'form-data';
import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LIT_ABILITY } from "@lit-protocol/constants";
// import * as LitJsSdk from "@lit-protocol/lit-node-client";
// import { getEnv, getLitNodeClient } from "./utils.js";
import crypto from 'crypto';
// global.crypto = crypto; // Make crypto globally available

import {
    createSiweMessage,
    generateAuthSig,
    LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
// import { LIT_NETWORK, LIT_RPC } from "@lit-protocol/constants";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
// import { encryptString, decryptToString } from "lit-protocol/encryption";
// import {decryptToString} from "@lit-protocol/encryption";
// import { runExample } from "./test5.js";
import { ethers } from "ethers";
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
    console.log(`ℹ️  decryptedString: ${decryptedString}`);

    const textDecoder = new TextDecoder();
    const decryptedString2 = textDecoder.decode(new Uint8Array(decryptedString.decryptedData));
    // console.log(`ℹ️  decryptedString: ${decryptedString2}`);
    return decryptedString;
}

export async function POST(request) {
    const data = await request.json();
    // let litNodeClient;
    // litNodeClient = await getLitNodeClient();
    const descryptedString = await decryptData(data.ciphertext, data.dataToEncryptHash,data.accessControlConditions);
     return new Response(JSON.stringify({ descryptedString }), {
         headers: {
             'content-type': 'application/json',
         },
     });
 }