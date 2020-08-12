import React, {Component} from 'react';
import './form_work.css'
import axio from 'axios';
export default class BackToMain extends Component {

constructor(){
    super();
    this.state={
        a_id:'',
        a_ktr_id:'',
        a_org_id:'',
        a_pc_id:'',
        a_pers_id:'',
        a_prim1:'',
        a_prim2:'',
        a_usr:'',
        arr:[],
        
    }
}
componentDidMount(){
    axio.get('/main/ArchAll').then(res=>{
        this.setState({
            arr: res.data
            
        });console.log(res.data)
    });
}
onReboot=()=>{
    axio.get('/main/ArchAll').then(res=>{});
}
onSubmit=(e)=>{
    const data={
        a_id:this.props.row.a_id,
        a_ktr_id:this.props.row.a_ktr_id,
        a_org_id:this.props.row.a_org_id,
        a_pc_id:this.props.row.a_pc_id,
        a_pers_id:this.props.row.a_pers_id,
        a_prim1:this.props.row.a_prim1,
        a_prim2:this.props.row.a_prim2,
        a_usr:this.props.row.a_usr,
    }
    axio.post('/main/InsertFrArcToMain', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Запись перенесена в основную таблицу');
        }else{
           alert('Ошибка');
        }
    });

    axio.post('/main/DeleteArch_tbl', {data}).then(res => {
        if (res.data === 'Delete COMPLITE') {
            alert('Запись удалена из aрхива');
        }else{
           alert('Ошибка');
        }
    });this.onReboot()

}
    render(){
        return (
        <div className='modal_arch'>
            <div className="modal_pos_arch">
            <div>Перенос данных в основную таблицу</div>
            <label className='label_txt'>Перенести данную запись в основную таблицу?</label>
            <div>
               <button className='ButtonCh' onClick={this.onSubmit}>Перенести</button>
               <button className='ButtonCh' onClick={this.props.newRow}>Отмена</button>
                 </div>
            </div></div>
        )
    }
}

