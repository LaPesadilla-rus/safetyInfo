
const express = require('express');
const app = express();

const {Pool} = require('pg');

const conn = require('./db_con.js');
const pool = new Pool (conn.conn_str);

const skladController = require('./controllers/sklad.js');
const sprController = require('./controllers/spr.js');
const authController = require('./controllers/auth.js');


app.use(express.json());

//Промежуточный обработчик для авторизации. Проверка наличия токена в заголовках и сверяет его в базе
app.use( async function (req, res, next) {
    var sql = '';
    var data = [];
    //console.log()
    sql = `SELECT * FROM users WHERE us_id = `+req.headers.us_id+` and us_rt = '`+req.headers.rt+`'`;
    //console.log(sql)
    await pool.query(sql).then (
        (res) => {
            data = res.rows;
        }
    ).catch(function(err) {
    });
    if (data.length > 0 || req.originalUrl === '/auth/login' || req.originalUrl === '/auth/out' || req.originalUrl === '/auth/logCheck'){
        next()
    }else{
        let date = '';
        date = new Date().getTime();
        console.log('ALERT user_id:' + req.headers.us_id+ ' URL:' + req.originalUrl + ' TIME:' + date);
        res.sendStatus(403)
    }
  });

//---------------------------------------- AUTH

app.post('/auth/login', authController.login);
app.post('/auth/logCheck', authController.logCheck);
app.get('/auth/access', authController.access);

app.get('/auth/out', authController.authOut);

//----------------------------------------
app.get('/sklad/all', skladController.all);
app.get('/sklad/new/type', skladController.type);
app.get('/sklad/new/provider', skladController.provider);
app.get('/sklad/new/marka', skladController.marka);
app.get('/sklad/new/units', skladController.units);
app.get('/sklad/new/kat', skladController.kat);
app.get('/sklad/kat', skladController.kat2);
app.get('/sklad/out_data', skladController.out_data);

app.get('/spr/downloadFromFile', skladController.downlFrFile);

app.post('/sklad/download', skladController.sklad_download);

app.post('/sklad/all', skladController.filterAll);
app.post('/sklad/new/save', skladController.sklad_save);
app.post('/sklad/new/update', skladController.sklad_update);
app.post('/sklad/new/type', skladController.type_post);
app.post('/sklad/out', skladController.sklad_out);
app.post('/sklad/out_file', skladController.out_file);
//------------------------------
app.post('/equip/save', skladController.equip_save);
//--------------------------------
//------------------------------
// SPR
app.get('/spr/all', sprController.all);
app.get('/spr/kat', sprController.kat);
app.get('/spr/type', skladController.type_a);
app.get('/spr/equip_name', sprController.equip_name);
app.get('/spr/equip_all', sprController.equip_all);
app.get('/spr/equip/fullname', sprController.equip_fullname);
app.get('/spr/filter_data', sprController.filterData);

app.post('/spr/equip', sprController.equip)
app.post('/spr/save', sprController.spr_save);
app.post('/spr/update', sprController.spr_update);
app.post('/equip/update', sprController.equip_update);

app.post('/spr/relation/add', sprController.relation_add);
app.post('/spr/relation/watch', sprController.watch);

app.post('/users/new', sprController.newUser);
app.post('/users/upd', sprController.updUser);
app.get('/user/list', sprController.userList);

app.delete('/spr/delete', sprController.spr_delete);

app.listen(4001, function() {
    console.log('SKLAD SERVER IS RUNNING');
});
