const mysql = require('mysql2');
const express = require('express');
const app = express();
const userInfo = require('./userInfo')
const connection = mysql.createConnection(userInfo);

app.set('port', process.env.PORT || 4000);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Request-Method', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Secrete_Token');
    next();
});

app.get('/hwahae/3', (req, res, next) => {
    connection.query('SELECT hobbys FROM hobbys_list_3', (err, rows) => {
        if(err) console.log('Error', err);
        const result = rows.map(v => v.hobbys);
        res.send(result);
    });
});

app.get('/hwahae/100', (req, res, next) => {
    connection.query('SELECT hobbys FROM hobbys_list_100', (err, rows) => {
        if(err) console.log('Error', err);
        const result = rows.map(v => v.hobbys);
        res.send(result);
    });
});

app.get('/hwahae/10000', (req, res, next) => {
    connection.query('SELECT hobbys FROM hobbys_list_10000', (err, rows) => {
        if(err) console.log('Error', err);
        const result = rows.map(v => v.hobbys);
        res.send(result);
    });
});

app.listen(app.get('port'), () => {
    console.log('server connect');
});