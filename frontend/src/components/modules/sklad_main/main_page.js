import React, {Component} from 'react';
import Main_page_cont from './main_page_cont';
import './main_page.css'
import axio from 'axios';
import Form_arch from './form_arch';
import Table_find from '../spr/table_find'


export default class Main_page extends Component {

    constructor() {
        super();
        this.state = {
            arr:[],

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
    
    render(){
        return (
        <div className='Table_pol'>
            <Table_find/>
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
                            <th>Дата создания</th>
                            <th>Примечание</th>
                            <th>Примечание 2</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                     {this.state.arr.map(id => <Main_page_cont key={id.io_id} row={id}/>)}
                    </tbody>
                </table>
                </div>
        </div>
    );
    }   
}

 




