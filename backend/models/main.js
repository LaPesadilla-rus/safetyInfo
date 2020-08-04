const {Pool} = require('pg');
const conn = require('../db_con.js');
const pool = new Pool (conn.conn_saf);
const pool_bahos = new Pool (conn.conn_bahos);

exports.all =  async (cb) => {
    await pool.query(`SELECT ss.ss_name as skzi_name, ins.ins_name as inf_name, 
                        sk.sk_ver as skzi_ver, sk.sk_serial as skzi_ser, 
                        kt.kt_name as ktr_name, kg.kg_dgvr, kg.kg_kol, sk.sk_srok,
                        kg.kg_arch , pc.pc_name,pc.pc_inv_num, og.og_name as org_name, to_char(io.io_date1, 'YYYY-MM-DD') as io,
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
                        
                        Order by io_id
        `).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.persFromId =  async (data,cb) => {
    await pool_bahos.query(`SELECT pe.pe_fio, ot.ot_name FROM personal pe
    
    inner join otd ot
    on ot.ot_id = pe.pe_otd_id

    WHERE pe_id = `+data.io_pers_id+`
        `).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.kontragents =  async (cb) => {
    await pool.query(`SELECT kg.*,sk.sk_ver as skzi_ver, sk.sk_serial as skzi_ser, ss_name as skzi_name, ins.ins_name, kt.kt_name, sk.sk_id,
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
            return cb(err,'')
        })
};

exports.spr_inf_sys = async(cb)=>{
    await pool.query(`SELECT * FROM spr_inf_sys`).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.spr_skzi = async(cb)=>{
    await pool.query(`SELECT * FROM spr_skzi`).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.skzi = async(cb)=>{
    await pool.query(`SELECT * FROM skzi`).then( res => {
        return cb('',res);
    }).catch( err => {
        return cb(err,'')
    })
}

exports.spr_org =  async (cb) => {
    await pool.query(`SELECT * FROM spr_org`).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.spr_pc =  async (cb) => {
    await pool.query(`SELECT * FROM spr_pc`).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.personal =  async (cb) => {
    await pool_bahos.query(`SELECT pe.*, ot.ot_name 
                            FROM personal pe
    
                            inner join otd ot
                            on ot.ot_id = pe.pe_otd_id`).then( res => {
            return cb('',res);
        }).catch( err => {
            return cb(err,'')
        })
};

exports.insert = function(req,cb) {
    let data = req.body.data;
    var sql = `INSERT INTO public.info_safe (io_pers_id, io_pc_id, io_org_id, io_ktr_id, io_prim1, io_prim2, io_usr1)
    VALUES ( `+data.pers_id+`,`+data.pc_id+`,`+data.org_id+`,`+data.ktr_id+`, '`+data.prim1+`', '`+data.prim2+`', `+req.headers.us_id+`);`;
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

exports.Prim1Up =function (data, cb) {
    var sql = `UPDATE info_safe SET io_prim1 = '`+data.txt+`' WHERE io_id = `+data.io_id+` `;
    console.log(sql); 
    pool.query(sql,
        (err,res) => {
            cb(err, res)
        });
};

exports.Prim2Up =function (data, cb) {
    var sql = `UPDATE info_safe SET io_prim2 = '`+data.text+`' WHERE io_id = `+data.io_id+` `;
    console.log(sql); 
    pool.query(sql,
        (err,res) => {
            cb(err, res)
        });
};