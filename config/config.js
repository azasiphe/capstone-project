import { config } from 'dotenv';

import mysql from 'mysql2';

config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}).promise();
 
export{pool}
