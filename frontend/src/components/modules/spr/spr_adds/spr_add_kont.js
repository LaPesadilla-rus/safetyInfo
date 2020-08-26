import React, {Component} from 'react'
import './spr_add_all.css'
import axio from 'axios';
export default class Spr_add_kont extends Component {
    constructor() {
        super();
        this.state = {
        val_name:'',
        val_syst:'',
        val_dgvr:'',
        val_count:'',
        val_id:'',
        namePO:[],
        versPO:[],
        systa:[]
        }
    }

    componentDidMount(){
      axio.get('/main/data').then(res=>{
      //console.log(res.data)
      this.setState({
                 arr: res.data,
                 namePO:res.data.spr_skzi,
                 versPO:res.data.skzi,
                 systa:res.data.spr_syst

             });
         });
  }

      Name_dgvr=(e)=>{
        this.setState({val_dgvr: e.target.value});  
      }
     
      Name_count=(e)=>{
        this.setState({val_count: e.target.value});  
      }
      ChooseName=(e)=>{
        this.setState({val_name:e.target.value})
    }
    ChooseSyst=(e)=>{
      this.setState({val_syst:e.target.value})
  }
   SendDB=event=>{
    event.preventDefault();
    const data={
        val_dgvr: this.state.val_dgvr,
        val_count:this.state.val_count,
        val_syst:this.state.val_syst,
        val_name: this.state.val_name,
    }
    axio.post('/main/kontrs', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }this.props.onreboot();
        this.onClose();
        
    });
   }
   
   onClose=()=>{
    this.props.addKont()
}

    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts forKont'>
            <p className='label-posits'>Контрагент</p>
            <select className='SelectPole' onChange={this.ChooseName} value={this.state.val_name}>
              <option placeholder='----' value='-1'></option>
              {this.state.namePO.map( id => <option key={id.ss_id} value={id.ss_id}>{id.ss_name}</option>)}
               </select> 
               <p className='label-posits'>Система</p>
            <select className='SelectPole' onChange={this.ChooseSyst} value={this.state.val_syst}>
              <option placeholder='----' value='-1'></option>
              {this.state.systa.map( id => <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
               </select> 
               <p className='label-posits'>Договор</p>
              <textarea  className='txtar' onChange={this.Name_dgvr}></textarea>  
              <p className='label-posits'>Количество</p>
              <textarea  className='txtar' onChange={this.Name_count}></textarea>  
            <div><button  className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.onClose}>x</button>
            </div>
            </div>
            </div>
        )}
}

