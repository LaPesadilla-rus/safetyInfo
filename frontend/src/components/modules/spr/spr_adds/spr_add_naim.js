import React, {Component} from 'react'
import './spr_add_all.css'
import axio from 'axios';
export default class Spr_add_naim extends Component {
    constructor() {
        super();
        this.state = {
        val_naim:'',    

        }
    }
    handleChange=(e)=> {
        this.setState({val_naim: e.target.value});
      }

   SendDB=event=>{
    event.preventDefault();
    const data={
        val_naim: this.state.val_naim
    }
    axio.post('/main/insertNaim', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }
    });
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
                <p className='label_posits'>Наименование скзи</p>
              <textarea  className='txtar' onChange={this.handleChange}>{this.state.val_naim}</textarea>  
            <div><button className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.props.addNaim}>x</button>
            </div>
            </div>
            </div>
        )}
}