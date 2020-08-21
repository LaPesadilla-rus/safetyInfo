import React, {Component} from 'react';
import UnicId from 'react-html-id';
import axio from 'axios';


export default class Spr_pers_nap extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            arr:[],
            pe_fio:'',
            otdel:'',
             pers:[],
             otdels:[],
             num:'',
              }
    }

    componentDidMount(){
        axio.get('/main/data').then(res=>{
            console.log(res.data)
                this.setState({
                    arr:res.data,
                    pe_fio:this.props.row.chain_pers_id,
                    otdel:this.props.row.chain_otdel_id,
                    otdels:res.data.spr_otdel,
                    pers:res.data.personal,
                    num:this.props.row.chain_id

                });
            });
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
            <tr> {console.log(this.props)}
            <td>{this.state.num}</td>
         <td>  <select className='SelectPole'  value={this.state.pe_fio} >
                <option placeholder='----' value='-1'></option>
               {this.state.pers.map( id => <option key={id.pe_id} value={id.pe_id}>{id.pe_fio}</option>)}
                 </select></td> 
                 <td>  <select className='SelectPole'  value={this.state.otdel} >
                <option placeholder='----' value='-1'></option>
               {this.state.otdels.map( id => <option key={id.otdel_id} value={id.otdel_id}>{id.otdel_name}</option>)}
                 </select>   </td>   
            <td className='TheHead TheBodyBack'><button >y</button></td>
            <td className='TheHead TheBodyBack'><button >x</button></td>
        </tr>)} 
            
         
}
