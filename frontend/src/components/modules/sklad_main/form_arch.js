import React, {Component} from 'react';
import './form_work.css'

export default class Form_arch extends Component{
    
    constructor() {
        super();
        this.state = {
            arr:[],
            
        }
    }

    render(){
        return (
        <div className='modal_arch'>
            <div className="modal_pos_arch">
                <div>Перенос данных в архив<div>
                <label className='label_txt'>Перенести данную запись в архив?</label>
                <div>
               <button>Перенести</button>
               <button onClick={this.props.transfer}>Отмена</button>
                 </div>
                </div></div>
        </div>
        </div>
    );
    }   
}