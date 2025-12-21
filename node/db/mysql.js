import mysql from 'mysql2';
import 'dotenv/config';



const pool = mysql.createPool({
    host: process.env.DB_HOST,         // .env 파일의 DB_HOST 값 사용
    user: process.env.DB_USER,         // .env 파일의 DB_USER 값 사용
    password: process.env.DB_PASSWORD, // .env 파일의 DB_PASSWORD 값 사용
    database: process.env.DB_DATABASE, // .env 파일의 DB_DATABASE 값 사용
    timezone: '+09:00',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
});

export default pool.promise();