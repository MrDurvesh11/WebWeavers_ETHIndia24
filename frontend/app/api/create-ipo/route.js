import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

const API_BASE_URL = process.env.BASE_URL;

export async function POST(request) {
    const data = await request.json();

    // Path to store the IPO details as a text file
    const filePath = path.resolve('./IPODetails.json');
    
    // Write the received IPO details to the text file
    let fileData = JSON.stringify(data);
    // heramb
    fs.writeFileSync(filePath, fileData);

    const bucketName = data.ipoName.replace(/ /g, '-').toLowerCase();

    const bucket = await createBucket(bucketName);
    // Now upload the file to the bucket
    const file = await uploadFile(bucketName, filePath);

    return NextResponse.json({ message: 'IPO created successfully' , file, bucket });
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