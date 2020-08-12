const {Pool} = require('pg');
const conn = require('../db_con.js');
const pool = new Pool (conn.conn_saf);
const pool_bahos = new Pool (conn.conn_bahos);

exports.all =  async (cb) => {
    await pool.query(`SELECT ss.ss_name as skzi_name, ins.ins_name as inf_name, 
                        sk.sk_ver as skzi_ver, sk.sk_serial as skzi_ser, 
                        kt.kt_name as ktr_name, kg.kg_dgvr, kg.kg_kol, sk.sk_srok,
                        kg.kg_arch , pc.pc_name,pc.pc_inv_num,ot.otdel_name as otdel, og.og_name as org_name, to_char(io.io_date1, 'YYYY-MM-DD') as io,
                        io.*
                        
                        FROM info_safe io
                        
                        inner join spr_pc pc
                        on pc.pc_id = io.io_pc_id
                        
                        inner join spr_org og
                        on og.og_id = io.io_org_id
                        
                        inner join kontragents kg
                        on kg.kg_id = io.io_ktr_id
                        
                        inner join spr_ktr kt
                        on kt.kt_id = kg.kg_name_id
                        
                        inner join skzi sk
                        on sk.sk_id = kg.kg_skzi_id
                        
                        inner join spr_skzi ss
                        on ss.ss_id = sk.sk_name_id
                        
                        inner join spr_inf_sys ins
                        on ins.ins_id = sk_inf_id 

                        inner join spr_otdel ot
                        on ot.otdel_id = io.io_id 
                        
                        Order by io_id
        `).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};


