import React, {Component} from 'react';
import './spr_all.css';
import Spr_kontr from './spr_kontr';
import Spr_ps from './spr_ps';
import axio from 'axios';
import Spr_naim from './spr_naim';
import Spr_from from './spr_from';
import Spr_syst from './spr_syst';
import Spr_otdel from './spr_otdel';
import Spr_skzi from './spr_skzi';
import Spr_pers from './spr_pers';
import Spr_ktr from './spr_ktr';
export default class Spr_all extends Component {
    constructor() {
        super();
        this.arr=[];
        this.state = {
            spr_naim:false,
            spr_syst:false,
            spr_from:false,
            spr_org:false,
            spr_pc:false,
            spr_otd:false,
            spr_skzi:false,
            spr_pers:false,
            spr_ktr:false,
            arr_kontr:[],
            actArr:[],
            changeOrg:false,
        }
    }
   componentDidMount(){
            axio.get('/main/kontragents').then(res=>{
                this.setState({
                    arr_kontr: res.data
                });
            });
   }
    
    OpenSprOrg=(e)=>{
        this.setState({spr_org:!this.state.spr_org,actArr:e})
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
    OpenSprSKZI=()=>{
        this.setState({spr_skzi:!this.state.spr_skzi})
    }
    OpenSprPers=()=>{
        this.setState({spr_pers:!this.state.spr_pers})
    }
    OpenSprKtr=()=>{
        this.setState({spr_ktr:!this.state.spr_ktr})
    }
  render(){
      return(
          <div className='BlockARch'>
              <div>
                  <table className='BlockARch'>
                      <tr>
              <button className='ButSPR ' onClick={this.OpenSprNaim}>Наименование ПО и СКЗИ</button>
              <button className='ButSPR' onClick={this.OpenSprPC}>Компьютеры</button>
              <button className='ButSPR' onClick={this.OpenSprOrg}>Организации</button>
              <button className='ButSPR' onClick={this.OpenSprFrom}>От кого</button>
              <button className='ButSPR' onClick={this.OpenSprSyst}>Система</button>
              </tr>
              <tr>
              <button className='ButSPR ButSPR_down ' onClick={this.OpenSprOtd}>Отделы</button>
              <button className='ButSPR ButSPR_down' onClick={this.OpenSprSKZI}>СКЗИ</button>
              <button className='ButSPR ButSPR_down' onClick={this.OpenSprPers}>Сотрудники</button>
              <button className='ButSPR ButSPR_down' onClick={this.OpenSprKtr}>Наименование контрагента</button>
              </tr>
              </table>
              </div>
             {this.state.spr_org &&  <Spr_kontr row={this.state.actArr}  spr_org={this.OpenSprOrg} /> }
            {this.state.spr_pc &&  <Spr_ps   spr_pc={this.OpenSprPC} />}
            {this.state.spr_naim && <Spr_naim   spr_naim={this.OpenSprNaim} /> }
            {this.state.spr_from && <Spr_from  spr_from={this.OpenSprFrom} />}
            {this.state.spr_syst &&<Spr_syst  spr_syst={this.OpenSprSyst} />}
            {this.state.spr_otd &&<Spr_otdel spr_otd={this.OpenSprOtd} />}
            {this.state.spr_skzi &&<Spr_skzi spr_skzi={this.OpenSprSKZI} />}
            {this.state.spr_pers &&<Spr_pers spr_pers={this.OpenSprPers} />}
            {this.state.spr_ktr &&<Spr_ktr spr_ktr={this.OpenSprKtr} />}
          </div>
      )
  }
}