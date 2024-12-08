
import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
// const API_BASE_URL = "http://localhost:8000";
// const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(method, endpoint, data = null) {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}
export async function GET() {
    
    const buckets = await apiRequest('GET', '/buckets');

    // get the names of all the buckets
    const bucketNames = buckets.data.map(bucket => bucket.Name);
    console.log(bucketNames);
    if(bucketNames.length === 0) {
        return NextResponse.json({ message: 'No buckets found' });
    }
    // if(bucketNames.startsWith('company-')) {
        
    // }

    // const details = apiRequest('GET', '/buckets');
    // console.log(details);
    // let litNodeClient;
    // litNodeClient = await getLitNodeClient();
    
    return NextResponse.json({ message: bucketNames });

 }


// async function apiRequest(method, endpoint, data = null) {
  
// }