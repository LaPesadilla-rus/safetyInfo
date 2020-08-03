import React, {Component} from 'react';
import './form_work.css'

export default class Form_add extends Component {

    render(){
        return (
        <div className='modal_add'>
            <div className="modal_pos_add">
                <div>Добавление данных
                    <div>
                Наименование ПО и СКЗИ<select></select>
                Версия ПО и СКЗИ<select></select>
                Серийный номер<textarea></textarea>
                От кого получено <select></select>
                Срок действия лицензии<textarea></textarea>
                ФИО пользователя<textarea></textarea>
                Подразделения<select></select>
                Имя ПК<select></select>
                Инвентарный номер<textarea></textarea>
                Организация<select></select>
                Система<textarea></textarea>
                Контракт<select></select>
                <div>
                <button>Отправить</button>
                <button onClick={this.props.addRow}>Отмена</button>    
                </div>
                 </div>
                </div>
               
        </div>
        </div>
    );
    }   
}



