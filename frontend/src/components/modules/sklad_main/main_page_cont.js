import React, {Component} from 'react';
import './main_page.css'
import Form_work from './form_work'

export default class Main_page_cont extends Component {
    constructor() {
        super();
        this.state = {
            newRow:false,
            arch:false,
        }
    }
    
    
    AddRow =()=>{
        this.setState({newRow: !this.state.newRow})
    }

   
    render(){
        return (
            <tr width='100%' className='Table_text' > 
            <td>1</td>
            <td>{this.props.row.skzi_name}</td>
            <td>{this.props.row.skzi_ver}</td>
            <td>{this.props.row.skzi_ser}</td>
            <td>{this.props.row.ktr_name}</td>
            <td>{this.props.row.sk_srok}</td>
            <td>{this.props.row.ma_fio}</td>
            <td>{this.props.row.ot_name}</td>
            <td>{this.props.row.pc_name}</td>
            <td>{this.props.row.pc_inv_num}</td>
            <td>{this.props.row.org_name}</td>
            <td>{this.props.row.inf_name}</td>
            <td>{this.props.row.kg_dgvr}</td>
            <td>{this.props.row.io}</td>
            <td><textarea>{this.props.row.io_prim1}</textarea></td>
            <td><textarea>{this.props.row.io_prim2}</textarea></td>
            <td><button className='ButAdd' onClick={this.AddRow}>*</button></td>
            {this.state.newRow && <Form_work  newRow={this.AddRow}/>}
            </tr>);
    }   
}

 
