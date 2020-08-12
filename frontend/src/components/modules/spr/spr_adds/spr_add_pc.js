import React, {Component} from 'react'
import '../spr_all.css'
import axio from 'axios';
export default class Spr_add_pc extends Component {
    constructor() {
        super();
        this.state = {
        val_pc:'', 
        val_inv:''  

        }
    }
    NewPC=(e)=> {
        this.setState({val_pc: e.target.value});
      }
    NewINV=(e)=> {
        this.setState({val_inv: e.target.value});
      }

   SendDB=event=>{
    event.preventDefault();
    const data={
        val_pc: this.state.val_pc,
        val_inv: this.state.val_inv,
    }
    axio.post('/main/insertPC', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }
    });
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
                <p className='label-posits'>Наименование компьютера</p>
              <textarea  className='txtar'onChange={this.NewPC}>{this.state.val_pc}</textarea>  
                <p className='label-posits'>Инвентарный номер</p>
              <textarea className='txtar' onChange={this.NewINV}>{this.state.val_inv}</textarea>  
            <div><button className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.props.addnaim}>x</button>
            </div>
            </div>
            </div>
        )}
}