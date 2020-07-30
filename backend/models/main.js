const {Pool} = require('pg');
const conn = require('../db_con.js');
const pool = new Pool (conn.conn_saf);
const pool_bahos = new Pool (conn.conn_bahos);

exports.all =  async (cb) => {
    await pool.query(`SELECT ma.ma_id, ma.ma_prim1, ma.ma_pers_id, ma.ma_prim2 pc_name, pc_inv_num, og_name, og_recv, kg_dgvr, kg_kol, ps_ver, ps_serial, ps_name
                FROM main_table ma

                inner join ktr_dgvr kg
                on kg.kg_id = ma_ktr_id

                inner join spr_org og
                on og.og_id = kg.kg_org_id

                inner join spr_pc pc
                on pc.pc_id = ma.ma_pc_id

                inner join spr_po_skzi ps
                on ps.ps_id = ma.ma_skzi_id

                inner join spr_inf_sys ins
                on ins.ins_id = ma.ma_infs_id
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

    WHERE pe_id = `+data.ma_pers_id+`
        `).then( res => {
            cb('',res);
        }).catch( err => {
            cb(err,'')
        })
};