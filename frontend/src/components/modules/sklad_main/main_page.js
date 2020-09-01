import React, {Component} from 'react';
import axio from 'axios';
import FormchangePrim1 from './formchangePrim1'
import '../spr/spr_all.css'
import Main_page_cont from './main_page_cont'
import Form_add from './form_add'
import Form_change from './form_change'
import Form_arch from './form_arch'

export default class Main_page extends Component {

    constructor() {
        super();
        this.arr=[];
        this.ar_tw=[];
        this.state = {
            data:[],
            arr:[],
            arss:[],
            dates:[],
            frget: false,
            srok:false,
            orgn:false,
            syst:false,
            contr:false,
            show_formPrim:false,
            newRow:false,
            arch:false,
            txt:'',
            text:'',
            ar_new:[],
            actArr:[],
            fio:'',
            system:'',
            pc:'',
            ars:[],
            changeRow:false,
            arrt:[],
            archrow:false,


        }
    }

    onReboot=()=>{
        axio.get('/main/all').then(res=>{
            this.setState({
                arr: res.data,
                arss:res.data,
                
            });
         });
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
        axio.get('/main/all').then(res=>{
             console.log(res.data)
            this.setState({
                arr: res.data,
                arss:res.data,
                
            });
        });
    }
AddRow =()=>{
    this.setState({newRow: !this.state.newRow})
}
ChangePrim=(e)=>{
    
this.setState({show_formPrim:!this.state.show_formPrim,actArr:e })
}

primFilter=()=>{
    let data={}
if  ( this.state.fio!== ''){
    data.fio=this.state.fio;
}
if (this.state.system!==''){
    data.system=this.state.system;
}
if (this.state.pc!==''){
    data.pc=this.state.pc
}   
    axio.post('/main/filterAll', {data}).then(res=>{
        this.setState({
            arr: res.data
    });
});
    
}

Sbros=()=>{
    let data={}
    this.state.fio='';
    this.state.system='';
    this.state.pc='';
    data.fio=this.state.fio;
    data.system=this.state.system;
    data.pc=this.state.pc;
    axio.post('/main/filterAll', {data}).then(res=>{
        this.setState({
            arr: res.data
    });
});
}



ChangeRows=(arr)=>{
    this.setState({changeRow: !this.state.changeRow })
    this.arr=arr;
}

Archrows=(arr)=>{
    this.setState({archrow: !this.state.archrow })
    this.ar_tw=arr;
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
                    <td><textarea onChange={(e) => {this.setState({ fio: e.target.value})}} value={this.state.fio} className='txt'></textarea> </td>
                </tr>
                <tr>
                    <td> Система:</td>
                    <td><textarea onChange={(e) => {this.setState({ system: e.target.value})}} value={this.state.system}  className='txt'></textarea> </td>
                </tr>  
                <tr>
                    <td> ПК:</td>
                    <td><textarea onChange={(e) => {this.setState({ pc: e.target.value})}} value={this.state.pc}  className='txt'></textarea> </td>
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
           <button onClick={this.primFilter}  className='FindAndReset'>Применить</button>
           <button onClick={this.AddRow} className='FindAndReset'>Добавить</button>
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
                            <th className={(this.state.frget===true)?'hide':'Table_head'} >От кого получено ПО и СКЗИ</th>
                            <th className={(this.state.srok===true)?'hide':'Table_head'} >Срок действия лицензии</th>
                            <th className='Table_head'>ФИО пользователя ПО и СКЗИ</th>
                            <th className='Table_head'>Подразделение</th>
                            <th className='Table_head'>Имя ПК</th>
                            <th className='Table_head'>Инвентарный номер ПК</th>
                            <th className={(this.state.orgn===true)?'hide':'Table_head'} >Организация</th>
                            <th className={(this.state.syst===true)?'hide':'Table_head'} >Система</th>
                            <th className={(this.state.contr===true)?'hide':'Table_head'} >Контракт</th>
                            <th className='Table_head'>Дата создания</th>
                            <th className={(this.state.prim_on===true)?'hide':'Table_head'} >Примечание</th>
                            <th className={(this.state.prim_tw===true)?'hide':'Table_head'} >Примечание 2</th>
                            <th></th>
                        </tr>
                        </thead>
                    <tbody>
                            {this.state.arr.map(id => <Main_page_cont key={id.io_id} row={id} frget={this.state.frget} srok={this.state.srok} 
                                                                        orgn={this.state.orgn} syst={this.state.syst}
                                                                        contr={this.state.contr} prim_on={this.state.prim_on}
                                                                        prim_tw={this.state.prim_tw}
                                                                        ChangePrim={this.ChangePrim} changeRow={this.ChangeRows} />)}
                    </tbody>
                </table>{this.state.newRow && <Form_add  onReboot={this.onReboot}newRow={this.AddRow}/>}
                {this.state.changeRow && <Form_change onReboot={this.onReboot} row={this.state.actArr} arr={this.arr} changeRow={this.ChangeRows}/>}
                {this.state.show_formPrim &&  <FormchangePrim1 show_formPrim={this.ChangePrim} onReboot={this.onReboot} row={this.state.actArr}/>}
                </div> 
        </div>
        </div>
        )
    
    }   
}
/*
{this.state.transfer && <Form_arch transfer={this.TransferData} row={this.state.actArr} arr={this.arr}  changeRow={this.ChangeRows} />}
*/


 