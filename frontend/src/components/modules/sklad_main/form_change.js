import React, {Component} from 'react';
import './form_work.css';
import UnicId from 'react-html-id';
import axio from 'axios';
export default class Form_change extends Component {

    constructor() {
        super();
        this.arts=[];
        UnicId.enableUniqueIds(this);
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
            systa:[],
            transfer:false,
            arty:[],
            changeRow:false,
            users:'',
            artys:[],
            artyss:[],
            asrtyss:[],
            asrstyss:[],
            label:''
        } 
    }

    Reboot=()=>{
        axio.get('/main/data').then(res=>{this.setState({
            arr: res.data})})
    }

    componentDidMount (){
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
                       org:this.props.arr.io_org_id, //org_id
                       syst:this.props.arr.io_ins_id,
                       cont:this.props.arr.kg_id,
                       users:this.props.arr.io_usr1,
                       id:this.props.arr.io_id,
                       id_pers:'',
           io_pc_id:'',
           io_org_id:'',
           io_ktr_id:'',
           io_prim1:'',
           io_prim2:'',
           io_usr1:'',
           io_id:'',
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
   /* Changefrom=(e)=>{
        this.setState({from:e.target.value})
    } */
    ChangeSrok=(e)=>{
        this.setState({srok:e.target.value})
    }
  /*  ChangeUs=(e)=>{
        this.setState({user:e.target.value})
    } */
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

    ToArch=()=>{
        const data={
            io_id:this.props.arr.io_id,
            id_pers:this.props.arr.io_pers_id,
            io_pc_id:this.props.arr.io_pc_id,
            io_org_id:this.props.arr.io_org_id,
            io_ktr_id:this.props.arr.io_ktr_id,
            io_prim1:this.props.arr.io_prim1,
            io_prim2:this.props.arr.io_prim2,
            io_usr1:this.props.arr.io_usr1,
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
                alert('Запись удалена из основной таблицы')
                this.props.Reboot();
            }else{
               alert('Ошибка');
            }
        });
    }
      
    Changefrom = (e) => {
        this.setState({ from: e.target.value});
        let arr = [];
        let val= e.target.value;
        this.state.kontag.map(id => {
            if (parseInt(val)=== id.kt_id){
                arr.push(id); }
            })
            if (arr.length === 0) {
                this.setState({
                    cont: '',
                })
            }
            this.setState({
                artys: arr
            })
    }

    ChangeContr = (e) => {
        this.setState({ cont: e.target.value});
        let arr = [];
        let val= e.target.value;
        this.state.artys.map(id => {
            if (parseInt(val)=== id.kg_id){
                arr.push(id); }
            })
            if (arr.length === 0) {
                this.setState({
                    skzi_naim: '',
                })
            }console.log(arr)
            this.setState({
                artyss: arr
            })
    }

    ChangeName = (e) => {
        this.setState({ skzi_naim: e.target.value});
        let arr = [];
        let val= e.target.value;
        this.state.artyss.map(id => {
            if (parseInt(val)=== id.kt_id){
                arr.push(id); }
            })
            if (arr.length === 0) {
                this.setState({
                    vers: '',
                })
            }console.log(arr)
            this.setState({
                asrstyss: arr
            })
    }

    ChangeUs = (e) => {
        this.setState({ user: e.target.value});
        let lbl = ''
        let val= e.target.value;
        this.state.pers.map(id => {
            if (parseInt(val)=== id.pe_id){
                lbl =id.otdel_name }
            })
            
            this.setState({
                label: lbl
            })
    }

