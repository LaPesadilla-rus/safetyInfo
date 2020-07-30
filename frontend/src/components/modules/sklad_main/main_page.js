import React, {Component} from 'react';
import Main_page_cont from './main_page_cont';
import './main_page.css'


export default class Main_page extends Component {
    
    render(){
        return (
        <div className='Table_pol'>
                <div>
                <table className='Table' border='1' >
                    <thead> 
                        <tr className='Table_head'>
                            <th>№ п/п</th>
                            <th>Наименование ПО и СКЗИ </th>
                            <th>Версия ПО и СКЗИ</th>
                            <th>Серийный номер (номер по лицензии) ПО и СКЗИ</th>
                            <th>От кого получено ПО и СКЗИ</th>
                            <th>Срок действия лицензии</th>
                            <th>ФИО пользователя ПО и СКЗИ</th>
                            <th>Подразделение</th>
                            <th>Имя ПК</th>
                            <th>Инвентарный номер ПК</th>
                            <th>Организация</th>
                            <th>Система</th>
                            <th>Контракт</th>
                            <th>Примечание</th>
                            <th>Примечание 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Main_page_cont/>
                    </tbody>
                </table>
                </div>
        </div>
    );
    }   
}

 




