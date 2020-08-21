import React, {Component} from 'react';
import './form_work.css'
import Form_arch from './form_arch';
import Form_add from './form_add';
import Form_change from './form_change'
import axio from 'axios';

export default class Form_work extends Component {
    constructor() {
        super();
        this.arr=[]
        this.state = {
            transfer:false,
            addRow:false,
            changeRow:false,
            chrow:[],
            arr:[]  
        }
    }

    componentDidMount (){
        axio.get('/main/all').then(res=>{
          console.log(res.data)
            this.setState({
                arr: res.data
            });
        });
    }
   
    TransferData =()=>{
        this.setState({transfer: !this.state.transfer})
    }

    AddRows=()=>{
        this.setState({addRow: !this.state.addRow})
    }

    ChangeRows=(arr)=>{
        this.setState({changeRow: !this.state.changeRow })
        this.arr=arr;
    }
    
    render(){
        return (
    <div className='FonMod'>
        <div className='modal'>
            <div className="modal_pos">
                <div>
                    <label>Работа с данными</label>
                    <div >
                        <button className='ButChoose' onClick={this.AddRows}>Добавить</button>
                        <button className='ButChoose' onClick={this.ChangeRows}>Изменить</button>
                        <button className='ButChoose' onClick={this.TransferData}>Перенести в архив</button>
                        <button className='ButChoose' onClick={this.props.newRow}>Отмена</button>
                 </div>
                        {this.state.transfer && this.state.arr.map(id=><Form_arch key={id.io_id} row={id}  transfer={this.TransferData}/>)}
                        {this.state.addRow && <Form_add addRow={this.AddRows}/>}
                        {this.state.changeRow && <Form_change arr={this.arr}  changeRow={this.ChangeRows}/>}
                </div>
               
            </div>
        </div>
    </div>
    );
    }   
}

 




