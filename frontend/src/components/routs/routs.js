import React, {Component} from 'react';
import './routs.css';
import Header from '../modules/header/headerContainer'
import Table_find from '../modules/spr/table_find'
import Main_page from '../modules/sklad_main/main_page'
import Auth from '../pages/auth/authContainer';
import {Route, Redirect} from 'react-router-dom';
import Main_page_arch from '../modules/sklad_main/main_page_arch'
import Spr_all from '../modules/spr/spr_all'

const ThemeContext = React.createContext('light');

export default class Routs extends Component {

    render(){
        return (
            <div className="body body_pos">
                <ThemeContext.Provider value='test'>
                    <Header />
                    
                    <Route path='/auth' component={Auth}/>

                    <Route path='/arch' component={Main_page_arch}/>
                    <Route path='/main' component={Main_page}/>  
                    <Route path='/spr' component={Spr_all}/> 
                    
                </ThemeContext.Provider>
            </div>
    );
    }
    
}
