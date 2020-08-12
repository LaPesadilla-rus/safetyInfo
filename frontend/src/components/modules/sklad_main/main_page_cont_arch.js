import React, {Component} from 'react';
import './main_page.css'


export default class Main_page_cont_arch extends Component {
    
    render(){
        return (
            <tr width='100%' className='Table_text' > 
            <td>{this.props.row.a_id}</td>
            <td>{this.props.row.skzi_name}</td>
            <td>{this.props.row.skzi_ver}</td>
            <td>{this.props.row.skzi_ser}</td>
            <td>{this.props.row.ktr_name}</td>
            <td>{this.props.row.sk_srok}</td>
            <td>{this.props.row.ma_fio}</td>
            <td>{this.props.row.id_otdel}</td>
            <td>{this.props.row.pc_name}</td>
            <td>{this.props.row.pc_inv_num}</td>
            <td>{this.props.row.org_name}</td>
            <td>{this.props.row.inf_name}</td>
            <td>{this.props.row.kg_dgvr}</td>
            <td>{this.props.row.ad}</td>
            <td><textarea>{this.props.row.a_prim1}</textarea></td>
            <td><textarea>{this.props.row.a_prim2}</textarea></td>
            </tr>);
    }   
}

 
