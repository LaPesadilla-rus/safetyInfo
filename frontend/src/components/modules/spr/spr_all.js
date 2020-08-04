import React, {Component} from 'react';
import './spr_all.css'
export default class Spr_all extends Component {
   
  render(){
      return(
          <div className='BlockARch'>
              <button className='ButArch'>Наименование ПО и СКЗИ</button>
              <button className='ButArch'>Компьютеры</button>
              <button className='ButArch'>Организации</button>
              <button className='ButArch'>От кого</button>
              <button className='ButArch'>Система</button>
          </div>
      )
  }
}