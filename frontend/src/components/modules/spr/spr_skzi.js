import React, {Component} from 'react'
import './spr_all.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import Spr_skzi_nap from './spr_skzi_nap'
import Spr_add_skzi from './spr_adds/spr_add_skzi'

export default class Spr_skzi extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            arr:[],
            addSKZI:false,
        }
    }
    componentDidMount(){
       
        axio.get('/main/skzi').then(res=>{
               console.log(res.data)
                   this.setState({
                    arr: res.data,
                          });
                      });
       }
       onReboot = () =>{
        axio.get('/main/skzi').then(res=>{
          console.log(res.data)
              this.setState({
                arr: res.data
              });
          });
        }
       DeleteRow=(e)=>{
        const data={
            kt_id: e.target.value
        }
        axio.post('/main/DeleteKontr', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot();
        
       }
       AddSKZI=()=>{
           this.setState({addSKZI:!this.state.addSKZI})
       }
       
       ChangeNaim=(e)=>{
        const data1 ={
            kt_name:this.state.kt_name,
            skzi_ver:this.state.skzi_ver,
            skzi_ser:this.state.skzi_ser,
            srok:this.state.srok,
            kg_dgvr:this.state.kg_dgvr,
            kg_kol:this.state.kg_kol,
        }
        this.props.OpenSprOrg(this.props.row)
         axio.post('/main/UpdateKTR', {data1}).then(res => {
           
        });this.onReboot()
        }
     
        onClose=()=>{
            this.props.spr_skzi()
        }
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st'>
                <p>СКЗИ</p>
                <div>
                <button onClick={this.AddSKZI}>+</button>
                </div>
               <table className='Table Table_tabl'>
                   <thead>
                       <tr className='TheHead THeHeadBack'>
                       <th>Система</th>  
                        <th>Версия</th>
                        <th>Серийный номер</th>
                        <th>Срок действия</th>
                        <th></th>
                        <th></th>
                       </tr>
                   </thead>
                   <tbody>{this.state.arr.map(id=> <Spr_skzi_nap key={id.sk_id} row={id} />)}</tbody>
               </table>
               <button className='But' onClick={this.onClose}>Отмена</button>
               
                 </div>{this.state.addSKZI && <Spr_add_skzi addSKZI={this.AddSKZI}/>}

            <div>
                
            </div>
            </div>
            
        )}
}