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
            val_cont:''

        } }
        WrSerN=(e)=>{
            this.setState({serialNum:e.target.value})
        }
        WrSrok=(e)=>{
            this.setState({srok:e.target.value})
        }
        WrUsName=(e)=>{
            this.setState({userName:e.target.value})
        }
        Wrsystemy=(e)=>{
            this.setState({systemy:e.target.value})
        }
        WrInNum=(e)=>{
            this.setState({invNum:e.target.value})
        }
        componentDidMount(){
            axio.get('/main/data').then(res=>{
            console.log(res.data)
            this.setState({
                       arr: res.data,
                       namePO:res.data.spr_skzi,
                       versPO:res.data.skzi,
                       kontag:res.data.contr,
                       otd_name:res.data.spr_otdel,
                       compName:res.data.spr_pc,
                       systems:res.data.spr_org,
                       contrackName:res.data.contr,

                   });
               });
        }
        ChooseName=(e)=>{
            this.setState({val_ser:e.target.value})
        }
        ChooseVers=(e)=>{
            this.setState({val_ver:e.target.value})
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
        onSubmit=event=>{
            event.preventDefault();
            let data={
                val_ser:this.state.val_ser,  
                val_ver:this.state.val_ver,
                serialNum:this.state.serialNum,
                val_kont:this.state.val_kont,
                srok:this.state.srok,
                userName:this.state.userName,
                val_fil:this.state.val_fil,
                val_pcName:this.state.val_pcName,
                invNum:this.state.invNum,
                val_sys:this.state.val_sys,
                val_cont:this.state.val_cont,
                systemy:this.state.systemy
            }
            
            axio.post('/main/insert', {data}).then(res => {
                if (res.data === 'SAVE COMPLITE') {
                    this.props.onReboot();
                    alert('Добавлено');
                }else{
                   alert('Не добавлено');
                }
            });
        }

    render(){
        return (
        <div className='modal_add'>
            <div className="modal_pos_add">
                <div>Добавление данных
                    <div>
                <div className='NaimPole'>Наименование ПО и СКЗИ<select className='SelectPole' onChange={this.ChooseName} value={this.state.val_ser}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.namePO.map( id => <option key={id.ss_id} value={id.ss_id}>{id.ss_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Версия ПО и СКЗИ<select className='SelectPole' onChange={this.ChooseVers} value={this.state.val_ver}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_ver}</option>)}
                    </select></div>
                <div className='NaimPole'>Серийный номер<textarea className='AreaTxt' value={this.state.serialNum} onChange={this.WrSerN}></textarea></div>
                <div className='NaimPole'>От кого получено <select className='SelectPole' onChange={this.ChooseKontr} value={this.state.val_kont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.kontag.map( id => <option key={id.kt_id} value={id.kt_id}>{id.kt_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Срок действия лицензии<textarea className='AreaTxt' value={this.state.srok} onChange={this.WrSrok}></textarea></div>
                <div className='NaimPole'>ФИО пользователя<textarea className='AreaTxt' value={this.state.userName} onChange={this.WrUsName}></textarea></div>
                <div className='NaimPole'>Подразделения<select className='SelectPole' onChange={this.ChooseFilial} value={this.state.val_fil}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.otd_name.map( id => <option key={id.otdel_id} value={id.otdel_id}>{id.otdel_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Имя ПК<select className='SelectPole' onChange={this.ChooseNameComp} value={this.state.val_pcName}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.compName.map( id => <option key={id.pc_id} value={id.pc_id}>{id.pc_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Инвентарный номер<textarea className='AreaTxt' value={this.state.invNum} onChange={this.WrInNum}></textarea></div>
                <div className='NaimPole'>Организация<select className='SelectPole' onChange={this.ChooseSyst} value={this.state.val_sys}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.systems.map( id => <option key={id.og_id} value={id.og_id}>{id.og_name}</option>)}
                    </select></div>
                <div className='NaimPole'>Система<textarea className='AreaTxt' value={this.state.systemy} onChange={this.Wrsystemy}></textarea></div>
                <div className='NaimPole'>Контракт<select className='SelectPole' onChange={this.ChooseContr} value={this.state.val_cont}>
                    <option placeholder='----' value='-1'></option>
                    {this.state.contrackName.map( id => <option key={id.kg_id} value={id.kg_id}>{id.kg_dgvr}</option>)}
                    </select></div>
                <div>
                <button className='ButNaim' onClick={this.onSubmit}>Отправить</button>
                <button className='ButNaim' onClick={this.props.addRow}>Отмена</button>    
                </div>
                 </div>
                </div>
               
        </div>
        </div>
    );
    }   
}



