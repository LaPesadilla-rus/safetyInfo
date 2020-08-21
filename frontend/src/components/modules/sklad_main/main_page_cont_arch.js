import React, {Component} from 'react';
import './main_page.css'
import axio from 'axios';

export default class Main_page_cont_arch extends Component 
{

    onClick=()=>{
        this.props.newRow(this.props.row)
    }

    componentDidMount (){
        axio.get('/main/ArchAll').then(res=>{
         console.log(res.data)
            this.setState({
                arr_arch: res.data
            });
        });
    }
    
    render(){let id= this.props.row
        return (
            <tr className='Hover' >
                <td className='Table_text'>{id.a_id}</td>
                <td className='Table_text'>{id.skzi_name}</td>
                <td className='Table_text'>{id.skzi_ver}</td>
                <td className='Table_text'>{id.skzi_ser}</td>
                <td className={(this.props.frget===true)?'hide':'Table_text'} onClick={this.HideColFrom}>{id.ktr_name}</td>
                <td className={(this.props.srok===true)?'hide':'Table_text'} onClick={this.HideColSrok}>{id.sk_srok}</td>
                <td className='Table_text'>{id.pe_fio}</td>
                <td className='Table_text'>{id.otdel}</td>
                <td className='Table_text'>{id.pc_name}</td>
                <td className='Table_text'>{id.pc_inv_num}</td>
                <td className={(this.props.orgn===true)?'hide':'Table_text'} onClick={this.HideColOrg}>{id.org_name}</td>
                <td className={(this.props.syst===true)?'hide':'Table_text'} onClick={this.HideColSyst}>{id.inf_name}</td>
                <td className={(this.props.contr===true)?'hide':'Table_text'} onClick={this.HideColCont}>{id.kg_dgvr}</td>
                <td className='Table_text' >{id.ad}</td>
                <td className={(this.props.prim_on===true)?'hide':'Table_text'}>{ id.a_prim1}</td>
                <td className={(this.props.prim_tw===true)?'hide':'Table_text'}>{ id.a_prim2}</td>     
                <td className='Table_text'>
                    <button onClick={this.onClick} value={id.a_id}  className='Changer'>▲</button>
                </td>                                   
            </tr>
                 );
             }   
}

 
