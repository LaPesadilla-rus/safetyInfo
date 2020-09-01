import React from 'react';
import './auth.css';
import axio from 'axios';
import {Redirect} from 'react-router-dom';
/*import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import config from '../../../config/config';*/

export default class Auth extends React.Component{
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
        };
    }
    componentDidMount () {
        document.addEventListener('keypress', this.keyPress, false);
        this.authCheck();
    }

    authCheck = async () => {
        console.log('check Auth')
        let local_data = {};
        
        if (localStorage.getItem('userData')){
            local_data = JSON.parse(localStorage.getItem('userData')|| '{}');
            let data = {
                us_id: local_data.us_id,
                at: local_data.at,
                rt: local_data.rt,
            }
            localStorage.setItem('isAuthorize', 'false')
            await axio.post('/auth/logCheck', {data}).then(res=>{
                console.log('logcheck')
                if(res.status === 200){
                    let response = {
                        us_id: local_data.us_id,
                        at: local_data.at,
                        rt: local_data.rt,
                        userName: local_data.userName,
                        dolsn: local_data.dolsn,
                        isAuthorize: true,
                        role: local_data.role
                    }
                    localStorage.setItem('isAuthorize', 'true')
                    //console.log(response)
                    this.props.setUserId(res.data.user);
                    this.props.setAt(res.data.token);
                    this.props.setRt(res.data.refreshToken);
                    this.props.setAuthorize(true);
                    this.props.setUserName(res.data.us_name);
                    this.props.setUserRole(res.data.role);
                    this.props.setUserDolsn(res.data.us_dolsn)
                    window.location.href = '/';
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
            //history.push('/auth')
        }
    }

    keyPress = (e) => {
        if(e.key === 'Enter'){
            this.sendAuth();
        }
    }

    sendAuth = async () => {
        if (this.state.login === ''){
            alert('Не веден логин');
            return 0;
        }
        if (this.state.password === ''){
            alert("Не введен пароль");
            return 0;
        }
        let data = {
            login: this.state.login,
            password: this.state.password
        }
        await axio.post('/auth/login', {data}).then( async (res)=>{
            let response = {
                us_id: res.data.user,
                at: res.data.token,
                rt: res.data.refreshToken,
                userName: res.data.us_name,
                dolsn: res.data.us_dolsn,
                isAuthorize: true,
                role: res.data.role
            }
            localStorage.setItem('userData', JSON.stringify(response));
            axio.defaults.headers.common['at'] = response.at;
            axio.defaults.headers.common['rt'] = response.rt;
            axio.defaults.headers.common['us_id'] = response.us_id;
            localStorage.setItem('isAuthorize', 'true')
            window.location.href = '/';
            
        }).catch( (err) => {
            console.log(err)
        });
        /*axio.post('/auth/login', {data}).then(res=>{
            //let role = CryptoJS.AES.encrypt(res.data.role, config.config.secretKey).toString()
            //let role = CryptoJS.SHA256(res.data.role);
            let role = res.data.role;
            this.props.setUserId(res.data.user);
            this.props.setAt(res.data.token);
            this.props.setRt(res.data.refreshToken);
            this.props.setAuthorize(true);
            this.props.setUserName(res.data.us_name);
            this.props.setUserRole(role);
            this.props.setUserDolsn(res.data.us_dolsn)
            localStorage.setItem('user', res.data.user);
            localStorage.setItem('at', res.data.token);
            localStorage.setItem('rt', res.data.refreshToken);
            localStorage.setItem('userName', res.data.us_name);
            localStorage.setItem('role', role);
            localStorage.setItem('dolsn', res.data.us_dolsn);
            //console.log(res.data.us_name)
            axio.defaults.headers.common['at'] = res.data.token;
            axio.defaults.headers.common['rt'] = res.data.refreshToken;
            axio.defaults.headers.common['us_id'] = res.data.user;
            window.location.href = '/';
        });*/
        //console.log(this.props)
    }

    componentWillUnmount = () => {
        document.removeEventListener('keypress', this.keyPress, false);
    }


    render() {
        return (
            <div className='auth'>
                <div className='auth_form'>
                    Логин:<input className='input_global' onChange={(e) => {this.setState({ login: e.target.value})}} value={this.state.login}></input>
                    Пароль:<input className='input_global' type='password' onChange={(e) => {this.setState({password: e.target.value})}} value={this.state.password}></input>
                    <button onClick={this.sendAuth} className='button'>Авторизоваться</button>
                </div>
                {this.props.isAutorize ? <Redirect to='/'/> : null}
            </div>
    
        );
    }
}