exports.ArchAll =  async (cb) => {
    await pool.query(`SELECT ss.ss_name as skzi_name, ins.ins_name as inf_name, 
                        sk.sk_ver as skzi_ver, sk.sk_serial as skzi_ser, 
                        kt.kt_name as ktr_name, kg.kg_dgvr, kg.kg_kol, sk.sk_srok,
                        kg.kg_arch , pc.pc_name,pc.pc_inv_num,
                        ot.otdel_name as otdel, og.og_name as org_name,
                         to_char(ar.a_date1, 'YYYY-MM-DD') as ad,
                        ar.*
                        
                        FROM arch_safe ar
                        
                        inner join spr_pc pc
                        on pc.pc_id = ar.a_pc_id
                        
                        inner join spr_org og
                        on og.og_id = ar.a_org_id
                        
                        inner join kontragents kg
                        on kg.kg_id = ar.a_ktr_id
                        
                        inner join spr_ktr kt
                        on kt.kt_id = kg.kg_name_id
                        
                        inner join skzi sk
                        on sk.sk_id = kg.kg_skzi_id
                        
                        inner join spr_skzi ss
                        on ss.ss_id = sk.sk_name_id
                        
                        inner join spr_inf_sys ins
                        on ins.ins_id = sk_inf_id 

                        inner join spr_otdel ot
                        on ot.otdel_id = ar.a_id 
            
        `).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.persFromId =  async (data,cb) => {
    await pool_bahos.query(`SELECT * from dblink('host=localhost port=5432 user=postgres password=masterpas dbname=spr_bahos','SELECT pe_fio FROM personal') 
    AS pers(pe_fio varchar)`).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.persFromIdArch =  async (data,cb) => {
    await pool_bahos.query(`SELECT * from dblink('host=localhost port=5432 user=postgres password=masterpas dbname=spr_bahos','SELECT pe_fio FROM personal') 
    AS pers(pe_fio varchar)`).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.filterAll = function (data, cb) {
    //console.log(data)
    let sql = `SELECT ss.ss_name as skzi_name, ins.ins_name as inf_name, 
                sk.sk_ver as skzi_ver, sk.sk_serial as skzi_ser, 
                kt.kt_name as ktr_name, kg.kg_dgvr, kg.kg_kol, sk.sk_srok,
                kg.kg_arch ,ot.otdel_name as otdel,
                 pc.pc_name,pc.pc_inv_num, og.og_name as org_name, 
                 to_char(ar.a_date1, 'YYYY-MM-DD') as ad,
                ar.*
    
    FROM arch_safe ar
    
    inner join spr_pc pc
    on pc.pc_id = ar.a_pc_id
    
    inner join spr_org og
    on og.og_id = ar.a_org_id
    
    inner join kontragents kg
    on kg.kg_id = ar.a_ktr_id
    
    inner join spr_ktr kt
    on kt.kt_id = kg.kg_name_id
    
    inner join skzi sk
    on sk.sk_id = kg.kg_skzi_id
    
    inner join spr_skzi ss
    on ss.ss_id = sk.sk_name_id
    
    inner join spr_inf_sys ins
    on ins.ins_id = sk_inf_id 

    inner join spr_otdel ot
    on ot.otdel_id = io.io_id 
    `;
    let where = ``,
    a = 0;
    if (data.fio){
        if ( a > 0){
            where += ` AND ma_fio LIKE '%`+data.fio+`%'`;
        }else{
            where += ` ma_fio LIKE '%`+data.fio+`%'`;
        }
        a++;
    }
    if (data.system){
        if (a > 0){
            where += ` AND ins.ins_name LIKE '%`+data.system+`%'`
        }else{
            where += ` ins.ins_name LIKE '%`+data.system+`%'`
        }
        a++;
    }
    if (data.pc){
        if (a > 0){
            where += ` AND pc.pc_name LIKE '%`+data.pc+`%'`
        }else{
            where += ` pc.pc_name LIKE '%`+data.pc+`%'`
        }
        a++;
    }

  /*  if (a > 0){
        where = ` WHERE ` + where;
        sql += where;
    }*/
    sql += ` order by a_id desc`;
    //console.log(sql)
    pool.query(sql
    , (err,res)=>{
        cb(err, res); 
        //console.log(res.rows)
    });
};

exports.kontragents =  async (req,cb) => {
    await pool.query(`SELECT kg.*,sk.sk_ver as skzi_ver,sk.sk_srok as srok, sk.sk_serial as skzi_ser, ss_name as skzi_name, ins.ins_name, kt.kt_name, sk.sk_id,
                        kt.kt_id

                        FROM kontragents kg

                        inner join spr_ktr kt
                        on kt.kt_id = kg.kg_name_id 
                        
                        inner join skzi sk
                        on sk.sk_id = kg.kg_skzi_id
                        
                        inner join spr_skzi ss
                        on ss.ss_id = sk.sk_name_id
                        
                        inner join spr_inf_sys ins
                        on ins.ins_id = sk_inf_id `).then( res => {
            return cb('',res);
        }).catch( err => {
           // return cb(err,'')
        })
};

exports.spr_inf_sys = async(req,cb)=>{
    await pool.query(`SELECT * FROM spr_inf_sys`).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.spr_otdel = async(req,cb)=>{
    await pool.query(`SELECT * FROM spr_otdel`).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.spr_skzi = async(req,cb)=>{
    await pool.query(`SELECT * FROM spr_skzi `).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.skzi = async(req, cb)=>{
    await pool.query(`SELECT * FROM skzi`).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.spr_org =  async (req,cb) => {
    await pool.query(`SELECT * FROM spr_org`).then( res => {
            return cb('',res);
        }).catch( err => {
           return cb(err,'')
        })
};

exports.spr_pc =  async (req,cb) => {
    await pool.query(`SELECT * FROM spr_pc`).then( res => {
            return cb('',res);
        })
};

exports.personal =  async (req,cb) => {
    await pool_bahos.query(`SELECT pe.*
                            FROM personal pe
    `).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.insert = function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.info_safe (io_pers_id, io_pc_id, io_org_id, io_ktr_id, io_usr1)
    VALUES ( `+data.val_ser+`,`+data.val_pcName+`,`+data.val_sys+`,`+data.val_kont+`,`+req.headers.us_id+`);`;//
    console.log(sql); 
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}

exports.insertNaim= function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.spr_skzi (ss_name)
    VALUES ( '`+data.val_naim+`')`;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}

exports.insertPC= function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.spr_pc (pc_name,pc_inv_num)
    VALUES ( '`+data.val_pc+`','`+data.val_inv+`')`;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}

exports.insertFrom= function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.spr_org (og_name,og_recv)
    VALUES ( '`+data.val_org+`','`+data.val_rekv+`')`;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}

exports.insertSyst= function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.spr_inf_sys (ins_name)
    VALUES ( '`+data.val_ins+`')`;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}


exports.insertOtd= function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.spr_otdel (otdel_name)
    VALUES ( '`+data.val_otd+`')`;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}



exports.DeleteNaim= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.spr_skzi where ss_id=`+data.ss_id+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'Delete COMPLITE');
        }
    }); 
}
exports.DeletePC= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.spr_pc where pc_id=`+data.pc+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'Delete COMPLITE');
        }
    }); 
}
exports.DeleteOrg= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.spr_org where og_id=`+data.org+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'Delete COMPLITE');
        }
    }); 
}
exports.DeleteSys= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.spr_inf_sys where ins_id=`+data.ins+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'Delete COMPLITE');
        }
    }); 
}

