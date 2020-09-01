import React, {Component} from 'react'
import '../spr_all.css'
import axio from 'axios';
export default class Spr_add_ktr extends Component {
    constructor() {
        super();
        this.state = {
        name_ktr:'' 
        }
          }

    NewNameKTR=(e)=> {
        this.setState({name_ktr: e.target.value});
      }

   SendDB=event=>{
    event.preventDefault();
    const data={
        name_ktr: this.state.name_ktr,
    }
    axio.post('/main/InsertKTR', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
            
        }
    });
   }
   
   onClose=()=>{
       this.props.addKtr()
    }
    
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
                <p className='label-posits'>Наименование компьютера</p>
              <textarea  className='txtar'onChange={this.NewNameKTR}>{this.state.name_ktr}</textarea>  
            <div><button className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts'onClick={this.onClose} >x</button>
            </div>
            </div>
            </div>
        )}
}