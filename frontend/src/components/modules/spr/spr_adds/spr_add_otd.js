import React, {Component} from 'react'
import '../spr_all.css'
import axio from 'axios';
export default class Spr_add_otd extends Component {
    constructor() {
        super();
        this.state = {
        val_otd:'', 

        }
    }
    NewOtdel=(e)=> {
        this.setState({val_otd: e.target.value});
      }
    

   SendDB=event=>{
    event.preventDefault();
    const data={
        val_otd: this.state.val_otd,
        
    }
    axio.post('/main/insertOtd', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }
    });
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
                <p className='label-posits'>Наименование отдела</p>
              <textarea  className='txtar'onChange={this.NewOtdel}>{this.state.val_otd}</textarea>  
            <div><button className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.props.addnaim}>x</button>
            </div>
            </div>
            </div>
        )}
}