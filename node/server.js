import express from 'express';
import path from 'path';
import * as fs from 'node:fs/promises';
import cors from 'cors'
import { fileURLToPath } from 'url';

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


