import React, {Component} from 'react';
import './form_work.css'
import axio from 'axios';

export default class Form_add extends Component {
    
    constructor() {
        super();
        this.state ={
            namePO:[],
            versPO:[],
            serialNum:'',
            kontag:[],
            srok:'',
            userName:'',
            otd_name:[],
            compName:[],
            invNum:'',
            systemy:'',
            systems:[],
            contrackName:[],
            arr:[],
            val_ser:'',
            val_ver:'',
            val_kont:'',
            val_fil:'',
            val_pcName:'',
            val_sys:'',
            val_cont:'',
            val_seria:'',
            val_srok:'',
            val_name:'',
            pers:[],
            inv_num:'',
            syst:'',
            systa:[]

        } }
    
        componentDidMount(){
            axio.get('/main/data').then(res=>{
            console.log(res.data)
            this.setState({
                       arr: res.data,
                       namePO:res.data.spr_skzi,
                       versPO:res.data.skzi,
                       kontag:res.data.contr,
                       otd_name:res.data.personal,
                       compName:res.data.spr_pc,
                       systems:res.data.spr_org,
                       contrackName:res.data.contr,
                       pers: res.data.personal,
                       systa:res.data.spr_syst
                   });
               });
        }
        Choosess=(e)=>{
            this.setState({val_ser:e.target.value})
        }
        ChooseVers=(e)=>{
            this.setState({val_ver:e.target.value})
        }
        ChooseSer=(e)=>{
            this.setState({val_seria:e.target.value})
        }
        ChooseKontr=(e)=>{
            this.setState({val_kont:e.target.value})
        }
        ChooseFilial=(e)=>{
            this.setState({val_fil:e.target.value})
        }
        ChooseNameComp=(e)=>{
            this.setState({val_pcName:e.target.value})
        }
        ChooseSyst=(e)=>{
            this.setState({val_sys:e.target.value})
        }
        ChooseContr=(e)=>{
            this.setState({val_cont:e.target.value})
        }
        ChooseSrok=(e)=>{
            this.setState({val_srok:e.target.value})
        }
        ChooseName=(e)=>{
            this.setState({val_name:e.target.value})
        }
        ChooseInv=(e)=>{
            this.setState({inv_num:e.target.value})
        }
        ChooseSystema=(e)=>{
            this.setState({syst:e.target.value})
        }
        onSubmit=()=>{
            
            let data={
                val_ser:this.state.val_ser,  
                val_ver:this.state.val_ver,
                val_kont:this.state.val_kont,
                srok:this.state.srok,
                userName:this.state.userName,
                val_fil:this.state.val_fil,
                val_pcName:this.state.val_pcName,
                invNum:this.state.invNum,
                val_sys:this.state.val_sys,
                val_cont:this.state.val_cont,
                systemy:this.state.systemy,
                val_seria:this.state.val_seria,
                val_srok:this.state.val_srok,
                val_name:this.state.val_name,
                inv_num:this.state.inv_num,
                syst:this.state.syst,
            }
            
            axio.post('/main/insert', {data}).then(res => {
                if (res.data === 'INSERT COMPLITE') {
                    alert('Добавлено');
                    this.onClose();
                    this.props.onReboot()
                }         
            });
        }

        onClose=()=>{
            this.props.newRow()
        }

    render(){
        return (
            <div className='Ps_from'>
        <div className='modal_add'>
            <div className="modal_pos_add">
                <div>
                    <p className='label'>Добавление данных</p>
                    <div>
                <div className='NaimPole'>Наименование ПО и СКЗИ<select className='SelectPole' onChange={this.Choosess} value={this.state.val_ser}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.namePO.map( id => <option key={id.ss_id} value={id.ss_id}>{id.ss_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Версия ПО и СКЗИ<select className='SelectPole' onChange={this.ChooseVers} value={this.state.val_cont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_ver}</option>)}
                    </select></div>
                    <div className='NaimPole'>Серийный номер<select className='SelectPole' onChange={this.ChooseSer} value={this.state.val_cont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_serial}</option>)}
                    </select></div>
                <div className='NaimPole'>От кого получено <select className='SelectPole' onChange={this.ChooseKontr} value={this.state.val_kont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.kontag.map( id => <option key={id.kt_id} value={id.kt_id}>{id.kt_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Срок действия лицензии
                  <select className='SelectPole' onChange={this.ChooseSrok} value={this.state.val_cont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_srok}</option>)}
                    </select></div>
                <div className='NaimPole'>ФИО пользователя<select className='SelectPole' onChange={this.ChooseName} value={this.state.val_name}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.pers.map(id => <option key={id.pe_id} value={id.pe_id}>{id.pe_fio}</option>)}
                    </select></div>
                <div className='NaimPole'>Подразделения<select className='SelectPole' onChange={this.ChooseFilial} value={this.state.val_fil}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.otd_name.map( id => <option key={id.otdel_id} value={id.otdel_id}>{id.otdel_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Имя ПК<select className='SelectPole' onChange={this.ChooseNameComp} value={this.state.val_pcName}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.compName.map( id => <option key={id.pc_id} value={id.pc_id}>{id.pc_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Инвентарный номер<select className='SelectPole' onChange={this.ChooseInv} value={this.state.val_pcName}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.compName.map( id => <option key={id.pc_id} value={id.pc_id}>{id.pc_inv_num}</option>)}
                    </select></div>
                <div className='NaimPole'>Организация<select className='SelectPole' onChange={this.ChooseSyst} value={this.state.val_sys}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.systems.map( id => <option key={id.og_id} value={id.og_id}>{id.og_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Контракт<select className='SelectPole' onChange={this.ChooseContr} value={this.state.val_cont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.contrackName.map( id => <option key={id.kg_id} value={id.kg_id}>{id.kg_dgvr}</option>)}
                    </select></div>
                <div className='NaimPole'>Система<select className='SelectPole' onChange={this.ChooseSystema} value={this.state.syst}>
                <option placeholder='----' value='-1'></option>
                    {this.state.systa.map( id => <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
                    </select></div>
                <div>
                <button className='ButNaim' onClick={this.onSubmit}>Отправить</button>
                <button className='ButNaim' onClick={this.onClose}>Отмена</button>    
                </div>
                 </div>
                </div>
               
        </div>
        </div>
        </div>
    );
    }   
}