exports.DeleteOtd= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.spr_otdel where otdel_id=`+data.otd+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'Delete COMPLITE');
        }
    }); 
}

exports.DeleteKontr =  async (req,cb) => {
    await pool.query(`DELETE 
                        FROM public.kontragents kg

                        inner join spr_ktr kt
                        on kt.kt_id = kg.kg_name_id 
                        
                        inner join skzi sk
                        on sk.sk_id = kg.kg_skzi_id
                        
                        inner join spr_skzi ss
                        on ss.ss_id = sk.sk_name_id
                        
                        inner join spr_inf_sys ins
                        on ins.ins_id = sk_inf_id 
                        
                        WHERE kg_id=`+data.kg+``).then( res => {
            return cb('',res);
        }).catch( err => {
           // return cb(err,'')
        })
};


exports.Prim1Up =function (data, cb) {
    var sql = `UPDATE info_safe SET io_prim1 = '`+data.prim1_ch+`' WHERE io_id = `+data.io_id+` `;
    console.log(sql); 
    pool.query(sql,
        (err,res) => {
            cb(err, res)
        });
};

exports.Prim2Up =function (data1, cb) {
    var sql = `UPDATE info_safe SET io_prim2 = '`+data1.prim2_ch+`' WHERE io_id = `+data1.io_id1+` `;
    console.log(sql); 
    pool.query(sql,
        (err,res) => {
            cb(err, res)
        });
};
exports.InsertArch =function(req,cb){
    let data = req.body.data;
    var sql = `INSERT INTO public.arch_safe (a_ktr_id, a_org_id, a_pc_id, a_pers_id, a_prim1, a_prim2, a_usr)
    VALUES ( `+data.io_ktr_id+`,`+data.io_org_id+`,`+data.io_pc_id+`,`+data.id_pers+`,'`+data.io_prim1+`', '`+data.io_prim2+`', `+data.io_usr1+`);`;
    console.log(sql);
    pool.query(sql, (err,res)=>{
        cb(err,res)
    });
}

exports.DeleteMain_tab= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.info_safe where io_id=`+data.io_id+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'DELETE COMPLITE');
        }
    }); 
}

exports.InsertFrArcToMain =function(req,cb){
    let data = req.body.data;
    var sql = `INSERT INTO public.info_safe (io_ktr_id, io_org_id, io_pc_id, io_pers_id, io_prim1, io_prim2, io_usr1)
    VALUES ( `+data.a_ktr_id+`,`+data.a_org_id+`,`+data.a_pc_id+`,`+data.a_pers_id+`,'`+data.a_prim1+`', '`+data.a_prim2+`', `+data.a_usr+`);`;
    console.log(sql);
    pool.query(sql, (err,res)=>{
        cb(err,res)
    });
}

exports.DeleteArch_tbl= function(req,cb) {
    let data = req.body.data;
    var sql = `DELETE FROM public.arch_safe where a_id=`+data.a_id+``;
    console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres DELETE error:", err);
        }else{
            cb(err,'DELETE COMPLITE');
        }
    }); 
}

exports.InsertKontr =function(req,cb){
    let data = req.body.data;
    var sql = `INSERT INTO public.kontragents(kg_dgvr, kg_kol)
    VALUES ( '`+data.val_dgvr+`',`+data.val_count+`);`;
    console.log(sql);
    pool.query(sql, (err,res)=>{
        cb(err,res)
    });
}
exports.InsertSKZI =function(req,cb){
    let data = req.body.data;
    var sql = `INSERT INTO public.skzi(sk_ver,sk_serial,sk_srok)
    VALUES (`+data.val_vers+`,`+data.val_serial+`,'`+data.val_srok+`');`;
    console.log(sql);
    pool.query(sql, (err,res)=>{
        cb(err,res)
    });
}
exports.InsertKTR =function(req,cb){
    let data = req.body.data;
    var sql = `INSERT INTO public.spr_ktr (kt_name)
    VALUES ('`+data.name_kontrg+`');`;
    console.log(sql);
    pool.query(sql, (err,res)=>{
        cb(err,res)
    });
}









/*

exports.personal =  async (req,cb) => {
    await pool_bahos.query(`SELECT pe.*, ot.ot_name 
                            FROM personal pe
    
                            inner join otd ot
                            on ot.ot_id = pe.pe_otd_id`).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};
*/ 