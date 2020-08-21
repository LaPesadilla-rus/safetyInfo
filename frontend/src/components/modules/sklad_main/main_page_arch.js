import React, {Component} from 'react';
import './main_page.css';
import axio from 'axios';
import BackToMain from './BackToMain'
import Main_page_cont_arch from './main_page_cont_arch'

export default class Main_page_arch extends Component {

    constructor() {
        super();
        this.state = {
            arr_arch:[],
            frget: false,
            srok:false,
            orgn:false,
            syst:false,
            contr:false,
            prim_on:false,
            prim_tw:false,
            newRow:false,
            arch:false,
            changePrim1:false,
            changePrim2:false,
            fioa:'',
            systema:'',
            pca:'',
            txt:'',
            text:'',
            act_arr:[]
        }
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

    componentDidMount (){
        axio.get('/main/ArchAll').then(res=>{
         console.log(res.data)
            this.setState({
                arr_arch: res.data
            });
        });
    }
    

    
primFilter=()=>{
    let data={}
if  ( this.state.fioa!== ''){
    data.fio=this.state.fioa;
}
if (this.state.systema!==''){
    data.system=this.state.systema;
}
if (this.state.pca!==''){
    data.pc=this.state.pca
}   
    axio.post('/main/filterAllArch', {data}).then(res=>{
        this.setState({
            arr_arch: res.data
    });
});
    
}

Sbros=()=>{
    let data={}
    this.state.fioa='';
    this.state.systema='';
    this.state.pca='';
    data.fio=this.state.fioa;
    data.system=this.state.systema
    data.pc=this.state.pca;
   
         axio.post('/main/filterAllArch', {data}).then(res=>{
        this.setState({
            arr_arch: res.data
                     });
                    });
                }

    AddRow =(arr)=>{
        this.setState({
            newRow: !this.state.newRow,
            act_arr:arr
        })
    }

    render(){
        return (
            <div>
            <div className='Blocks'>
        <label className='lab_one'>Поиск по таблице</label>
        <label className='lab_sec'>Скрыть столбцы</label>
        <div>
            <table>
                <thead></thead>
                <tbody>
             <tr>
                 <td>ФИО:</td>
                 <td><textarea onChange={(e) => {this.setState({ fioa: e.target.value})}} value={this.state.fioa} className='txt'></textarea> </td>
             </tr>
             <tr>
                 <td> Система:</td>
                 <td><textarea onChange={(e) => {this.setState({ systema: e.target.value})}} value={this.state.systema} className='txt'></textarea> </td>
             </tr>  
             <tr>
                 <td> ПК:</td>
                 <td><textarea onChange={(e) => {this.setState({ pca: e.target.value})}} value={this.state.pca} className='txt'></textarea> </td>
             </tr>
             </tbody>     
        </table>   
        </div>
        <div>
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
            <button onClick={this.primFilter}  className='FindAndReset'>Применить</button>
            <button onClick={this.Sbros} className='FindAndReset'>Сбросить</button>
        </div> 
     <div className='Table_pol'>
             <div>
             <table className='Table' border='1' >
                 <thead> 
                     <tr className='Table_head'>
                         <th className='Table_head' >№ п/п</th>
                         <th className='Table_head'>Наименование ПО и СКЗИ </th>
                         <th className='Table_head'>Версия ПО и СКЗИ</th>
                         <th className='Table_head'>Серийный номер (номер по лицензии) ПО и СКЗИ</th>
                         <th className={(this.state.frget===true)?'hide':'Table_head'} onClick={this.HideColFrom}>От кого получено ПО и СКЗИ</th>
                         <th className={(this.state.srok===true)?'hide':'Table_head'} onClick={this.HideColSrok}>Срок действия лицензии</th>
                         <th className='Table_head'>ФИО пользователя ПО и СКЗИ</th>
                         <th className='Table_head'>Подразделение</th>
                         <th className='Table_head'>Имя ПК</th>
                         <th className='Table_head'>Инвентарный номер ПК</th>
                         <th className={(this.state.orgn===true)?'hide':'Table_head'} onClick={this.HideColOrg}>Организация</th>
                         <th className={(this.state.syst===true)?'hide':'Table_head'} onClick={this.HideColOrg}>Система</th>
                         <th className={(this.state.contr===true)?'hide':'Table_head'} onClick={this.HideColCont}>Контракт</th>
                         <th className='Table_head'>Дата создания</th>
                         <th className={(this.state.prim_on===true)?'hide':'Table_head'} >Примечание</th>
                         <th className={(this.state.prim_tw===true)?'hide':'Table_head'} >Примечание 2</th>
                         <th></th>
                     </tr>
                     </thead>
                 <tbody>
                 {this.state.arr_arch.map(id=> <Main_page_cont_arch key={id.io_id} row={id} newRow={this.AddRow} 
                                                                    frget={this.state.frget} srok={this.state.srok} 
                                                                    orgn={this.state.orgn} syst={this.state.syst}
                                                                    contr={this.state.contr} prim_on={this.state.prim_on}
                                                                    prim_tw={this.state.prim_tw}/>)}
                 </tbody>
             </table>{this.state.newRow && <BackToMain  row={this.state.act_arr} newRow={this.AddRow}/>}
             </div>
     </div>
     </div>
     )
    }   
}

 




