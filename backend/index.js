
const express = require('express');
const app = express();

const {Pool} = require('pg');

const conn = require('./db_con.js');
const pool = new Pool (conn.conn_bahos);

const skladController = require('./controllers/sklad.js');
const sprController = require('./controllers/spr.js');
const authController = require('./controllers/auth.js');

const mainController = require('./controllers/main');


app.use(express.json());
//-----------------------------------------------------------

//Промежуточный обработчик для авторизации. Проверка наличия токена в заголовках и сверяет его в базе
app.use( async function (req, res, next) {
    var sql = '';
    var data = [];
    sql = `SELECT * FROM users WHERE us_id = `+req.headers.us_id+` and us_rt = '`+req.headers.rt+`' and us_progr='SAFETYINFO'`;
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
        console.log('ALERT us_id:' + req.headers.us_id+ ' URL:' + req.originalUrl + ' TIME:' + date);
        res.sendStatus(403)
    }
  });

//---------------------------------------- AUTH

app.post('/auth/login', authController.login);
app.post('/auth/logCheck', authController.logCheck);
app.get('/auth/access', authController.access);

app.get('/auth/out', authController.authOut);

//---------------------------------------- MAIN FORM

app.get('/main/all', mainController.all); // главная таблицы
app.get('/main/data', mainController.data); // данные для ввода в главную таблицу
app.get('/main/ArchAll',mainController.ArchAll)//архивная таблица
app.get('/main/kontragents',mainController.kontragents)//Справочник контрагентов
app.get('/main/spr_skzi',mainController.spr_skzi)// Справочник наименования скзи
app.get('/main/spr_pc',mainController.spr_pc)//Справочник компов
app.get('/main/spr_inf_sys',mainController.spr_inf_sys)//Справочник систем
app.get('/main/spr_org',mainController.spr_org)//Справочник организаций
app.get('/main/spr_otdel',mainController.spr_otdel)//Справочник организаций


app.post('/main/filterAll', skladController.filterAll);
app.post('/main/insertNaim', mainController.insertNaim);
app.post('/main/insertPC', mainController.insertPC);
app.post('/main/insertFrom', mainController.insertFrom);
app.post('/main/insertSyst', mainController.insertSyst);
app.post('/main/insertOtd', mainController.insertOtd);
//app.post('/main/kontr', mainController.kontr);

app.post('/main/DeleteNaim',mainController.DeleteNaim)
app.post('/main/DeleteOrg',mainController.DeleteOrg)
app.post('/main/DeletePC',mainController.DeletePC)
app.post('/main/DeleteSys',mainController.DeleteSys)
app.post('/main/DeleteKontr',mainController.DeleteKontr)
app.post('/main/DeleteOtd',mainController.DeleteOtd)

app.post('/main/insert', mainController.insert);
app.post('/main/kontrs', mainController.kontrs);
app.post('/main/InsertArch', mainController.InsertArch);// Перенос в архив
app.post('/main/DeleteMain_tab', mainController.DeleteMain_tab);// Удаление строки из общей таблицы для переноса в архив
app.post('/main/InsertFrArcToMain', mainController.InsertFrArcToMain);// Перенос в основную таблицу
app.post('/main/DeleteArch_tbl', mainController.DeleteArch_tbl);// Удаление строки из архивной таблицы для переноса в основную
app.post('/main/Prim1Up',mainController.Prim1Up) // изменение примечания 1
app.post('/main/Prim2Up',mainController.Prim2Up) // изменение примечания 2  
app.post('/main/UpdateRow',mainController.UpdateRow) // изменение примечания 2  
//---------------------------------------- SPR
/*app.get('/sklad/all', skladController.all);
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
app.post('/equip/save', skladController.equip_save);*/
//--------------------------------
//------------------------------
// SPR
/*app.get('/spr/all', sprController.all);
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
app.post('/spr/relation/watch', sprController.watch);*/

app.post('/users/new', sprController.newUser);
app.post('/users/upd', sprController.updUser);
app.get('/user/list', sprController.userList);

//app.delete('/spr/delete', sprController.spr_delete);

app.listen(4001, function() {
    console.log('SAFETY_INFO SERVER IS RUNNING');
});
