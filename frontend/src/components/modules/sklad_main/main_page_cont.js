import React, {Component} from 'react';
import './main_page.css'


export default class Main_page_cont extends Component 
{
    constructor() {
        super();
        this.state = {
            arr:[],
            newRow:false,
            arch:false,
            changePrim1:false,
            changePrim2:false,
            txt:'',
            text:'',
            frget: false,
            srok:false,
            orgn:false,
            syst:false,
            contr:false,
            prim_on:false,
            prim_tw:false,
            show_formPrim:false,      
                      }
                     }
    onClick=()=>{
         this.props.changeRow(this.props.row)
                }

    onCliks=()=>{
        this.props.ChangePrim(this.props.row)
                }

    ChangePrim=()=>{
        this.setState({show_formPrim:!this.state.show_formPrim})
                    }
   
     render(){
        let id = this.props.row
        return (
            <tr className='Hover'>
            <td onClick={this.onClick} className='Table_text'>{id.io_id}</td>
            <td onClick={this.onClick} className='Table_text'>{id.skzi_name}</td>
            <td onClick={this.onClick} className='Table_text'>{id.skzi_ver}</td>
            <td onClick={this.onClick} className='Table_text'>{id.skzi_ser}</td>
            <td onClick={this.onClick} className={(this.props.frget===true)?'hide':'Table_text'} >{id.ktr_name}</td>
            <td onClick={this.onClick} className={(this.props.srok===true)?'hide':'Table_text'} >{id.sk_srok}</td>
            <td onClick={this.onClick} className='Table_text'>{id.pe_fio}</td>
            <td onClick={this.onClick} className='Table_text'>{id.otdel}</td>
            <td onClick={this.onClick} className='Table_text'>{id.pc_name}</td>
            <td onClick={this.onClick} className='Table_text'>{id.pc_inv_num}</td>
            <td onClick={this.onClick} className={(this.props.orgn===true)?'hide':'Table_text'} >{id.org_name}</td>
            <td onClick={this.onClick} className={(this.props.syst===true)?'hide':'Table_text'} >{id.inf_name}</td>
            <td onClick={this.onClick} className={(this.props.contr===true)?'hide':'Table_text'} >{id.kg_dgvr}</td>
            <td className='Table_text' onClick={this.onClick}>{id.io_date1}</td>
            <td onClick={this.onClick} className={(this.props.prim_on===true)?'hide':'Table_text'}> {id.io_prim1} </td> 
            <td onClick={this.onClick}className={(this.props.prim_tw===true)?'hide':'Table_text'}>{id.io_prim2}
            </td>                                                            
            <td className='Table_text'>
            <button className='Changer ' onClick={this.onCliks} >*</button>
            </td>
            </tr>
            );
        }   
}

 
