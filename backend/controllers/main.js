const Main = require('../models/main.js');

exports.all = async (req, res) => {
    let data = [];
    await Main.all((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = docs.rows;
    });
    for(let i = 0; i< data.length; i += 1){
        await Main.persFromId(data[i], (err, docs) =>{
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            data[i].ma_fio = docs.rows[0].pe_fio;
            data[i].ot_name = docs.rows[0].ot_name;
        }); 
    }
    return res.send(data);
};

exports.data = async (req, res) => {
    let data = {};

    await Main.kontragents((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.contr = docs.rows;
    });
    await Main.spr_org((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_org = docs.rows;
    });
    await Main.spr_pc((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_pc = docs.rows;
    });
    await Main.personal((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.personal = docs.rows;
    });
    return res.send(data);
}

exports.insert = (req, res) => {
    Main.insert(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}