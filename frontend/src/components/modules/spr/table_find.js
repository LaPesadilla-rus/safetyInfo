import React, {Component} from 'react';
import './spr_block.css';


export default class Table_find extends Component {
    
    


    render(){
        
        return(
           <div>
           <label>Поиск по таблице</label>
           <label>Скрыть столбцы</label>
           <div>
           <textarea>ФИО</textarea> 
           <textarea>Система</textarea> 
           <textarea>ПК</textarea> 
           </div>
           </div>
        )
    }
}