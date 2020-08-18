import React, {Component} from 'react'
import './spr_all.css'
import axio from 'axios';
import Spr_add_otd from '../spr/spr_adds/spr_add_otd'
export default class Spr_otdel extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            otdel_names:'',
            addnaim:false,
            otdel_name:''


        }
    }
    componentDidMount(){
        axio.get('/main/spr_otdel').then(res=>{
                this.setState({
                    arr: res.data
                });
            });
       }

       onReboot = () =>{
        axio.get('/main/spr_otdel').then(res=>{
          //console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }

       DeleteRow=(e)=>{
        const data={
           otd: e.target.value
        }
        axio.post('/main/DeleteOtd', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot()

       }

       onChange=(e)=>{
        this.setState({otdel_name: e.target.value})
       }

       ChangeOtd=(e)=>{
        const data1 ={
            otdel_name:this.state.otdel_name,
            otdel_id: e.target.value
        }
         axio.post('/main/UpdateOtd', {data1}).then(res => {
           
        });this.onReboot()
        }
   
   
       ADDNAIM=()=>{
        this.setState({addnaim:!this.state.addnaim})
       }

    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st'>
                <p className='label_posit'>Компьютеры</p>
                <button onClick={this.ADDNAIM} className='But'>Добавить</button>
                <table className='txt'>
                    <tr className='TheHead'>
                    <th>Наименование отдела</th>     
                    <th></th>
                    </tr>
                    <tr>
                    {this.state.arr.map(id=> <tr key={id.otdel_id} row={id}><td><textarea onChange={this.onChange}>{id.otdel_name}</textarea></td> 
                    <button className='CloseBut' onClick={this.DeleteRow} value={id.otdel_id}>x</button>
                    <button className='But' onClick={this.ChangeOtd} value={id.otdel_id}  >у</button></tr>)} 
                    </tr>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_otd}>Отмена</button>
            </div>{this.state.addnaim &&  <Spr_add_otd addnaim={this.ADDNAIM} />}
            </div>
            </div>
        )}
}
