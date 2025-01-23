import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid"

export async function POST(req) {
    const data = await req.formData()
    //console.log(data)
    if (data.get('file')) {
        const file = data.get('file');
        const s3CLient = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });
        //console.log (s3CLient)
        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;
        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks)
        const bucket = 'burger-shop'
        // console.log({ ext })
        // console.log(newFileName)
        await s3CLient.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: buffer,
        }))
        const link = 'https://' + bucket + '.s3.amazonaws.com/' + newFileName;
        console.log('Generated S3 URL:', link);
        return Response.json(link);
    }
    return Response.json(true)
} 