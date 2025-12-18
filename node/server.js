import express from 'express';
import path from 'path';
import cors from 'cors'
import { fileURLToPath } from 'url';
import db from './db.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors()); // 명령어를 입력하면 문제가 해결된다.

// 정적 파일 제공 (public 폴더)
app.use(express.static(path.join(__dirname)));

// 모든 페이지 호스팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/db', async (req, res) => {
    try {
        const rows = await db.query('DESCRIBE UserTable');

        res.json({ 
            success: true, 
            message: 'DB 쿼리 실행 성공. 결과는 서버 콘솔을 확인하세요.',
            result: rows[0]
        });

    } catch (error) {
        // 쿼리 실행 중 오류 발생 시
        console.error('DB 쿼리 실행 오류 발생:', error);
        res.status(500).json({ 
            success: false, 
            message: 'DB 연결 또는 쿼리 실행에 문제가 있습니다.', 
            error: error.message 
        });
    }
});

// app.get('/api/main', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/api/login', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// app.get('/api/sighup', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


