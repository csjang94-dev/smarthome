import express from 'express';
import path from 'path';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { inputDevice } from './utils.js';
import authRouter from './routes/auth.js';
import { sendIotCommand } from './utils.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors()); // 명령어를 입력하면 문제가 해결된다.
app.use(express.json());

// 정적 파일 제공 (public 폴더)
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

// 모든 페이지 호스팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRouter);



app.post('/sensor/data', async (req, res) => {
    try {

        const sensorData = await inputDevice();

        res.json({ 
            temp_data: sensorData.temp, 
            humi_data: sensorData.humi,
            lux_data: sensorData.lux
        });
        
    
        } catch (error) {
            res.status(500).json({ 
                message: `센서값 불러오는데 오류가 발생했습니다.`, 
                error: error.message 
            });
        }
});

app.post('/sensor/command', async (req, res) => {
    try {
        console.log("--- 센서 커맨드 시작 ---");
        const command = req.body;
        const topic = 'sensor/command'; // 변수 선언 추가

        console.log("AWS IoT Core 전송 진입...");
        
        // AWS IoT Core로 명령 전송
        await sendIotCommand(topic, command);
        
        console.log("AWS IoT Core 전송 완료!");

        // ✨ 핵심: 브라우저에게 성공 응답을 보내야 합니다.
        return res.json({ 
            success: true, 
            message: "라즈베리파이로 명령이 전달되었습니다." 
        });

    } catch (error) {
        console.error("센서 커맨드 에러:", error);
        // 이미 헤더가 전송되었는지 확인 후 에러 응답
        if (!res.headersSent) {
            return res.status(500).json({ 
                success: false,
                message: "센서값 전달에 문제가 있습니다.", 
                error: error.message 
            });
        }
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


