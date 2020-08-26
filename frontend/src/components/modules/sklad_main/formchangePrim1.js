import React, {Component} from 'react'
import axio from 'axios';
import './form_work.css'

export default class FormchangePrim1 extends Component {
    constructor() {
        super();
        this.state = {
            prim1_ch:'',
            prim2_ch:'',
            txt:'',
            text:'',
            
        }
    }

    componentDidMount=()=>{
        this.setState({prim1_ch:this.props.row.io_prim1,prim2_ch:this.props.row.io_prim2})
    }
     ChangePrims=(e)=>{
    this.setState({prim1_ch:e.target.value})
     }

     ChangePrimss=(e)=>{
        this.setState({prim2_ch:e.target.value})
         }

     SendSB =()=> {
        const data={
            io_id:this.props.row.io_id,
            prim1_ch:this.state.prim1_ch,
        }
        const data1={
            io_id1:this.props.row.io_id,
            prim2_ch:this.state.prim2_ch,
        }
        axio.post('/main/Prim1Up', {data}).then(res=>{
            this.setState({
                data: res.data
            });this.props.onReboot()
        });
        axio.post('/main/Prim2Up', {data1}).then(res=>{
            this.setState({
                data1: res.data
            });
            this.onClose();
            this.props.onReboot()
        });
       
    }


    onClose=()=>{
        this.props.show_formPrim()
    }
     
     
   
    render(){ 
        return(<div className='Ps_from' >
            <div className='Ps_st Primch'>
            <label className='textar'>Редакция примечаний</label>
            <div >
    <textarea className='textar' onChange={this.ChangePrims}value={this.state.prim1_ch}></textarea></div>
         <div>
    <textarea className='textar' onChange={this.ChangePrimss} value={this.state.prim2_ch}></textarea> </div>
         <button className='ButSet' onClick={this.SendSB}>1</button>
         <button className='ButSet'  onClick={this.onClose}>x</button>
            </div>
            </div>
        )}
}

