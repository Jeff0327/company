import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const filePath = body.filePath;

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
  });

  async function generateV4ReadSignedUrl(filePath: string) {
    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    try {
      const [url] = await storage
        .bucket(process.env.BUCKET_NAME || "threemodel")
        .file(filePath)
        .getSignedUrl(options);

      return url;

      
    } catch (error) {
      console.error("Error generating signed URL:", error);
      throw error;
    }
  }

  try {
    if (!filePath) {
      return NextResponse.json({ error: "File path is required" }, { status: 400 });
    }

    const signedUrl = await generateV4ReadSignedUrl(filePath);
    return NextResponse.json({ signedUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
  }
}
