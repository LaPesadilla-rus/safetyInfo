import React, {Component} from 'react';
import './routs.css';
import Header from '../modules/header/headerContainer'
import SkladMain from '../pages/sklad_main/sklad_main';
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
                    {<Route path='/sklad' render = { props => this.props.isAuthorize ? <SkladMain {...this.props} /> : <Redirect to='/auth'/>} />}

                    <Route path='/auth' component={Auth}/>

                    <Route path='/spr' component={SprForms}/>
                </ThemeContext.Provider>
            </div>
    );
    }
    
}
