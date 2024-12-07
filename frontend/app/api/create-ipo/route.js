import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

const API_BASE_URL = "http://localhost:8000";

export async function POST(request) {
    const data = await request.json();

    // Path to store the IPO details as a text file
    const filePath = path.resolve('./IPODetails.json');
    
    // Write the received IPO details to the text file
    const fileData = JSON.stringify(data);

    // let encryptResponse;
    try {
        // Send the file to the server using Axios
        const encryptResponse = await axios.post("http://localhost:3000/api/encrypt-string", fileData );
        const data2 = encryptResponse.data;
        console.log('Upload successful:', data2);
        fs.writeFileSync(filePath, JSON.stringify(data2));
        console.log("Encrypted The Data :) ");

        const bucketName = data.ipoName.replace(/ /g, '-').toLowerCase();
    
        const bucket = await createBucket(bucketName);
        // Now upload the file to the bucket
        const file = await uploadFile(bucketName, filePath);
    
        return NextResponse.json({ message: 'IPO created successfully' , file, bucket });
    } catch (error) {
        console.error('Error in API:', error.response ? error.response.data : error.message);
        return NextResponse.json({ message: 'ERROR' });

    }
    
    // const encryptResponse = await axis.post("/api/encrypt-string", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ fileData: JSON.stringify(data) }),
    // });

    // if (!encryptResponse.ok) {
    //     throw new Error('Failed to encrypt the data');
    // }

    // const encryptedData = await encryptResponse.json();
   
}

async function uploadFile(bucketName, filePath) {
    const form = new FormData();
    
    // Append the file to the form-data object
    form.append('file', fs.createReadStream(filePath));

    try {
        // Send the file to the server using Axios
        const response = await axios.post(`${API_BASE_URL}/buckets/${bucketName}/files`, form, {
            headers: form.getHeaders() // Automatically set correct headers for multipart/form-data
        });
        console.log('Upload successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
    }
}

async function createBucket(bucketName) {
    try {
        // Send a POST request to create a new bucket
        const response = await axios.post(`${API_BASE_URL}/buckets`, { bucketName });
        console.log('Bucket created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating bucket:', error.response ? error.response.data : error.message);
    }
}