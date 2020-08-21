import React, {Component} from 'react'
import './spr_add_all.css'
import axio from 'axios';
export default class Spr_add_pers extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            pe_fio:'',
            otdel:'',
             pers:[],
             otdels:[],
             num:'',

        }
    }

    componentDidMount(){
      axio.get('/main/data').then(res=>{
      //console.log(res.data)
      this.setState({
        arr:res.data,
        otdels:res.data.spr_otdel,
        pers:res.data.personal,
             });
         });
  }

    
      Pers=(e)=>{
        this.setState({pe_fio: e.target.value});  
      }
     
      otdels=(e)=>{
        this.setState({otdel: e.target.value});  
      }
      
   SendDB=event=>{
    event.preventDefault();
    const data={
        pe_fio: this.state.pe_fio,
        otdel:this.state.otdel,
    }
    axio.post('/main/insertChain_pers', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        }
    });
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
            <p className='label-posits'>Сотрудник</p>
            <select className='SelectPole' onChange={this.Pers}  value={this.state.pe_fio} >
                <option placeholder='----' value='-1'></option>
               {this.state.pers.map( id => <option key={id.pe_id} value={id.pe_id}>{id.pe_fio}</option>)}
                 </select>
                 <p className='label-posits'>Отеделение</p>
                <select className='SelectPole' onChange={this.otdels}  value={this.state.otdel} >
                <option placeholder='----' value='-1'></option>
               {this.state.otdels.map( id => <option key={id.otdel_id} value={id.otdel_id}>{id.otdel_name}</option>)}
                 </select>   
            <div><button onClick={this.SendDB}  className='Buts' > Добавить</button>
             <button className='Buts' >x</button>
            </div>
            </div>
            </div>
        )}
}

