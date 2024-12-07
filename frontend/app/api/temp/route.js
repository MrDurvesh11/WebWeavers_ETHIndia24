import { NextResponse } from 'next/server';

export async function POST(request) {
    // get the file from request form data
    const formData = await request.formData();
    const file = formData.get('file');
    console.log('file', file.name);

    // return the file name
    return NextResponse.json({ fileName: file.name });
}
