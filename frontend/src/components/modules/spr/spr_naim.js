import React, {Component} from 'react'
import './spr_all.css';
import Spr_add_naim from './spr_adds/spr_add_naim';
import axio from 'axios';
export default class Spr_naim extends Component {
    constructor() {
        super();
        this.ars={};
        this.state = {
            addNaim:false,
            arr:[],
            ss_id:'',
            show_formEdit:false,
            ed_ar:[],
            ss_name:'' 
        }
    }
    componentDidMount(){
        axio.get('/main/spr_skzi').then(res=>{
          //  console.log(res.data)
                this.setState({
                    arr: res.data
                });
            });
       }
    
       onReboot = () =>{
        axio.get('/main/spr_skzi').then(res=>{
         // console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }

       ADDNAIM=()=>{
        this.setState({addNaim:!this.state.addNaim})
       }
       DeleteRow=(e)=>{
        const data={
            ss_id: e.target.value
        }
        axio.post('/main/DeleteNaim', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot()

       }
   
       onChange=(e)=>{
        this.setState({ss_name: e.target.value})
       }

       ChangeNaim=(e)=>{
        const data1 ={
            ss_name:this.state.ss_name,
            ss_id: e.target.value
        }
         axio.post('/main/UpdateNaim', {data1}).then(res => {
            if (res.data === 'UPDATE COMPLITE') {
                alert('Изменено');
            }
        });this.onReboot()
        }
   
        

    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st forNaim'>
                <p className='label_posit'>Наименование СКЗИ</p>
                <div>
                <button className='But' onClick={this.ADDNAIM}>Добавить</button></div>
                <table className='Table Table_tabl'  >
                    <thead>
                        <tr className='TheHead THeHeadBack'>
                            <th>Наименование</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                {this.state.arr.map(id=> <tr key={id.ss_id} row={id}>
            <td className='TheHead TheBodyBack' ><textarea onChange={this.onChange} className='textarea'>{id.ss_name}</textarea></td>  
            <td className='TheHead TheBodyBack'><button className='CloseBut' onClick={this.DeleteRow} value={id.ss_id}>x</button></td> 
            <td className='TheHead TheBodyBack'> <button className='CloseBut' onClick={this.ChangeNaim} value={id.ss_id}  >у</button></td> </tr>)}
                    </tbody>
               
                    </table>
            <div>
                <button className='But'   onClick={this.props.spr_naim}>Отмена</button>
            </div>{this.state.addNaim &&  <Spr_add_naim addNaim={this.ADDNAIM} />}
            </div>
            </div>
        )}
}

//