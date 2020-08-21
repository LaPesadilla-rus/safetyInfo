import React, {Component} from 'react';
import UnicId from 'react-html-id';
import axio from 'axios';


export default class Spr_skzi_nap extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            arr:[],
            skzi_ver:'',
            skzi_ser:'',
            kt_name:'',
             versPO:[],
             nameSKZI:[],
              }
    }

    componentDidMount(){
        axio.get('/main/data').then(res=>{
            console.log(res.data)
                this.setState({
                    arr:res.data,
                    kt_name:this.props.row.sk_id,
                    skzi_ver:this.props.row.sk_id,
                    skzi_ser:this.props.row.sk_id,
                    srok:this.props.row.sk_id,
                    versPO:res.data.skzi,
                    nameSKZI:res.data.spr_syst,
                });
            });
    }    
    ChName=(e)=>{
        this.setState({kt_name: e.target.value})
       }
    ChVer=(e)=>{
     this.setState({skzi_ver: e.target.value})
    }
    ChSer=(e)=>{
     this.setState({skzi_ser: e.target.value})
    }
    ChSrok=(e)=>{
     this.setState({srok: e.target.value})
    }

    render(){
        return (
            <tr>{console.log(this.props)}
            <td className='TheHead TheBodyBack'>
            <select className='SelectPole' onChange={this.ChName} value={this.state.kt_name} >
                <option placeholder='----' value='-1'></option>
                {this.state.nameSKZI.map( id => <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
                 </select> 
            </td> 
            <td className='TheHead TheBodyBack'>
            <select className='SelectPole' onChange={this.ChVer} value={this.state.skzi_ver} >
                <option placeholder='----' value='-1'></option>
                {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_ver}</option>)}
                 </select> 
            </td> 
            <td className='TheHead TheBodyBack'>
                <select className='SelectPole' onChange={this.ChSer} value={this.state.skzi_ser} >
                <option placeholder='----' value='-1'></option>
                {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_serial}</option>)}
                 </select> </td> 
            <td className='TheHead TheBodyBack'><select className='SelectPole' onChange={this.ChSrok} value={this.state.srok} >
                <option placeholder='----' value='-1'></option>
                {this.state.versPO.map( id => <option key={id.sk_id} value={id.sk_id}>{id.sk_srok}</option>)}
                 </select></td> 
            <td className='TheHead TheBodyBack'><button >y</button></td>
            <td className='TheHead TheBodyBack'><button >x</button></td>
                </tr>)} 
            
    }   
