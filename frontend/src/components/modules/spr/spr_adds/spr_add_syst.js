import React, {Component} from 'react'
import '../spr_all.css'
import axio from 'axios';
export default class Spr_add_syst extends Component {
    constructor() {
        super();
        this.state = {
        val_ins:''

        }
    }
    Name_ins=(e)=> {
        this.setState({val_ins: e.target.value});
      }

      
      onReboot = () =>{
        axio.get('/main/spr_inf_sys').then(res=>{
          //console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }
     

   SendDB=event=>{
    event.preventDefault();
    const data={
        val_ins: this.state.val_ins,
    }
    axio.post('/main/insertSyst', {data}).then(res => {
        if (res.data === 'INSERT COMPLITE') {
            alert('Сохранено');
        
        }
    });this.onReboot()
   }
   
    render(){
        return(<div className='Ps_froms'>
            <div className='Ps_sts'>
            <p className='label-posits'>Название </p>
              <textarea className='txtar' onChange={this.Name_ins}>{this.state.val_ins}</textarea>   
            <div><button className='Buts' onClick={this.SendDB}> Добавить</button>
             <button className='Buts' onClick={this.props.show_ins} >x</button>
            </div>
            </div>
            </div>
        )}
}