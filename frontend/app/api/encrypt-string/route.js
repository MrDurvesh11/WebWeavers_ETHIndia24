import { NextResponse } from 'next/server';
// import axios from 'axios';
import fs from 'fs';
import path from 'path';
// import FormData from 'form-data';

import { LIT_ABILITY } from "@lit-protocol/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { getEnv, getLitNodeClient } from "./utils.js";
import crypto from 'crypto';
// global.crypto = crypto; // Make crypto globally available

import {
    createSiweMessage,
    generateAuthSig,
    LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
import { LIT_NETWORK, LIT_RPC } from "@lit-protocol/constants";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
// import { encryptString, decryptToString } from "lit-protocol/encryption";
// import {decryptToString} from "@lit-protocol/encryption";
import { runExample } from "./test5.js";
import { ethers } from "ethers";
const ethersWallet = new ethers.Wallet('4560901e92310976371c75c3e9bcfb6512b8091594cc51021be9e13c6bc5d7bc');


export async function POST(request) {
   const data = await request.json();
   console.log('Data:', data);
   let litNodeClient;
   litNodeClient = await getLitNodeClient();
   const { ciphertext, dataToEncryptHash, accessControlConditions } = await runExample(data.Data);
   console.log(`ℹ️  ciphertext: ${ciphertext}`);
   console.log(`ℹ️  dataToEncryptHash: ${dataToEncryptHash}`);
   console.log(`ℹ️  accessControlConditions: ${accessControlConditions}`);

    return new Response(JSON.stringify({ ciphertext, dataToEncryptHash, accessControlConditions }), {
        headers: {
            'content-type': 'application/json',
        },
    });
}

