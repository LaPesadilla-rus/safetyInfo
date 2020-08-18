import React, {Component} from 'react'
import './spr_all.css'
import axio from 'axios';
import Spr_add_pc from '../spr/spr_adds/spr_add_pc'
export default class Spr_naim extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            pc_names:'',
            pc_ser_num:'',
            addnaim:false,
            pc_name:'',
            pc_inv_num:''

        }
    }

    onReboot = () =>{
        axio.get('/main/spr_pc').then(res=>{
          console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }

    componentDidMount(){
        axio.get('/main/spr_pc').then(res=>{
                this.setState({
                    arr: res.data
                });
            });
       }
       DeleteRow=(e)=>{
        const data={
            pc: e.target.value
        }
        axio.post('/main/DeletePC', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot() }
   
       ADDNAIM=()=>{
        this.setState({addnaim:!this.state.addnaim})
       }
       PCChange=(e)=>{
        this.setState({pc_name: e.target.value})
       }

       ChangePC=(e)=>{
        const data1 ={
            pc_name:this.state.pc_name,
            pc: e.target.value
        }
        
         axio.post('/main/UpdatePC', {data1}).then(res => {
           
        });this.onReboot()
        }
    
        InvNumChange=(e)=>{
            this.setState({pc_inv_num: e.target.value})
           }
    
           ChangeInv_num=(e)=>{
            const data2 ={
                pc_inv_num:this.state.pc_inv_num,
                pc: e.target.value
            }
            
             axio.post('/main/UpdateInv_num', {data2}).then(res => {
               
            });this.onReboot()
            }
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st'>
                <p className='label_posit'>Компьютеры</p>
                <button onClick={this.ADDNAIM} className='But'>Добавить</button>
                <table className='txt'>
                    <tr className='TheHead'>
                    <th>Имя компьютера</th>    
                    <th>Инвентарный номер</th>   
                    <th></th>
                    </tr>
                    <tr>
                    {this.state.arr.map(id=> <tr key={id.pc_id} row={id}>
                    <td>
                    <textarea onChange={this.PCChange}>{id.pc_name}</textarea>
                    <button className='Edit_pc' onClick={this.ChangePC} value={id.pc_id}></button>
                    </td>
                    <td>
                    <textarea onChange={this.InvNumChange}>{id.pc_inv_num}</textarea>
                    <button className='Edit_pc' onClick={this.ChangeInv_num} value={id.pc_id}></button>
                    </td> 
                    <button className='CloseBut' onClick={this.DeleteRow} value={id.pc_id}>x</button></tr>)} 
                    </tr>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_pc}>Отмена</button>
            </div>{this.state.addnaim &&  <Spr_add_pc addnaim={this.ADDNAIM} />}
            </div>
            </div>
        )}
}

//{this.state.arr.map(id=> <li key={id.pc_id} row={id}>{id.pc_name} {id.pc_inv_num}   <button>x</button></li>)}

/*


 <table className='txt'>
                <tr >
                {this.state.arr.map(id=> <tr key={id.ss_id} row={id}><td >{id.ss_name}</td>  
             <button className='CloseBut' onClick={this.DeleteRow}>x</button></tr>)}
                    </tr>
                    </table>*/