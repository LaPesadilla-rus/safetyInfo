import React, {Component} from 'react';
import './form_work.css'
import axio from 'axios';
export default class Form_change extends Component {

    constructor() {
        super();
        this.state ={
            arr:[],
            new_arr:[]
            

        } }

    componentDidMount (){
        axio.get('/main/all').then(res=>{
        this.setState({
            arr: res.data,
        });
        });
        
    }

    render(){
        return (
        <div className='modal_add'>
            <div className="modal_pos_add">
                <div>Изменение данных
                    <div>
                <div className='NaimPole'>Наименование ПО и СКЗИ<select className='SelectPole'></select></div>
                <div className='NaimPole'>Версия ПО и СКЗИ<select className='SelectPole'></select></div>
                <div className='NaimPole'>Серийный номер<textarea className='AreaTxt'></textarea></div>
                <div className='NaimPole'> От кого получено <select className='SelectPole'></select></div>
                <div className='NaimPole'>Срок действия лицензии<textarea className='AreaTxt'></textarea></div>
                <div className='NaimPole'>ФИО пользователя<textarea className='AreaTxt'></textarea></div>
                <div className='NaimPole'>Подразделения<select className='SelectPole'></select></div>
                <div className='NaimPole'> Имя ПК<select className='SelectPole'></select></div>
                <div className='NaimPole'>Инвентарный номер<textarea className='AreaTxt'></textarea></div>
                <div className='NaimPole'>Организация<select className='SelectPole'></select></div>
                <div className='NaimPole'>Система<textarea className='AreaTxt'></textarea></div>
                <div className='NaimPole'> Контракт<select className='SelectPole'></select></div>
                <div>
                <button className='ButNaim'>Отправить</button>
                <button className='ButNaim' onClick={this.props.changeRow}>Отмена</button>    
                </div>
                 </div>
                </div>
               
        </div>
        </div>
    );
    }   
}



