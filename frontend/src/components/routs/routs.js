import React, {Component} from 'react';
import './routs.css';
import Header from '../modules/header/headerContainer'
import Table_block from '../modules/spr/table_block'
import Main_page from '../modules/sklad_main/main_page'
import Table_find from '../modules/spr/table_find'
import SprForms from '../pages/spr/spr_forms.js';
import Auth from '../pages/auth/authContainer';
import {Route, Redirect} from 'react-router-dom';

const ThemeContext = React.createContext('light');

export default class Routs extends Component {

    render(){
        return (
            <div className="body body_pos">
                <ThemeContext.Provider value='test'>
                    <Header />
                    <Table_block />
                    <Table_find />
                    <Main_page />
                    

                    <Route path='/auth' component={Auth}/>

                    <Route path='/spr' component={SprForms}/>
                </ThemeContext.Provider>
            </div>
    );
    }
    
}
