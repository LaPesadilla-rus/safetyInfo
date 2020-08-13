import React, {Component} from 'react';
import './form_work.css'
import axio from 'axios';
export default class Form_change extends Component {

    constructor() {
        super();
        this.state ={
            arr:[],
            new_arr:[],
            skzi_naim:'-1',
            vers:'-1',
            serial:'',
            from:'',
            srok:'',
            user:'',
            otdel:'',
            pc:'',
            inv_num:'',
            org:'',
            syst:'',
            contr:'',
            namePO:[],
            versPO:[],
            kontag:[],
            otd_name:[],
            compName:[],
            systems:[],
            contrackName:[],
            pers:[],
            systa:[]
        } 
    }

    componentDidMount (){
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
            pers: res.data.personal,
            systa:res.data.spr_syst,
                       skzi_naim:this.props.arr.io_ktr_id,
                       vers:this.props.arr.io_ktr_id,
                       serial:this.props.arr.io_ktr_id,
                       from:this.props.arr.io_ktr_id,
                       srok:this.props.arr.io_ktr_id,
                       user:this.props.arr.io_pers_id,
                       otdel:this.props.arr.otdel_id,
                       pc:this.props.arr.io_pc_id,
                       inv_num:this.props.arr.io_pc_id,
                       org:this.props.arr.io_org_id,
                       syst:this.props.arr.io_ktr_id,
                       cont:this.props.arr.io_ins_id
        });
        });
        
    }

    ChangeName=(e)=>{
        this.setState({skzi_naim:e.target.value})
    }
    ChangeSer=(e)=>{
        this.setState({vers:e.target.value})
    }
    ChangeSeria=(e)=>{
        this.setState({serial:e.target.value})
    }
    Changefrom=(e)=>{
        this.setState({from:e.target.value})
    }
    ChangeSrok=(e)=>{
        this.setState({srok:e.target.value})
    }
    ChangeUs=(e)=>{
        this.setState({user:e.target.value})
    }
    ChangeOtd=(e)=>{
        this.setState({otdel:e.target.value})
    }
    ChangePC=(e)=>{
        this.setState({pc:e.target.value})
    }
    ChooseInv=(e)=>{
        this.setState({inv_num:e.target.value})
    }
    ChangeOrg=(e)=>{
        this.setState({org:e.target.value})
    }
    ChangeSyst=(e)=>{
        this.setState({syst:e.target.value})
    }
    render(){
        return (
        <div className='modal_add'>
            <div className="modal_pos_add">
                <div>Изменение данных
                    <div>{console.log(this.props)}
              <div className='NaimPole'>Наименование ПО и СКЗИ
              <select className='SelectPole' onChange={this.ChangeName} value={this.state.skzi_naim}>
                {this.state.namePO.map( id => 
                <option key={id.ss_id} value={id.ss_id}>{id.ss_name}</option>)}
                </select></div>
                <div className='NaimPole'>Версия ПО и СКЗИ
                <select className='SelectPole' onChange={this.ChangeSer} value={this.state.vers}>
                {this.state.versPO.map( id => 
                <option key={id.sk_id} value={id.sk_id}>{id.sk_ver}</option>)}
                </select></div>
                <div className='NaimPole'>Серийный номер
                <select className='SelectPole' onChange={this.ChangeSeria} value={this.state.serial}>
                {this.state.versPO.map( id => 
                <option key={id.sk_id} value={id.sk_id}>{id.sk_serial}</option>)}
                </select></div>
                <div className='NaimPole'> От кого получено 
                <select className='SelectPole' onChange={this.Changefrom} value={this.state.from}>
                {this.state.kontag.map( id => 
                <option key={id.kt_id} value={id.kt_id}>{id.kt_name}</option>)}
                </select></div>
                <div className='NaimPole'>Срок действия лицензии
                <select className='SelectPole' onChange={this.ChangeSrok} value={this.state.srok}>
                {this.state.versPO.map( id => 
                <option key={id.sk_id} value={id.sk_id}>{id.sk_srok}</option>)}
                </select></div>
                <div className='NaimPole'>ФИО пользователя
                <select className='SelectPole' onChange={this.ChangeUs} value={this.state.user}>
                {this.state.pers.map( id => 
                <option key={id.pe_id} value={id.pe_id}>{id.pe_fio}</option>)}
                </select></div>
                <div className='NaimPole'>Подразделения
                <select className='SelectPole' onChange={this.ChangeOtd} value={this.state.otdel}>
                {this.state.otd_name.map( id => 
                <option key={id.otdel_id} value={id.otdel_id}>{id.otdel_name}</option>)}
                </select></div>
                <div className='NaimPole'> Имя ПК
                <select className='SelectPole' onChange={this.ChangePC} value={this.state.pc}>
                {this.state.compName.map( id => 
                <option key={id.pc_id} value={id.pc_id}>{id.pc_name}</option>)}
                </select></div>
                <div className='NaimPole'>Инвентарный номер
                <select className='SelectPole' onChange={this.ChooseInv} value={this.state.inv_num}>
                {this.state.compName.map( id => 
                <option key={id.pc_id} value={id.pc_id}>{id.pc_inv_num}</option>)}
                </select></div>
                <div className='NaimPole'>Организация
                <select className='SelectPole' onChange={this.ChangeName} value={this.state.vers}>
                {this.state.systems.map( id => 
                <option key={id.og_id} value={id.og_id}>{id.og_name}</option>)}
                </select></div>
                <div className='NaimPole'>Система
                <select className='SelectPole' onChange={this.ChangeOrg} value={this.state.org}>
                {this.state.systa.map( id => 
                <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
                </select></div>
                <div className='NaimPole'> Контракт
                <select className='SelectPole' onChange={this.ChangeSyst} value={this.state.syst}>
                {this.state.contrackName.map( id => 
                <option key={id.kg_id} value={id.kg_id}>{id.kg_dgvr}</option>)}
                </select></div>
                <div>
                <button className='ButNaim'>Отправить</button>
                <button className='ButNaim' onClick={this.props.changeRow}>Отмена</button>    
                </div>
                 </div>
                </div>
               
        </div>
        </div>
    );
    }   
}



