import React, {Component} from 'react';
import './main_page.css'
import Form_work from './form_work'
import axio from 'axios';

export default class Main_page_cont extends Component {
    constructor() {
        super();
        this.state = {
            newRow:false,
            arch:false,
            changePrim1:false,
            changePrim2:false,
            txt:'',
            text:'',
        }
    }

    
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
        let Chan_perem =this.state.changePrim2;
        if (Chan_perem && this.state.text !==this.props.row.io_prim2)
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


    AddRow =()=>{
        this.setState({newRow: !this.state.newRow})
    }

   
    render(){
        return (
            <tr width='100%' className='Table_text' > 
            <td>{this.props.row.io_id}</td>
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
            <td onClick={this.ToChangePrim1}>{(this.state.changePrim1) ? <textarea onChange={(e) => {this.setState({ txt: e.target.value})}} 
                                                                                    value={this.state.txt}/> 
                                                                        : this.props.row.io_prim1}</td>
            <td onClick={this.ToChangePrim2}>{(this.state.changePrim2) ? <textarea onChange={(e) => {this.setState({ text: e.target.value})}} 
                                                                                    value={this.state.text}/> 
                                                                        : this.props.row.io_prim2}</td>                                                            
            <td><button className='ButAdd' onClick={this.AddRow}>*</button></td>
            {this.state.newRow && <Form_work  newRow={this.AddRow}/>}
            </tr>);
    }   
}

 
