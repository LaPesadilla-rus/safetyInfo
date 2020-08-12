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
   
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st'>
                <p className='label_posit'>Организации</p>
                <button onClick={this.Show_form} className='But'>Добавить</button>
                <table className='txt'>
                <tr>
                {this.state.arr.map(id=> <tr key={id.og_id} row={id}><td>{id.og_name}</td> <button onClick={this.DeleteRow} value={id.og_id}>x</button></tr>)}
                </tr>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_from}>Отмена</button>
            </div>{this.state.form_org && <Spr_add_from form_org={this.Show_form}/>}
            </div>
            </div>
        )}
}

