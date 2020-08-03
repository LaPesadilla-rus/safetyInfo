import React, {Component} from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';

export default class Header extends Component{
    render (){
        return (
            <div className="header header_pos">
                <div className="nameSite"> Учет </div>
                <div className="login"> Пользователь: {this.props.userName}</div>
                <NavLink className='Link' to='/main'>Основной справочник</NavLink>
                <NavLink className='Link' to='/arch'>Архив</NavLink>
            </div>
        );
    }
}