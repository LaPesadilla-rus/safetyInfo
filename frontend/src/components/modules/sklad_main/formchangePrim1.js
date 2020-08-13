import React, {Component} from 'react'
import axio from 'axios';
import './main_page.css'

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
     ChangePrims=(e)=>{
    this.setState({txt:e.target.value})
     }

     ChangePrimss=(e)=>{
        this.setState({text:e.target.value})
         }

     SendSB =()=> {
        const data={
            io_id:this.props.row.io_id,
            prim1_ch:this.state.txt,
        }
        
        axio.post('/main/Prim1Up', {data}).then(res=>{
            this.setState({
                data: res.data
            });
        });
       
    }

    SendDB =()=>{
        const data1={
            io_id1:this.props.row.io_id,
            prim2_ch:this.state.text,
        }
        axio.post('/main/Prim2Up', {data1}).then(res=>{
            this.setState({
                data1: res.data
            });
        });
    }
     
     
   
    render(){ 
        return(<div className='Ps_from' >
            <div className='Ps_st'>
            <label className='textar'>Редакция примечаний</label>
            <div >
         <textarea className='textar' onChange={this.ChangePrims} >{this.props.row.io_prim1}</textarea></div>
         <div>
         <textarea className='textar' onChange={this.ChangePrimss} >{this.props.row.io_prim2}</textarea> </div>
         <button className='ButSet' onClick={this.SendSB}>1</button>
         <button className='ButSet' onClick={this.SendDB}>2</button>
         <button className='ButSet'  onClick={this.props.show_formPrim}>x</button>
            </div>
            </div>
        )}
}

