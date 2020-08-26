import React, {Component} from 'react'
import './spr_add_all.css'
import axio from 'axios';
export default class Spr_add_from extends Component {
    constructor() {
        super();
        this.state = {
        val_org:'',
        val_rekv:''    

        }
    }
    Name_org=(e)=> {
        this.setState({val_org: e.target.value});
      }
      Rekv_org=(e)=> {
        this.setState({val_rekv: e.target.value});
      }

   SendDB=event=>{
    event.preventDefault();
    const data={
        val_org: this.state.val_org,
        val_rekv: this.state.val_rekv
    }
    axio.post('/main/insertFrom', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }
    });
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts froms'>
                <p className='label-posits'>Организация</p>
              <textarea className='txtar' onChange={this.Name_org}>{this.state.val_org}</textarea>  
              <p className='label-posits'>Реквизиты</p>
              <textarea  className='txtar' onChange={this.Rekv_org}>{this.state.val_rekv}</textarea>  
            <div><button  className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.props.form_org}>x</button>
            </div>
            </div>
            </div>
        )}
}