import React, {Component} from 'react'
import './spr_all.css'
import axio from 'axios';
import Spr_add_ktr from './spr_adds/spr_add_ktr';
export default class Spr_ktr extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            name_ktr:'',
            addKtr:false,
        }
    }

    onReboot = () =>{
        axio.get('/main/spr_ktr').then(res=>{
          console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }

    componentDidMount(){
        axio.get('/main/spr_ktr').then(res=>{
                this.setState({
                    arr: res.data
                });
            });
       }

       DeleteRow=(e)=>{
        const data={
            name_ktr: e.target.value
        }
        axio.post('/main/DeleteKTR', {data}).then(res => {
            if (res.data === 'DELETE COMPLITE') {
                alert('Удалено');
                this.onReboot();
            }
        }); 
    }
   
       ADDKTR=()=>{
        this.setState({addKtr:!this.state.addKtr})
       }

       ChangePC=(e)=>{
        const data1 ={
            name_ktr:this.state.pc_name,
            pc: e.target.value
        }
         axio.post('/main/UpdatePC', {data1}).then(res => { 
        });
        this.onReboot()
        }
    
        onClose=()=>{
            this.props.spr_ktr()
        }

    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st forContr'>
                <p className='label_posit'>Наименование контрагента</p>
                <button onClick={this.ADDKTR} className='But'>Добавить</button>
                <table className='Table Table_tabl'>
                    <thead>
                        <tr className='TheHead THeHeadBack'>
                            <th>№</th>
                            <th>Наименование</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.state.arr.map(id=><tr key={id.kt_id} row={id}>
                            <td className='TheHead TheBodyBack'> {id.kt_id}</td>
                             <td className='TheHead TheBodyBack'>{id.kt_name}</td>
                            <td className='TheHead TheBodyBack'><button  className='But' >y</button></td>
                            <td className='TheHead TheBodyBack'><button onClick={this.DeleteRow} value={id.kt_id} className='CloseBut' >x</button> </td>
                        </tr>)}
                    </tbody>
                </table>    
            <div>
                <button className='But' onClick={this.onClose}>Отмена</button>
            </div>{this.state.addKtr && <Spr_add_ktr onReboot={this.onReboot} addKtr={this.ADDKTR}/>}
            </div>
            </div>
        )}
}
