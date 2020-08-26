import React, {Component} from 'react'
import './spr_all.css'
import axio from 'axios';
import Spr_add_from from '../spr/spr_adds/spr_add_from'
export default class Spr_from extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            org:'',
            form_org:false,
            og_name:''

        }
    }
    componentDidMount(){
        axio.get('/main/spr_org').then(res=>{
                this.setState({
                    arr: res.data
                });
            });
       }

       Show_form=()=>{
           this.setState({form_org:!this.state.form_org})
       }
    
       onReboot = () =>{
        axio.get('/main/spr_org').then(res=>{
          //console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }

       DeleteRow=(e)=>{
        const data={
            org: e.target.value
        }
        console.log(this.props.row)
        axio.post('/main/DeleteOrg', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot()

       }
   
       onChange=(e)=>{
        this.setState({og_name: e.target.value})
       }

       ChangeFrom=(e)=>{
        const data1 ={
            og_name:this.state.og_name,
            og_id: e.target.value
        }
         axio.post('/main/UpdateFrom', {data1}).then(res => { 
        });this.onReboot()
        }

    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st forFrom'>
                <p className='label_posit'>Организации</p>
                <button onClick={this.Show_form} className='But'>Добавить</button>
                <table className='txt'>
                <tr>
                {this.state.arr.map(id=> <tr key={id.og_id} row={id}>
                    <td><textarea className='textarea' onChange={this.onChange}>{id.og_name}</textarea></td> 
                    <button className='But' onClick={this.DeleteRow} value={id.og_id}>x</button>
                    <button className='But' onClick={this.ChangeFrom} value={id.og_id}  >у</button>
                    </tr>)}
                </tr>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_from}>Отмена</button>
            </div>{this.state.form_org && <Spr_add_from form_org={this.Show_form}/>}
            </div>
            </div>
        )}
}

