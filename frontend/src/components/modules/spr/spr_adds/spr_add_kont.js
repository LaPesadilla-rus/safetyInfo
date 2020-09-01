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
        val_ver:'',
        val_ser:'',
        val_id:'',
        namePO:[],
        versPO:[],
        systa:[],
        kontrs:[],
        new_arr:[],
        new_arrs:[],
        news_arrs:[],
        arrt:[]
        }
    }

    componentDidMount(){
      axio.get('/main/data').then(res=>{
      this.setState({
                 arrt: res.data.contr,
                 namePO:res.data.spr_skzi,
                 versPO:res.data.skzi,
                 systa:res.data.spr_syst

             });
         });
         axio.get('/main/kontragents').then(res=>{
          console.log(res.data)
              this.setState({
                kontrs:res.data,
                  
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
   /* ChooseSyst=(e)=>{
      this.setState({val_syst:e.target.value})
  }

  ChooseVer=(e)=>{
    this.setState({val_ver:e.target.value})
}*/
ChooseSer=(e)=>{
  this.setState({val_ser:e.target.value})
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
   
   ChooseName = (e) => {
    this.setState({ val_name: e.target.value});
    let arr = [];
    let val= e.target.value;
    this.state.kontrs.map(id => {
        if (parseInt(val)=== id.kg_id){
            arr.push(id); }
        })
        if (arr.length === 0) {
            this.setState({
              val_syst: '',
            })
        }//console.log(arr)
        this.setState({
            new_arr: arr
        })
}

ChooseSyst = (e) => {
  this.setState({ val_syst: e.target.value});
  let arr = [];
  let val= e.target.value;
  this.state.new_arr.map(id => {
      if (parseInt(val)=== id.sk_id){
          arr.push(id); }
      })
      if (arr.length === 0) {
          this.setState({
            val_ver: '',
          })
      }console.log(arr)
      this.setState({
        new_arrs: arr
      })
}


ChooseVer = (e) => {
  this.setState({ val_ver: e.target.value});
  let arr = [];
  let val= e.target.value;
  this.state.new_arrs.map(id => {
      if (parseInt(val)=== id.sk_id){
          arr.push(id); }
      })
      if (arr.length === 0) {
          this.setState({
            val_ser: '',
          })
      }console.log(arr)
      this.setState({
        news_arrs: arr
      })
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
              {this.state.kontrs.map( id => <option key={id.kg_id} value={id.kg_id}>{id.kt_name}</option>)}
               </select> 
               <p className='label-posits'>ПО и СКЗИ </p>
            <select className='SelectPole' onChange={this.ChooseSyst} value={this.state.val_syst}>
              <option placeholder='----' value='-1'></option>
              {this.state.new_arr.map( id => <option key={id.sk_id} value={id.sk_id}>{id.skzi_name}</option>)}
               </select> 
               <p className='label-posits'>Версия</p>
            <select className='SelectPole' onChange={this.ChooseVer} value={this.state.val_ver}>
              <option placeholder='----' value='-1'></option>
              {this.state.new_arrs.map( id => <option key={id.sk_id} value={id.sk_id}>{id.skzi_ver}</option>)}
               </select> 
               <p className='label-posits'>Серия</p>
            <select className='SelectPole' onChange={this.ChooseSer} value={this.state.val_ser}>
              <option placeholder='----' value='-1'></option>
              {this.state.news_arrs.map( id => <option key={id.sk_id} value={id.sk_id}>{id.skzi_ser}</option>)}
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

