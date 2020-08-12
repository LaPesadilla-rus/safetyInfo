import React, {Component} from 'react';
import './header.css';
import axio from 'axios';
import { NavLink } from 'react-router-dom';

export default class Header extends Component{


    exitButton = () =>{
        localStorage.clear();
        axio.get('/auth/out').then(res=>{
        }); //разобраться как что работает
    }
    render (){
        return (
            <div className="header header_pos">
                <div className="nameSite" > Учет </div>
                <div className="login"> Пользователь: {this.props.userName}
                <div>
                <button onClick={this.exitButton} className='Exit'>Выйти</button>
                </div>
                </div>
                <NavLink className='Link' to='/main'>Основная таблица</NavLink>
                <NavLink className='Link' to='/arch'>Архив</NavLink>
                <NavLink className='Link' to='/spr'>Работа со справочниками</NavLink>
            </div>
        );
    }
}