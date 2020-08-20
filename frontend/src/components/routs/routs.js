import React, {Component} from 'react';
import './routs.css';
import Header from '../modules/header/headerContainer'
import main_page from '../modules/sklad_main/main_page'
import Auth from '../pages/auth/authContainer';
import {Route, Redirect} from 'react-router-dom';
import main_page_arch from '../modules/sklad_main/main_page_arch'
import spr_all from '../modules/spr/spr_all'

const ThemeContext = React.createContext('light');

export default class Routs extends Component {

    render(){
        return (
            <div className="body body_pos">
                <ThemeContext.Provider value='test'>
                    <Header />
                    
                    <Route path='/auth' component={Auth}/>

                    <Route path='/arch' component={main_page_arch}/>
                    <Route path='/main' component={main_page}/>  
                    <Route path='/spr' component={spr_all}/> 
                    
                </ThemeContext.Provider>
            </div>
    );
    }
    
}
