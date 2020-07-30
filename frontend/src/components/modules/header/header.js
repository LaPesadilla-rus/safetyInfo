import React, {Component} from 'react';
import './header.css';

export default class Header extends Component{
    render (){
        return (
            <div className="header header_pos">
                <div className="nameSite"> Учет </div>
                <div className="login"> Пользователь: {this.props.userName}</div>
                <button>Основной справочкни</button>
                <button>Архив</button>
            </div>
        );
    }
}