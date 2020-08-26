import React, {Component} from 'react'
import './spr_add_all.css'
import axio from 'axios';
export default class Spr_add_skzi extends Component {
    constructor() {
        super();
        this.state = {
            SPRSKZI:[],
            INSSYST:[],
            ss_name:'',
            ins_name:'',
            ver:'',
            ser:'',
            srok:''
        }
    }
    componentDidMount(){
        axio.get('/main/data').then(res=>{
          //  console.log(res.data)
                this.setState({
                    arr:res.data,
                    SPRSKZI:res.data.spr_skzi,
                    INSSYST:res.data.spr_syst,
                });
            });
    }    
       ChooseSys=(e)=>{
        this.setState({ins_name: e.target.value})
       }
       ChooseKont=(e)=>{
        this.setState({ss_name: e.target.value})
       }
       CreateVers=(e)=>{
        this.setState({ver: e.target.value})
       }
       ChooseSer=(e)=>{
        this.setState({ser: e.target.value})
       }
       ChooseSrok=(e)=>{
        this.setState({srok: e.target.value})
       }
        onClose=()=>{
            this.props.addSKZI()
        }

        SendDB=event=>{
            event.preventDefault();
            const data={
                ver: this.state.ver,
                ser: this.state.ser,
                srok: this.state.srok,
                ss_name: this.state.ss_name,
                ins_name: this.state.ins_name,
            }
            axio.post('/main/InsertSKZI', {data}).then(res => {
                if (res.data === 'INSERT COMPLITE') {
                    alert('Сохранено');
                }
            });
           }
    render(){
        return(<div className='Ps_froms'>
           <div className='Ps_sts'>
          <div>
          <p className='label-posits'>Наименование контрагента</p>
           <select className='SelectPole' onChange={this.ChooseKont} value={this.state.ss_name}>
              <option placeholder='----' value='-1'></option>
              {this.state.SPRSKZI.map( id => <option key={id.ss_id} value={id.ss_id}>{id.ss_name}</option>)}
               </select> 
            <p>Наименоване системы</p>
            <select className='SelectPole' onChange={this.ChooseSys} value={this.state.val_name}>
              <option placeholder='----' value='-1'></option>
              {this.state.INSSYST.map( id => <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
               </select> 
               <p>Версия </p>
               <textarea className='txtar' onChange={this.CreateVers}>{this.state.ver}</textarea>
               <p>Серия </p>
               <textarea className='txtar' onChange={this.ChooseSer}>{this.state.ser}</textarea>
               <p>Срок </p>
               <textarea  className='txtar' onChange={this.ChooseSrok}>{this.state.srok}</textarea>
               </div>
               <button  className='Buts' onClick={this.SendDB}>+</button>
           <button   className='Buts'onClick={this.onClose}>x</button>
           </div>
           
            </div>
        )}
}