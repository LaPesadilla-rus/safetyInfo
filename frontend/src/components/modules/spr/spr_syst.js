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
            ins_name:''

        }
    }
    componentDidMount(){
        axio.get('/main/spr_inf_sys').then(res=>{
            console.log(res.data)
                this.setState({
                    arr: res.data
                });
            });
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
       onChange=(e)=>{
        this.setState({ins_name: e.target.value})
       }

       ChangeNaim=(e)=>{
        const data1 ={
            ins_name:this.state.ins_name,
            ins_id: e.target.value
        }
         axio.post('/main/UpdateSyst', {data1}).then(res => { 
        });this.onReboot()
        }

       AddIns=()=>{
        this.setState({show_ins:!this.state.show_ins})
       }
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st forSyst'>
                <p className='label_posit'>Наименование СКЗИ</p>
                <button onClick={this.AddIns} className='But'>Добавить</button>
                <table className='Table Table_tabl'>
                    <thead>
                        <tr className='TheHead THeHeadBack'>
                        <th>Наименование</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.arr.map(id=> <tr key={id.ins_id} row={id}>
                    <td className='TheHead TheBodyBack'><textarea onChange={this.onChange}>{id.ins_name}</textarea></td> 
                    <td className='TheHead TheBodyBack'>
                     <button onClick={this.DeleteRow} value={id.ins_id}>x</button>
                     </td>
                     <td className='TheHead TheBodyBack'>
                    <button className='But' onClick={this.ChangeNaim} value={id.ins_id} >у</button></td>
                    </tr>)}
                    </tbody>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_syst}>Отмена</button>
            </div>{this.state.show_ins && <Spr_add_syst show_ins={this.AddIns}/>}
            </div>
            </div>
        )}
}