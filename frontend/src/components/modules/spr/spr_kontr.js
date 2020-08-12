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

        }
    }
    componentDidMount(){
        axio.get('/main/kontragents').then(res=>{
                this.setState({
                    arr: res.data
                });console.log(this.state.arr)
            });
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
                    <tr>
                    {this.state.arr.map(id=> <tr key={id.kt_id} row={id}>
                        <td>{id.kt_name}</td> 
                        <td>{id.skzi_ver}</td> 
                        <td>{id.skzi_ser}</td> 
                        <td>{id.srok}</td> 
                        <td>{id.kg_dgvr}</td> 
                        <td>{id.kg_kol}</td> 
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