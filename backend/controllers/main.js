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
    return res.send(data);
};

exports.filterAll = function(req, res) {
    Main.filterAll(req.body.data, function(err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
};

exports.filterAllArch = function(req, res) {
    Main.filterAllArch(req.body.data, function(err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
};


exports.ArchAll = async (req, res) => {
    let data = [];
    await Main.ArchAll((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = docs.rows;
    });
    return res.send(data);
};

exports.data = async (req, res) => {
    let data = {};

    await Main.spr_inf_sys(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_syst = docs.rows;
    });

    await Main.spr_otdel(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_otdel = docs.rows;
    });

    await Main.skzi(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.skzi = docs.rows;
    });
    await Main.spr_skzi(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_skzi = docs.rows;
    });

    await Main.kontragents(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.contr = docs.rows;
    });
    await Main.spr_org(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_org = docs.rows;
    });
    await Main.spr_pc(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.spr_pc = docs.rows;
    });
    await Main.personal(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.personal = docs.rows;
    });

    await Main.spr_pers(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.chain = docs.rows;
    });

    await Main.personals(req,(err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.personals = docs.rows;
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

exports.Prim1Up =function(req, res)
{
    Main.Prim1Up(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.Prim2Up =function(req, res)
{
    Main.Prim2Up(req.body.data1 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.kontragents =function(req, res)
{
    Main.kontragents(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.spr_skzi =function(req, res)
{
    Main.spr_skzi(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.skzi =function(req, res)
{
    Main.skzi(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.spr_pc =function(req, res)
{
    Main.spr_pc(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.spr_inf_sys =function(req, res)
{
    Main.spr_inf_sys(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.spr_otdel =function(req, res)
{
    Main.spr_otdel(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.spr_ktr =function(req, res)
{
    Main.spr_ktr(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.spr_org =function(req, res)
{
    Main.spr_org(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.insertNaim = (req, res) => {
    Main.insertNaim(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}

exports.insertPC = (req, res) => {
    Main.insertPC(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}

exports.insertFrom = (req, res) => {
    Main.insertFrom(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}

exports.insertSyst= (req, res) => {
    Main.insertSyst(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}


exports.insertOtd= (req, res) => {
    Main.insertOtd(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}

exports.DeleteNaim = (req, res) => {
    Main.DeleteNaim(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.DeletePC= (req, res) => {
    Main.DeletePC(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}
exports.DeleteOrg= (req, res) => {
    Main.DeleteOrg(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}
exports.DeleteSys= (req, res) => {
    Main.DeleteSys(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.DeleteOtd= (req, res) => {
    Main.DeleteOtd(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.DeletePers= function(req, res) {
    Main.DeletePers(req, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('DELETE COMPLITE')
    });
    return 0;
}

exports.DeleteKontr= function(req, res)  {
    Main.DeleteKontr(req, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.DeleteSKZI= function(req, res)  {
    Main.DeleteSKZI(req, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.InsertArch= (req, res) => {
    Main.InsertArch(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}
exports.DeleteMain_tab= (req, res) => {
    Main.DeleteMain_tab(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.DeleteKTR= (req, res) => {
    Main.DeleteKTR(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('DELETE COMPLITE')
    });
    return 0;
}

exports.InsertFrArcToMain= (req, res) => {
    Main.InsertFrArcToMain(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    return 0;
}
exports.DeleteArch_tbl= (req, res) => {
    Main.DeleteArch_tbl(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('Delete COMPLITE')
    });
    return 0;
}

exports.InsertKTR =function(req, res)
{
    Main.InsertKTR(req ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    })
}


exports.spr_pers =function(req, res)
{
    Main.spr_pers(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.InsertSKZI =function(req, res)
{
    Main.InsertSKZI(req ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    })
}

exports.insertChain_pers =function(req, res)
{
    Main.insertChain_pers(req ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    })
}

exports.kontrs = function (req, res) {
    
 Main.InsertKontr(req, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('INSERT COMPLITE')
    });
    
}

exports.UpdateRow =function(req, res)
{
    Main.UpdateRow(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.UpdateNaim =function(req, res)
{
    Main.UpdateNaim(req.body.data1 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('UPDATE COMPLITE')
    })
}
exports.UpdateOtd =function(req, res)
{
    Main.UpdateOtd(req.body.data1 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.UpdateSyst =function(req, res)
{
    Main.UpdateSyst(req.body.data1 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.UpdateFrom =function(req, res)
{
    Main.UpdateFrom(req.body.data1 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.UpdatePC =function(req, res)
{
    Main.UpdatePC(req.body.data1 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}
exports.UpdateInv_num =function(req, res)
{
    Main.UpdateInv_num(req.body.data2 ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.UpdatePers =function(req, res)
{
    Main.UpdatePers(req.body.datas ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send('UPDATED');
    })
}

exports.UpdateKTR= (req, res) => {
    Main.UpdateKTR(req, (err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('UPDATE COMPLITE')
    });
    return 0;
}
exports.UpdateKontr= function(req, res) {
    Main.UpdateKontr(req.body.data, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('UPDATE COMPLITE')
    });
    return 0;
}
exports.UpdateSKZI= function(req, res) {
    Main.UpdateSKZI(req.body.data, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send('UPDATE COMPLITE')
    });
    return 0;
}