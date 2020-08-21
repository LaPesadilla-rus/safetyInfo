import React, {Component} from 'react';
import UnicId from 'react-html-id';
import axio from 'axios';


export default class Spr_kont_nap extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            arr:[],
            arrs:[],
            kt_id:'',
            addKont:false,
            kt_name:'',
            skzi_ver:'',
            skzi_ser:'',
            srok:'',
            kg_dgvr:'',
            kg_kol:'',
            syst:'',
            namePO:[],
             versPO:[],
            systa:[], 
              }
    }

    componentDidMount(){
        axio.get('/main/data').then(res=>{
            console.log(res.data)
                this.setState({
                    arr:res.data,
                    kt_name:this.props.row.kg_id,
                    syst:this.props.row.kt_id,
                    skzi_ver:this.props.row.kg_id,
                    skzi_ser:this.props.row.kg_id,
                    srok:this.props.row.kg_id,
                    namePO:res.data.spr_skzi,
                    versPO:res.data.skzi,
                    systa:res.data.spr_syst
                });
            });
            axio.get('/main/kontragents').then(res=>{
                console.log(res.data)
                    this.setState({
                        arrs:res.data,
                        
                    });
                });
    }

    AddKontragent=()=>{
        this.setState({addKont:!this.state.addKont})
    }
    
    ChKt_name=(e)=>{
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
    Chdgvr=(e)=>{
     this.setState({kg_dgvr: e.target.value})
    }
    Chkol=(e)=>{
     this.setState({kg_kol: e.target.value})
    }
    ChSyst=(e)=>{
        this.setState({syst: e.target.value})
       }

    render(){
        let id = this.props.row
        return (
            <tr>
            <td className='TheHead TheBodyBack'>
            <select className='SelectPole' onChange={this.ChKt_name} value={this.state.kt_name} >
                <option placeholder='----' value='-1'></option>
               {this.state.arrs.map( id => <option key={id.kg_id} value={id.kg_id}>{id.skzi_name}</option>)}
                 </select>
            </td> 
            <td className='TheHead TheBodyBack'>
            <select className='SelectPole' onChange={this.ChSyst} value={this.state.syst} >
                <option placeholder='----' value='-1'></option>
               {this.state.systa.map( id => <option key={id.ins_id} value={id.ins_id}>{id.ins_name}</option>)}
                 </select>
            </td> 
            <td className='TheHead TheBodyBack'>
            <select className='SelectPole' onChange={this.ChVer} value={this.state.skzi_ver} >
                <option placeholder='----' value='-1'></option>
                {this.state.arrs.map( id => <option key={id.kg_id} value={id.kg_id}>{id.skzi_ver}</option>)}
                 </select> 
            </td> 
            <td className='TheHead TheBodyBack'>
                <select className='SelectPole' onChange={this.ChSer} value={this.state.skzi_ser} >
                <option placeholder='----' value='-1'></option>
                {this.state.arrs.map( id => <option key={id.kg_id} value={id.kg_id}>{id.skzi_ser}</option>)}
                 </select> </td> 
            <td className='TheHead TheBodyBack'><select className='SelectPole' onChange={this.ChSrok} value={this.state.srok} >
                <option placeholder='----' value='-1'></option>
                {this.state.arrs.map( id => <option key={id.kg_id} value={id.kg_id}>{id.srok}</option>)}
                 </select></td> 
        <td className='TheHead TheBodyBack'><textarea>{id.kg_dgvr}</textarea></td> 
            <td className='TheHead TheBodyBack'><textarea>{id.kg_kol}</textarea></td> 
            <td className='TheHead TheBodyBack'><button >y</button></td>
            <td className='TheHead TheBodyBack'><button >x</button></td>
                </tr>)} 
            
    }   


 
