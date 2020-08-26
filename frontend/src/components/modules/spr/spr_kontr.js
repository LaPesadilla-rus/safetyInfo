import React, {Component} from 'react'
import './spr_all.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import Spr_add_kont from './spr_adds/spr_add_kont'
import Spr_kont_nap from './spr_kont_nap'

export default class Spr_naim extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            arr:[],
            need_ar:[],
            kt_id:'',
            addKont:false,
            kt_name:'',
            skzi_ver:'',
            skzi_ser:'',
            srok:'',
            kg_dgvr:'',
            kg_kol:'',
            namePO:[],
             versPO:[],
            systa:[],
            arrs:[]
            
        }
    }
    componentDidMount(){
        axio.get('/main/kontragents').then(res=>{
      //      console.log(res.data)
                this.setState({
                    arr: res.data
                });
            });

        axio.get('/main/data').then(res=>{
              // console.log(res.data)
                   this.setState({
                    arrs: res.data,
                    namePO:res.data.spr_skzi,
                    versPO:res.data.skzi,
                    systa:res.data.spr_syst
             
                          });
                      });

       }
       onReboot = () =>{
        axio.get('/main/kontragents').then(res=>{
          //console.log(res.data)
              this.setState({
                  arr: res.data
              });
          });
        }
       DeleteRow=(e)=>{
        const data={
            kt_id: e.target.value
        }
        axio.post('/main/DeleteKontr', {data}).then(res => {
            if (res.data === 'Delete COMPLITE') {
                alert('Удалено');
            }
        });this.onReboot();
        
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
       
       ChangeNaim=(e)=>{
        const data1 ={
            kt_name:this.state.kt_name,
            skzi_ver:this.state.skzi_ver,
            skzi_ser:this.state.skzi_ser,
            srok:this.state.srok,
            kg_dgvr:this.state.kg_dgvr,
            kg_kol:this.state.kg_kol,
        }
        this.props.OpenSprOrg(this.props.row)
         axio.post('/main/UpdateKTR', {data1}).then(res => {
           
        });this.onReboot()
        }
     
    render(){
        return(<div className='Ps_from'>
            <div className='Ps_st forKontr'>
                <p className='label_posit'>Наименование компьютеров</p>
                <button onClick={this.AddKontragent} className='But'>Добавить</button>
                <table  className='Table Table_tabl'  >
                    <thead>
                        <tr className='TheHead THeHeadBack'>
                            <th >Наименование СКЗИ</th>    
                            <th >Система</th>   
                            <th >Версия СКЗИ</th>   
                            <th > Серийный номер</th>  
                            <th >Срок</th> 
                            <th >Реквизиты договора</th> 
                            <th >Количество</th> 
                            <th ></th>
                            <th ></th>
                         </tr>
                    </thead>
                    <tbody>{this.state.arr.map(id=> <Spr_kont_nap key={id.kt_id} row={id} />)}
                    {/*this.state.arr.map(id=> <tr  className='Nap' key={id.kt_id} row={id}>
                    <td className='TheHead'><select  className='SelectPole' onChange={this.ChKt_name} value={this.state.val_name}>
                    {this.state.namePO.map( id => 
                    <option key={id.ss_id} value={id.ss_id}>{id.ss_name}</option>)}{id.skzi_name}</select></td> 
                    <td className='TheHead'><textarea>{id.skzi_ver}</textarea></td> 
                    <td className='TheHead'><textarea>{id.skzi_ser}</textarea></td> 
                    <td className='TheHead'><textarea>{id.srok}</textarea></td> 
                    <td className='TheHead'><textarea>{id.kg_dgvr}</textarea></td> 
                    <td className='TheHead'><textarea>{id.kg_kol}</textarea></td> 
                    <td className='TheHead'><button onClick={this.ChangeNaim}>y</button></td>
                    <td className='TheHead'><button onClick={this.DeleteRow} value={id.kt_id}>x</button></td>
                        </tr>)*/} 
                    </tbody>
                </table>
            <div>
                <button className='But' onClick={this.props.spr_org}>Отмена</button>
            </div>{this.state.addKont && <Spr_add_kont addKont={this.AddKontragent} onreboot={this.onReboot}/>}
            
            </div>
            </div>
        )}
}