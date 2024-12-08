import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
const API_BASE_URL = "http://localhost:8000";


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
