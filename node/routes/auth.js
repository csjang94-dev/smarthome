import express from 'express';
import mysql from '../db/mysql.js';

const router = express.Router();


router.post('/login', async (req, res) => {
    // 가져온 데이터가 제대로 전달 됐는지 확인하기 위해서 try 밖에서 접근
    // 안에서 처리하면 catch에서 접근이 불가능하다.
    const { u_id, u_pw_hash } = req.body;

    console.log(`로그인 시도 아이디: ${u_id}`);
    console.log(`로그인 시도 비밀번호: ${u_pw_hash}`);
    
    try {
        const [rows] = await mysql.query('SELECT * FROM user_table WHERE u_id = ?', [u_id]);

        if ( (u_id === rows[0].u_id && u_pw_hash === rows[0].u_pw_hash) ) {
          res.json({ 
            success: true, 
            message: "로그인 성공!",
            user: u_id
          });
        } else {
          res.json({ success: false, message: "아이디가 존재하지 않거나 비밀번호가 틀렸습니다." });
        }

    } catch (error) {
        // 쿼리 실행 중 오류 발생 시
        console.error('DB 쿼리 실행 오류 발생:', error);
        res.status(500).json({ 
            success: false, 
            message: `DB 연결 또는 쿼리 실행에 문제가 있습니다.${rows[0]}`, 
            error: error.message 
        });
    }
});

router.post('/signup', async (req, res) => {
    // 가져온 데이터가 제대로 전달 됐는지 확인하기 위해서 try 밖에서 접근
    // 안에서 처리하면 catch에서 접근이 불가능하다.
    const { u_id, u_pw_hash, u_name, u_p_number, u_email } = req.body;

    try {
        const query = `
            INSERT INTO user_table (u_id, u_pw_hash, u_name, u_p_number, u_email) 
            VALUES (?, ?, ?, ?, ?)`;

        const [result] = await mysql.query(query, [u_id, u_pw_hash, u_name, u_p_number, u_email]);
        console.log("가입 결과:", result);
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

export default router;


