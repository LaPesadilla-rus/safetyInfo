import React from 'react';
import './App.css';
import Loader from './components/simple_comp/loader/loader';
import ModalInfo from './components/simple_comp/modal_info/modalInfo';
//import Body from './components/body/body.js';
import Routs from './components/routs/routs';
import AuthContainer from './components/pages/auth/authContainer'

import {BrowserRouter} from 'react-router-dom';

import { setUserId, setAt, setRt, setAuthorize, setUserName, setUserRole, setUserDolsn} from './store/auth/action';
import {connect} from 'react-redux';
import axio from 'axios';
//const axiosApiInstance = axio.create();

class AppContainer extends React.Component {
    
    componentDidMount = async() => {
        this.authCheck();
    }

    authCheck = async () => {
        let local_data = {};
        if (localStorage.getItem('userData')){
            local_data = JSON.parse(localStorage.getItem('userData')|| '{}');
            let data = {
                us_id: local_data.us_id,
                at: local_data.at,
                rt: local_data.rt,
            }
            let response = {
                us_id: local_data.us_id,
                at: local_data.at,
                rt: local_data.rt,
                userName: local_data.userName,
                dolsn: local_data.dolsn,
                isAuthorize: true,
                role: local_data.role
            }
            await axio.post('/auth/logCheck', {data}).then(res=>{
                console.log(res)
                if(res.status === 200){
                    response.isAuthorize = true;
                    localStorage.setItem('isAuthorize', 'true');
                    this.props.setAuthorize(true);
                    this.props.setAt(local_data.at);
                    this.props.setRt(local_data.rt);
                    this.props.setUserName(local_data.userName)
                    this.props.setUserRole(local_data.role);
                    this.props.setUserDolsn(local_data.dolsn);
                }else{
                    response.isAuthorize = false;
                    this.props.setAuthorize(false);
                    localStorage.setItem('isAuthorize', 'false');
                    //props.AuthSetUser(response);
                }
            })
        }else{
            //console.log('check remoute')// тест междоменной авторизации
            axio.get('/auth/generalToken').then( (res) => {
                if (res.status !== 403){
                    let response = {
                        us_id: res.data.user,
                        at: res.data.token,
                        rt: res.data.refreshToken,
                        userName: res.data.us_name,
                        dolsn: res.data.us_dolsn,
                        isAuthorize: true,
                        role: res.data.role
                    }
                    
                    this.props.setUserId(res.data.user);
                    this.props.setAt(res.data.token);
                    this.props.setRt(res.data.refreshToken);
                    this.props.setAuthorize(true);
                    this.props.setUserName(res.data.us_name);
                    this.props.setUserRole(res.data.role);
                    this.props.setUserDolsn(res.data.us_dolsn);
                    localStorage.setItem('userData', JSON.stringify(response));
                    axio.defaults.headers.common['at'] = response.at;
                    axio.defaults.headers.common['rt'] = response.rt;
                    axio.defaults.headers.common['us_id'] = response.us_id;
                    localStorage.setItem('isAuthorize', 'true')
                    window.location.href = '/';
                }
               
            }).catch( (err) => {
                console.log(err)
            });
        }
    }

    render(){
        return (
            <BrowserRouter>
              <div className="back">
              {this.props.loader_status && <Loader/>}
              {this.props.message_state && <ModalInfo/>}
              {(localStorage.getItem('isAuthorize') === 'false' || localStorage.getItem('isAuthorize') === null) ?  <div className="App"><AuthContainer/></div>  : <div className="App">
                                                {<Routs {...this.props}/>}
                                            </div>}
                  
              </div>
            </BrowserRouter>
          );
    }
  
}

//export default AppContainer;
const pushStateToProps = (state) => {
    return{
        user: state.auth.user,
        at: state.auth.at,
        rt: state.auth.rt,
        isAuthorize: state.auth.isAuthorize,
        role: state.auth.role,
        loader_status: state.loader.loader_state,
        message_state: state.message.message_state,
    };
};

const pushDispatchToProps = {
    setUserId,
    setAt,
    setRt,
    setAuthorize,
    setUserName,
    setUserRole,
    setUserDolsn
};

export default connect(pushStateToProps, pushDispatchToProps)(AppContainer);
