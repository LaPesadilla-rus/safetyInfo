import React, {Component} from 'react'
import './spr_all.css'
import axio from 'axios';
import Spr_add_syst from './spr_adds/spr_add_syst';
export default class Spr_naim extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            need_ar:[],
            ins:'',
            show_ins:false,


        }
    }
    componentDidMount(){
        axio.get('/main/spr_inf_sys').then(res=>{
                this.setState({
                    arr: res.data
                });
            });
            console.log(this.props)
       }


       onReboot = () =>{
        axio.get('/main/spr_inf_sys').then(res=>{
          //console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }


       DeleteRow=(e)=>{
        const data={
            ins: e.target.value
        }
        axio.post('/main/DeleteSys', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
                
            }
        });this.onReboot()
             

       }       
    
       


       AddIns=()=>{
        this.setState({show_ins:!this.state.show_ins})
       }
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st'>
                <p className='label_posit'>Наименование СКЗИ</p>
                <button onClick={this.AddIns} className='But'>Добавить</button>
                <table className='txt'>
                    <tr>
                    {this.state.arr.map(id=> <tr key={id.ins_id} row={id}>
                    <td>{id.ins_name}</td>  <button onClick={this.DeleteRow} value={id.ins_id}>x</button></tr>)}
                    </tr>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_syst}>Отмена</button>
            </div>{this.state.show_ins && <Spr_add_syst show_ins={this.AddIns}/>}
            </div>
            </div>
        )}
}