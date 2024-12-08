const encryptedPdf = await encryptFile(
  {
      file: pdfBuffer, // Pass the PDF buffer
      accessControlConditions, // Define access controls
  },
  litNodeClient
);