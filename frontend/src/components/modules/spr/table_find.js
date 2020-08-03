import React, {Component} from 'react';
import './table_find.css';


export default class Table_find extends Component {
    
    
    render(){
        
        return(
           <div className='Blocks'>
           <label className='lab_one'>Поиск по таблице</label>
           <label className='lab_sec'>Скрыть столбцы</label>
           <div>      
           ФИО:<textarea  className='txt'></textarea> 
           Система:<textarea className='txt'></textarea>  
           ПК:<textarea className='txt'></textarea> 
           </div>
           <div>
           <input className='chk' type='checkbox'/>
           <input className='chk' type='checkbox'></input>
           <input className='chk' type='checkbox'></input>
           <input className='chk' type='checkbox'></input>
           <input className='chk' type='checkbox'></input>
           <input className='chk' type='checkbox'></input>
           <input className='chk' type='checkbox'></input>
           </div>
          
           </div>
        )
    }
}

//