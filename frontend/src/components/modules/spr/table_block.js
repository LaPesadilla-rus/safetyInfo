import React, {Component} from 'react';
import './table_block.css';


export default class Table_block extends Component {
    
    


    render(){
        
        return(
           <div>
           <button className='Button' >Перенести в архив</button>
           <button className='Button'>Добавить</button>  
           </div>
        )
    }
}