import mysql from './db/mysql.js';
import { docClient, QueryCommand } from './db/dynamoDB.js';
import { mqtt, iot } from 'aws-iot-device-sdk-v2';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function inputDevice() {
    try {   
        const [rows] = await mysql.query('SELECT d_id FROM device_table;');
        const all_device_ids = rows.map(item => item.d_id);

        
        if (all_device_ids.length === 0) {
            throw new Error("등록된 기기가 없습니다.");
        }

        // 모든 기기의 최신 데이터를 병렬로 쿼리
        const queries = all_device_ids.map(id => {
            const params = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                KeyConditionExpression: "device_id = :id",
                ExpressionAttributeValues: {
                    ":id": id  // ID 하나만
                },
                ScanIndexForward: false, // 최신순
                Limit: 1
            };
            return docClient.send(new QueryCommand(params));
        });
        // 실행 및 결과 합치기
        const results = await Promise.all(queries);
        
        // Items에서 실제 데이터 추출 (비어있지 않은 것만)
        const allItems = results
            .flatMap(res => res.Items)
            .filter(item => item !== undefined);

        // 모든 기기 데이터 중 전체에서 가장 최신인 것 1개 선택 (또는 정렬)
        if (allItems.length > 0) {
            // 시간순으로 한 번 더 정렬 (기기가 여러 대일 경우)
            allItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            const latest = allItems[0];
            console.log("최신 데이터 전송:", latest.device_id);

            return {
                device_id: latest.device_id,
                temp: latest.temperature,
                humi: latest.humidity,
                lux: latest.light,
            };
        } else {
            throw new Error("조회된 센서 데이터가 없습니다.");
        }
        
    } catch (err) {
        console.error("센서 데이터 조회 실패:", err);
        throw err; // 에러를 던져서 라우터의 catch문이 작동하게 함
    }
}

const certDir = path.resolve(__dirname, 'certs');

export async function sendIotCommand(topic, payload) {
    try {
        const config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
            path.join(certDir, 'smarthome.cert.pem'), // 실제 파일명으로 수정
            path.join(certDir, 'smarthome.private.key')      // 실제 파일명으로 수정
        );

        config_builder.with_certificate_authority_from_path(undefined, path.join(certDir, 'root-CA.crt'));
        config_builder.with_endpoint(process.env.AWS_IOT_ENDPOINT);
        config_builder.with_client_id("node_backend_server");

        const client = new mqtt.MqttClient();
        const connection = client.new_connection(config_builder.build());

        await connection.connect();
        
        // 메시지 전송
        await connection.publish(topic, JSON.stringify(payload), mqtt.QoS.AtLeastOnce);
        console.log(`[IoT Core] ${topic} 토픽으로 전송 완료:`, payload);

        await new Promise(resolve => setTimeout(resolve, 1500));
        await connection.disconnect();
    } catch (error) {
        console.error("IoT Core 전송 중 에러:", error);
    }
}