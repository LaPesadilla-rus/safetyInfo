import React, {Component} from 'react';
import './table_find.css';


export default class Table_find extends Component {
    
    
    render(){
        
        return(
           <div className='Blocks'>
           <label className='lab_one'>Поиск по таблице</label>
           <label className='lab_sec'>Скрыть столбцы</label>
           <div>
               <table>
                   <thead></thead>
                   <tbody>
                <tr>
                    <td>ФИО:</td>
                    <td><textarea  className='txt'></textarea> </td>
                </tr>
                <tr>
                    <td> Система:</td>
                    <td><textarea className='txt'></textarea> </td>
                </tr>  
                <tr>
                    <td> ПК:</td>
                    <td><textarea className='txt'></textarea> </td>
                </tr>
                </tbody>     
           </table>   
           </div><div>
               <table>
               <thead></thead>
                   <tbody>
                <tr>
                <td><input className='chk' type='checkbox'></input></td>
                <td>От кого получено</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'/></td>
                <td>Срок лицензии</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'/></td>
                <td>Организация</td>
                </tr> 
                <tr>
                <td><input className='chk' type='checkbox'/></td>
                <td>Система</td>
                </tr> 
                <tr>
                <td><input className='chk' type='checkbox'/></td>
                <td>Контракт</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'/></td>
                <td>Примечание1</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'/></td>
                <td>Примечание2</td>
                </tr>
                </tbody>   
           </table>
           </div>
           </div>
        )
    }
}

//

/*
<tr>
<td></td>
<td></td>
</tr>   */