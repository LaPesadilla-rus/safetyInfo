import React, {Component} from 'react';
import './table_find.css';


export default class Table_find extends Component {
    constructor(){
        super();
        this.state = {
            fio: '',
            systemf: '',
            pcf: '',
            data:[],
            frget: false,
            srok:false,
            orgn:false,
            syst:false,
            contr:false,
            prim_on:false,
            prim_tw:false

        }
    }
    SbrosFind=()=>{
        this.setState({
            fio:'',
            systemf:'',
            pcf: ''
        })
    }
    primFilter = () => {
        let data = {};

        if (this.state.fio !== ''){
            data.fio = this.state.fio;
        }
        if (this.state.systemf !== ''){
            data.systemf = this.state.systemf
        }
        if (this.state.pcf !== '' ){
            data.pcf = this.state.pcf;
        }
        console.log(this.props)
        this.props.filterDownload(data)
    }

     HideColFrom=()=>{
         this.setState({frget:!this.state.frget})
     }
     HideColSrok=()=>{
        this.setState({srok:!this.state.srok})
    } 
    HideColOrg=()=>{
        this.setState({orgn:!this.state.orgn})
    }    
    HideColSyst=()=>{
        this.setState({syst:!this.state.syst})
    } 
    HideColCont=()=>{
        this.setState({contr:!this.state.contr})
    }
    HideColPrim_on=()=>{
        this.setState({prim_on:!this.state.prim_on})
    }
    HideColPrim_tw=()=>{
        this.setState({prim_tw:!this.state.prim_tw})
    }
    onSubmit=()=>{

    }
    render(){
        
        return(
           <div className='Blocks'>
           <label className='lab_one'>Поиск по таблице</label>
           <label className='lab_sec'>Скрыть столбцы</label>
           <div>
               <table>
                   <thead></thead>
                   <tbody>
                <tr>
                    <td>ФИО:</td>
                    <td><textarea /*onChange={(e) => {this.setState({ fio: e.target.value})}} value={this.state.fio}*/ className='txt'></textarea> </td>
                </tr>
                <tr>
                    <td> Система:</td>
                    <td><textarea /*onChange={(e) => {this.setState({ systemf: e.target.value})}} value={this.state.systemf}*/  className='txt'></textarea> </td>
                </tr>  
                <tr>
                    <td> ПК:</td>
                    <td><textarea /*onChange={(e) => {this.setState({ pcf: e.target.value})}} value={this.state.pcf}*/  className='txt'></textarea> </td>
                </tr>
                </tbody>     
           </table>   
           </div><div>
               <table>
               <thead></thead>
                   <tbody>
                <tr>
                <td><input className='chk' type='checkbox' checked={this.state.frget} onChange={this.HideColFrom}></input></td>
                <td>От кого получено</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'checked={this.state.srok} onChange={this.HideColSrok}/></td>
                <td>Срок лицензии</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'checked={this.state.orgn} onChange={this.HideColOrg}/></td>
                <td>Организация</td>
                </tr> 
                <tr>
                <td><input className='chk' type='checkbox'checked={this.state.syst} onChange={this.HideColSyst}/></td>
                <td>Система</td>
                </tr> 
                <tr>
                <td><input className='chk' type='checkbox'checked={this.state.contr} onChange={this.HideColCont}/></td>
                <td>Контракт</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'checked={this.state.prim_on} onChange={this.HideColPrim_on}/></td>
                <td>Примечание1</td>
                </tr>
                <tr>
                <td><input className='chk' type='checkbox'checked={this.state.prim_tw} onChange={this.HideColPrim_tw}/></td>
                <td>Примечание2</td>
                </tr>
                </tbody>   
           </table>             
           </div>
           <button  className='FindAndReset'>Применить</button>
           <button className='FindAndReset'>Сбросить</button>
           </div>
        )
    }
}

//

/*
<tr>
<td></td>
<td></td>
</tr>   */