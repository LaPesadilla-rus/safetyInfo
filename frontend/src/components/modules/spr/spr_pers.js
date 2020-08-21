import React, {Component} from 'react';
import './spr_all.css';
import axio from 'axios';
import Spr_pers_nap from './spr_pers_nap'
import Spr_add_pers from './/spr_adds/spr_add_pers'

export default class Spr_pers extends Component {
    constructor() {
        super();
        this.state = {
            arr:[],
            adds:false,

        }
    }

    componentDidMount(){
        axio.get('/main/spr_pers').then(res=>{
            console.log(res.data)
            this.setState({
                arr: res.data
            });
        });
    }
   
    addNew=()=>{
        this.setState({adds:!this.state.adds})
    }
    

    render(){
        return(<div className='Ps_from'>
           <div className='Ps_st'>
               <p>Сотрудники и отделения</p>
               <div>
                   <button onClick={this.addNew}>+</button>
                   <table>
                       <thead>
                           <tr>
                               <th>№</th>
                               <th>ФИО</th>
                               <th>Отдел</th>
                               </tr>
                       </thead>
                       <tbody>
                       {this.state.arr.map(id=> <Spr_pers_nap key={id.chain_id} row={id} />)}
                       </tbody>
                   </table>
               </div>{this.state.adds && <Spr_add_pers adds={this.addNew}/>}
           </div>
               
            </div>
        )}
}
