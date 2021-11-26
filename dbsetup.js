const { Pool } = require('pg');
const fs = require('fs');

require('dotenv').config();
let create_db_structure_sql = fs.readFileSync('db.sql').toString();
const connectionString = `postgres://rrdzfiasjwpwvp:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;
const connection={
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL: connectionString,
    ssl: {rejectUnauthorized: false}
}
const pool = new Pool(connection);
pool.query(create_db_structure_sql)
    .then(x => console.log('The database tables created successfully.'))
    .catch(e => {
        console.log("error in creating the table")
        console.log(e);})
    
