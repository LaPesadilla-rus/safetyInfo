import React, {Component} from 'react';
import './form_work.css'
import Form_arch from './form_arch';
import Form_add from './form_add';



export default class Form_work extends Component {
    constructor() {
        super();
        this.state = {
            transfer:false,
            addRow:false,
            
        }
    }

    TransferData =()=>{
        this.setState({transfer: !this.state.transfer})
    }
    AddRows=()=>{
        this.setState({addRow: !this.state.addRow})
    }
    
    
    render(){
        return (
        <div className='modal'>
            <div className="modal_pos">
                <div>
                    <label>Работа с данными</label>
                    <div >
               <button className='ButChoose' onClick={this.AddRows}>Добавить</button>
               <button className='ButChoose'>Изменить</button>
               <button className='ButChoose' onClick={this.TransferData}>Перенести в архив</button>
               <button className='ButChoose' onClick={this.props.newRow}>Отмена</button>
                 </div>
                 {this.state.transfer && <Form_arch  transfer={this.TransferData}/>}
                 {this.state.addRow && <Form_add  addRow={this.AddRows}/>}
                </div>
               
        </div>
        </div>
    );
    }   
}

 




