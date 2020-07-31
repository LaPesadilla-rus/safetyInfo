const {Pool} = require('pg');
const conn = require('../db_con.js');
const pool = new Pool (conn.conn_saf);
const pool_bahos = new Pool (conn.conn_bahos);

exports.all =  async (cb) => {
    await pool.query(`SELECT ss.ss_name as skzi_name, ins.ins_name as inf_name, 
                        sk.sk_ver as skzi_ver, sk.sk_serial as skzi_ser, 
                        kt.kt_name as ktr_name, kg.kg_dgvr, kg.kg_kol, 
                        kg.kg_arch , pc.pc_name, og.og_name as org_name, 
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
        `).then( res => {
            cb('',res);
        }).catch( err => {
            cb(err,'')
        })
};

exports.pers =  async (data,cb) => {
    await pool_bahos.query(`SELECT pe.pe_fio, ot.ot_name FROM personal pe
    
    inner join otd ot
    on ot.ot_id = pe.pe_otd_id

    WHERE pe_id = `+data.io_pers_id+`
        `).then( res => {
            cb('',res);
        }).catch( err => {
            cb(err,'')
        })
};