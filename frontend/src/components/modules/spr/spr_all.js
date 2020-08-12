import React, {Component} from 'react';
import './spr_all.css'
import Spr_kontr from './spr_kontr';
import Spr_ps from './spr_ps'
import axio from 'axios';
import Spr_naim from './spr_naim';
import Spr_from from './spr_from';
import Spr_syst from './spr_syst';
import Spr_otdel from './spr_otdel';
export default class Spr_all extends Component {
    constructor() {
        super();
        this.state = {
            spr_naim:false,
            spr_syst:false,
            spr_from:false,
            spr_org:false,
            spr_pc:false,
            spr_otd:false,
            arr_kontr:[]

            
        }
    }
   componentDidMount(){
            axio.get('/main/kontragents').then(res=>{
                this.setState({
                    arr_kontr: res.data
                });
            });
        
        
        
   }
    
    OpenSprOrg=()=>{
        this.setState({spr_org:!this.state.spr_org})
    }
    OpenSprPC=()=>{
        this.setState({spr_pc:!this.state.spr_pc})
    }
    OpenSprNaim=()=>{
        this.setState({spr_naim:!this.state.spr_naim})
    }
    OpenSprFrom=()=>{
        this.setState({spr_from:!this.state.spr_from})
    }
    OpenSprSyst=()=>{
        this.setState({spr_syst:!this.state.spr_syst})
    }
    OpenSprOtd=()=>{
        this.setState({spr_otd:!this.state.spr_otd})
    }
   
   

  render(){
      return(
          <div className='BlockARch'>
              <div>
              <button className='ButArch' onClick={this.OpenSprNaim}>Наименование ПО и СКЗИ</button>
              <button className='ButArch' onClick={this.OpenSprPC}>Компьютеры</button>
              <button className='ButArch' onClick={this.OpenSprOrg}>Организации</button>
              <button className='ButArch' onClick={this.OpenSprFrom}>От кого</button>
              <button className='ButArch' onClick={this.OpenSprSyst}>Система</button>
              <button className='ButArch' onClick={this.OpenSprOtd}>Отделы</button>
              </div>
             {this.state.spr_org && this.state.arr_kontr.map(id=> <Spr_kontr key={id.kg_id} spr_org={this.OpenSprOrg} row={id}></Spr_kontr>) }
            {this.state.spr_pc &&  <Spr_ps   spr_pc={this.OpenSprPC} />}
            {this.state.spr_naim && <Spr_naim   spr_naim={this.OpenSprNaim} /> }
            {this.state.spr_from && <Spr_from  spr_from={this.OpenSprFrom} />}
            {this.state.spr_syst &&<Spr_syst  spr_syst={this.OpenSprSyst} />}
            {this.state.spr_otd &&<Spr_otdel spr_otd={this.OpenSprOtd} />}
          </div>
      )
  }
}