import React, {Component} from 'react';
import './main_page.css'
import Form_work from './form_work'
import axio from 'axios';
import Form_add from './form_add'
import Form_arch from './form_arch'

export default class Main_page_cont extends Component {
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
/*
   
    ToChangePrim1=()=>{
        let Chan_perem =this.state.changePrim1;
        if (Chan_perem && this.state.txt !==this.props.row.io_prim1)
        {
            let data=
            {io_id:this.props.row.io_id,
                txt:this.state.txt
            }
            axio.post('/main/Prim1Up', {data}).then(res=>{
                this.setState({
                    data: res.data
                });
            });
        }
        this.setState({ changePrim1: true, txt:this.props.row.io_prim1});
    }

    ToChangePrim2=()=>{
        let Chan_perems =this.state.changePrim2;
        if (Chan_perems && this.state.text !==this.props.row.io_prim2)
        {
            let data=
            {io_id:this.props.row.io_id,
                text:this.state.text
            }
            axio.post('/main/Prim2Up', {data}).then(res=>{
                this.setState({
                    data: res.data
                });
            });
        }
        this.setState({ changePrim2: true, txt:this.props.row.io_prim2});
    }
*/ onClick=()=>{
    this.props.changeRow(this.props.row)
}

    AddRow =()=>{
        this.setState({newRow: !this.state.newRow})
    }

    componentDidMount (){
        axio.get('/main/all').then(res=>{
            this.setState({
                arr: res.data
            });
        });
    }
  
    onCliks=()=>{
        this.props.ChangePrim(this.props.row)
    }
    ChangePrim=()=>{
        this.setState({show_formPrim:!this.state.show_formPrim})
        }
        AddRow =()=>{
            this.setState({newRow: !this.state.newRow})
        }
    render(){
        let id = this.props.row
        return (
            <tr className='Hover'>{console.log(this.props)}
            <td onClick={this.onClick} className='Table_text'>{id.io_id}</td>
            <td onClick={this.onClick} className='Table_text'>{id.skzi_name}</td>
            <td onClick={this.onClick} className='Table_text'>{id.skzi_ver}</td>
            <td onClick={this.onClick} className='Table_text'>{id.skzi_ser}</td>
            <td onClick={this.onClick} className={(this.props.frget===true)?'hide':'Table_text'} >{id.ktr_name}</td>
            <td onClick={this.onClick} className={(this.props.srok===true)?'hide':'Table_text'} >{id.sk_srok}</td>
            <td onClick={this.onClick} className='Table_text'>{id.ma_fio}</td>
            <td onClick={this.onClick} className='Table_text'>{id.otdel}</td>
            <td onClick={this.onClick} className='Table_text'>{id.pc_name}</td>
            <td onClick={this.onClick} className='Table_text'>{id.pc_inv_num}</td>
            <td onClick={this.onClick} className={(this.props.orgn===true)?'hide':'Table_text'} >{id.org_name}</td>
            <td onClick={this.onClick} className={(this.props.syst===true)?'hide':'Table_text'} >{id.inf_name}</td>
            <td onClick={this.onClick} className={(this.props.contr===true)?'hide':'Table_text'} >{id.kg_dgvr}</td>
            <td></td>
            <td onClick={this.onClick} className={(this.props.prim_on===true)?'hide':'Table_text'}> {id.io_prim1} </td> 
            <td onClick={this.onClick}className={(this.props.prim_tw===true)?'hide':'Table_text'}>{id.io_prim2}
            </td>                                                            
            <td>
            <button className='Changer' onClick={this.onCliks} >*</button>
            </td>
            {this.state.newRow && <Form_work  newRow={this.AddRow}/>}
            
            </tr>
            );
    }   
}

 
