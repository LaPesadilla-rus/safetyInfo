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
                    id:this.props.row.chain_id,
                    pe_fio:this.props.row.chain_pers_id,
                    otdel:this.props.row.chain_otdel_id,
                    otdels:res.data.spr_otdel,
                    pers:res.data.personals,
                    num:this.props.row.chain_id

                });
            });
    }    

    ChangeFIO=(e)=>{
        this.setState({pe_fio:e.target.value})
    }

    ChangeOtdel=(e)=>{
        this.setState({otdel:e.target.otdel})
    }

    DeleteRow=(e)=>{
        const data={
            id: this.state.id
        }
        axio.post('/main/DeletePers', {data}).then(res => {
            if (res.data === 'DELETE COMPLITE') {
                alert('Удалено');
            }
        })};

        UpdateRow=()=>{
            const datas={
                id: this.state.id,
                pe_fio: this.state.pe_fio,
                otdel:this.state.otdel,
            }
            axio.post('/main/UpdatePers', {datas}).then(res => {
                if (res.data === 'UPDATED') {
                    alert('Изменения приняты');
                }
            })};

    render(){
        return (
            <tr> {console.log(this.props)}
            <td className='TheHead TheBodyBack'>{this.state.num}</td>
             <td className='TheHead TheBodyBack'>  
                 <select className='SelectPole'  value={this.state.pe_fio} >
                <option placeholder='----' value='-1'></option>
               {this.state.pers.map( id => <option key={id.pe_id} value={id.pe_id}>{id.pe_fio}</option>)}
                 </select></td> 
                 <td className='TheHead TheBodyBack'>  <select className='SelectPole'  value={this.state.otdel} >
                <option placeholder='----' value='-1'></option>
               {this.state.otdels.map( id => <option key={id.otdel_id} value={id.otdel_id}>{id.otdel_name}</option>)}
                 </select>   </td>   
            <td onClick={this.UpdateRow} className='TheHead TheBodyBack'><button >y</button></td>
            <td onClick={this.DeleteRow} className='TheHead TheBodyBack'><button >x</button></td>
        </tr>)} 
            
        }        

