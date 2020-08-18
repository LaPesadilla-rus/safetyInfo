import React, {Component} from 'react'
import './spr_all.css'
import axio from 'axios';
import Spr_add_kont from './spr_adds/spr_add_kont'
export default class Spr_naim extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            need_ar:[],
            kg:'',
            addKont:false,
            kt_name:'',
            skzi_ver:'',
            skzi_ser:'',
            srok:'',
            kg_dgvr:'',
            kg_kol:''
        }
    }
    componentDidMount(){
        axio.get('/main/kontragents').then(res=>{
                this.setState({
                    arr: res.data
                });console.log(this.state.arr)
            });
            this.setState({kt_name:this.props.row.kt_namel})
       }
       

       onReboot = () =>{
        axio.get('/main/kontragents').then(res=>{
          //console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }

       
       DeleteRow=()=>{
        const data={
            kg: this.props.row.kg_id
        }
        axio.post('/main/DeleteKontr', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot()

       }
       AddKontragent=()=>{
           this.setState({addKont:!this.state.addKont})
       }
       
       ChKt_name=(e)=>{
        this.setState({kt_name: e.target.value})
       }
       ChVer=(e)=>{
        this.setState({skzi_ver: e.target.value})
       }
       ChSer=(e)=>{
        this.setState({skzi_ser: e.target.value})
       }
       ChSrok=(e)=>{
        this.setState({srok: e.target.value})
       }
       Chdgvr=(e)=>{
        this.setState({kg_dgvr: e.target.value})
       }
       Chkol=(e)=>{
        this.setState({kg_kol: e.target.value})
       }

       ChangeNaim=(e)=>{
        const data1 ={
            kt_name:this.state.kt_name,
            skzi_ver:this.state.skzi_ver,
            skzi_ser:this.state.skzi_ser,
            srok:this.state.srok,
            kg_dgvr:this.state.kg_dgvr,
            kg_kol:this.state.kg_kol,
            kt_id: this.props.row.kt_id,
            
        }
         axio.post('/main/UpdateKTR', {data1}).then(res => {
           
        });this.onReboot()
        }
     
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st'>
                <p className='label_posit'>Наименование компьютеров</p>
                <button onClick={this.AddKontragent} onChange={this.state.addKont} className='But'>Добавить</button>
                <table  className='txt'>
                <tr className='TheHead' >
                    <th>Контрагент</th>    
                    <th>Версия СКЗИ</th>   
                    <th>Серийный номер</th>  
                    <th>Срок</th> 
                    <th>Реквизиты договора</th> 
                    <th>Количество</th> 
                    <th></th>
                    </tr>
                    <tr className='Nap'>
                    {this.state.arr.map(id=> <tr key={id.kt_id} row={id}>
                    <td><textarea onChange={this.ChKt_name} value={this.state.kt_name}>{id.kt_name}</textarea></td> 
                        <td><textarea>{id.skzi_ver}</textarea></td> 
                        <td><textarea>{id.skzi_ser}</textarea></td> 
                        <td><textarea>{id.srok}</textarea></td> 
                        <td><textarea>{id.kg_dgvr}</textarea></td> 
                        <td><textarea>{id.kg_kol}</textarea></td> 
                        <button onClick={this.ChangeNaim}>y</button>
                        <button onClick={this.DeleteRow} >x</button></tr>)} 
                    </tr>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_org}>Отмена</button>
            </div>{this.state.addKont && <Spr_add_kont addKont={this.AddKontragent}/>}
            </div>
            </div>
        )}
}