import 'dotenv/config';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

// DynamoDB 클라이언트 설정
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// DocumentClient 생성
const docClient = DynamoDBDocumentClient.from(client);

// 다른 파일에서 쓸 수 있도록 export
export { docClient, PutCommand, QueryCommand };