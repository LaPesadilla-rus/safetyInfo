import React, {Component} from 'react'
import './spr_add_all.css'
import axio from 'axios';
export default class Spr_add_kont extends Component {
    constructor() {
        super();
        this.state = {
        name_kontrg:'',
        val_vers:'',
        val_serial:'',
        val_dgvr:'',
        val_srok:'',
        val_count:'',
        val_syst:''


        }
    }
    Name_kontr=(e)=> {
        this.setState({name_kontrg: e.target.value});
      }
      Name_vers=(e)=> {
        this.setState({val_vers: e.target.value});
      }
      Name_serial=(e)=>{
        this.setState({val_serial: e.target.value});  
      }
      Name_dgvr=(e)=>{
        this.setState({val_dgvr: e.target.value});  
      }
      Name_srok=(e)=>{
        this.setState({val_srok: e.target.value});  
      }
      Name_count=(e)=>{
        this.setState({val_count: e.target.value});  
      }
      Name_syst=(e)=>{
        this.setState({val_syst: e.target.value});  
      }


   SendDB=event=>{
    event.preventDefault();
    const data={
        name_kontrg: this.state.name_kontrg,
        val_vers: this.state.val_vers,
        val_serial:this.state.val_serial,
        val_dgvr: this.state.val_dgvr,
        val_srok:this.state.val_srok,
        val_count:this.state.val_count,
        val_syst:this.state.val_syst
    }
    axio.post('/main/kontrs', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }
    });
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
                <p className='label-posits'>Наименование контрагента</p>
              <textarea className='txtar' onChange={this.Name_kontr}></textarea>  
              <p className='label-posits'>Версия СКЗИ</p>
              <textarea  className='txtar' onChange={this.Name_vers}></textarea>  
              <p className='label-posits'>Серийный номер</p>
              <textarea  className='txtar' onChange={this.Name_serial}></textarea>  
              <p className='label-posits'>Договор</p>
              <textarea  className='txtar' onChange={this.Name_dgvr}></textarea>  
              <p className='label-posits'>Срок</p>
              <textarea  className='txtar' onChange={this.Name_srok}></textarea>  
              <p className='label-posits'>Количество</p>
              <textarea  className='txtar' onChange={this.Name_count}></textarea>  
              <p className='label-posits'>Система</p>
              <textarea  className='txtar' onChange={this.Name_syst}></textarea>  
            <div><button  className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.props.addKont}>x</button>
            </div>
            </div>
            </div>
        )}
}