/*

     ChooseContr = (e) => {
            this.setState({ val_cont: e.target.value});
            let arr = [];
            let val= e.target.value;
            this.state.new_arr.map(id => {
                if (parseInt(val)=== id.kg_id){
                    arr.push(id); }
                })
                if (arr.length === 0) {
                    this.setState({
                        val_ser: '',
                    })
                }
                this.setState({
                    new_ardr: arr
                })
        }
*/

    onSubmit=()=>{
        const data={
            skzi_naim:this.state.skzi_naim,
            vers:this.state.vers,
            serial:this.state.serial,
            from:this.state.from,
            srok:this.state.srok,
            user:this.state.user,
            otdel:this.state.otdel,
            pc:this.state.pc,
            inv_num:this.state.inv_num,
            org:this.state.org,
            syst:this.state.syst,
            id:this.state.id,
            users:this.state.users
        }
        axio.post('/main/UpdateRow', {data}).then(res => {
            this.setState({
                data: res.data
            });this.props.onReboot();
            this.onClose();
        });
       }

       onClose=()=>{
        this.props.changeRow()
    }
     
    render(){
        return (
            <div className='Ps_from'>
        <div className='modal_add'>
            <div className="modal_pos_add">
                <div className='Zap'>
                    <label className='Names'>Изменение полей</label>
                    <div>

                    <div className='NaimPole'> От кого получено 
                <select className='SelectPole' onChange={this.Changefrom} value={this.state.from}>
                {this.state.kontag.map( id => 
                <option key={id.kt_id} value={id.kt_id}>{id.kt_name}</option>)}
                </select></div>

                <div className='NaimPole'> Контракт
                <select className='SelectPole' onChange={this.ChangeContr} value={this.state.cont}>
                {this.state.artys.map( id => 
                <option key={id.kg_id} value={id.kg_id}>{id.kg_dgvr}</option>)}
                </select></div>


              <div className='NaimPole'>Наименование ПО и СКЗИ
              <select className='SelectPole' onChange={this.ChangeName} value={this.state.skzi_naim}>
                {this.state.artyss.map( id => 
                <option key={id.sk_id} value={id.sk_id}>{id.skzi_name}</option>)}
                </select></div>

                <div className='NaimPole'>Версия ПО и СКЗИ
                <select className='SelectPole' onChange={this.ChangeSer} value={this.state.vers}>
                {this.state.asrstyss.map( id => 
                <option key={this.nextUniqueId()} value={id.sk_id}>{id.skzi_ver}</option>)}
                </select></div>

                <div className='NaimPole'>Серийный номер
                <select className='SelectPole' onChange={this.ChangeSeria} value={this.state.vers}>
                {this.state.versPO.map( id => 
                <option key={this.nextUniqueId()} value={id.sk_id}>{id.skzi_serial}</option>)}
                </select></div>
               
                <div className='NaimPole'>Срок действия лицензии
                <select className='SelectPole' onChange={this.ChangeSrok} value={this.state.vers}>
                {this.state.versPO.map( id => 
                <option key={this.nextUniqueId()} value={id.sk_id}>{id.skzi_srok}</option>)}
                </select></div>

                <div className='NaimPole'>Система
                <select className='SelectPole' onChange={this.ChangeSyst} value={this.state.syst}>
                {this.state.systa.map( id => 
                <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
                </select></div>

                <div className='NaimPole'>ФИО пользователя
                <select className='SelectPole' onChange={this.ChangeUs} value={this.state.user}>
                {this.state.pers.map( id => 
                <option key={id.pe_id} value={id.pe_id}>{id.pe_fio}</option>)}
                </select></div>

                <div className='NaimPole'>Подразделения
                <label>{this.state.label}</label>
                </div>

                <div className='NaimPole'> Имя ПК
                <select className='SelectPole' onChange={this.ChangePC} value={this.state.pc}>
                {this.state.compName.map( id => 
                <option key={id.pc_id} value={id.pc_id}>{id.pc_name}</option>)}
                </select></div>

                <div className='NaimPole'>Инвентарный номер
                <select className='SelectPole' onChange={this.ChooseInv} value={this.state.pc}>
                {this.state.compName.map( id => 
                <option key={id.pc_id} value={id.pc_id}>{id.pc_inv_num}</option>)}
                </select></div>

                <div className='NaimPole'>Организация
                <select className='SelectPole' onChange={this.ChangeOrg} value={this.state.org}>
                {this.state.systems.map( id => 
                <option key={id.og_id} value={id.og_id}>{id.og_name}</option>)}
                </select></div>
                
                
                <div>
                <button onClick={this.onSubmit} className='ButNaim_s'>Отправить</button>
                <button className='ButNaim_cl' onClick={this.onClose}>Отмена</button>    
                </div>
                <button onClick={this.ToArch} className='ButNaim_ch'>Перенести в архив</button>
                 </div>
                </div>
        </div>
        </div>
        </div>
    );
    }   
}



/*
{this.state.transfer && <Form_arch row={this.state.arty} arr={this.arts}  transfer={this.TransferData}/>}

*/