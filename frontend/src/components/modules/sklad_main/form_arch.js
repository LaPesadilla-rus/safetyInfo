import React, {Component} from 'react';
import './form_work.css'
import axio from 'axios';
export default class Form_arch extends Component{
    
    constructor() {
        super();
        this.state = {
           id_pers:'',
           io_pc_id:'',
           io_org_id:'',
           io_ktr_id:'',
           io_prim1:'',
           io_prim2:'',
           io_usr1:'',
           io_id:'',
        }
    }

    onReboot=()=>{
        axio.get('/main/all').then(res=>{
            //console.log(res.data)
                
            });
    }

    ToArch=()=>{
        this.props.transfer(this.props.row)
        const data={
            io_id:this.props.row.io_id,
            id_pers:this.props.row.io_pers_id,
            io_pc_id:this.props.row.io_pc_id,
            io_org_id:this.props.row.io_org_id,
            io_ktr_id:this.props.row.io_ktr_id,
            io_prim1:this.props.row.io_prim1,
            io_prim2:this.props.row.io_prim2,
            io_usr1:this.props.row.io_usr1,

        }

        axio.post('/main/InsertArch', {data}).then(res => {
            if (res.data === 'INSERT COMPLITE') {
                alert('Запис перенесена в архив');
            }else{
               alert('Ошибка');
            }
        });

        axio.post('/main/DeleteMain_tab', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Запись удалена из основной таблицы');
            }else{
               alert('Ошибка');
            }
        });

    }

    render(){
        return (
        <div className='modal_arch'>
            <div className="modal_pos_arch">
                <div>Перенос данных в архив<div>{console.log(this.props)}
                <label className='label_txt'>Перенести данную запись в архив?</label>
                <div>
               <button className='ButtonCh' onClick={this.ToArch}>Перенести</button>
               <button className='ButtonCh' onClick={this.props.transfer}>Отмена</button>
                 </div>
                </div></div>
        </div>
        </div>
    );
    }   
}