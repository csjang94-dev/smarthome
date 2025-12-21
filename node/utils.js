import mysql from './db/mysql.js';
import { docClient, ScanCommand } from './db/dynamoDB.js';

export async function getAllSensorData() {
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME, // .env에 정의한 테이블명
    };

    try {
        const data = await docClient.send(new ScanCommand(params));
        console.log("센서 데이터 조회 성공");
        
        const all_device_data = await mysql.query('SELECT d_id FROM device_table;');
        const all_device_ids = all_device_data[0].map(item => item.d_id);

        for (const item of data.Items)
        {
            if (item['device_id'].includes(all_device_ids)) {
                return item['device_id'];
            } else {
                console.log("새로운 디바이스를 발견했습니다!");
                console.log(all_device_ids);
                const query = `
                    INSERT IGNORE INTO device_table (d_id)
                    VALUES (?)`;
                await mysql.query(query, [item['device_id']]);
                console.log("데이터베이스에 새로운 디바이스 정보를 넣었습니다.");
            }
        }
        
    } catch (err) {
        console.error("센서 데이터 조회 실패:", err);
    }
}
