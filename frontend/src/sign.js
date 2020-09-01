import axio from 'axios'

const Sign = () => {
    let backend_host = 'http://127.0.0.1:4000/';
    if (process.env.NODE_ENV !== 'production') {
        backend_host = 'http://127.0.0.1:4000/';
    }else{
        backend_host = 'http://192.168.8.21:4000/';
    }
    axio.defaults.headers.common['progr'] = 'SAFETYINFO'; // Переменная для идентификации программы
    axio.defaults.baseURL = backend_host;
    if (localStorage.getItem('userData')){
        localStorage.setItem('isAuthorize', 'true')
        let data = JSON.parse(localStorage.getItem('userData')|| '{}')
        axio.defaults.headers.common['at'] = data.at;
        axio.defaults.headers.common['rt'] = data.rt;
        axio.defaults.headers.common['us_id'] = data.us_id;
    }else{
        localStorage.setItem('isAuthorize', 'false')
    }

    axio.interceptors.response.use( (res) => {
        return res
      }, function (err) {
        if (err.response){
            if (err.response.status === 401){
                window.location.href = '/auth';
                localStorage.clear();
            }
        }
        return Promise.reject(err)
      })
    //модификация заголовков
    /*axio.interceptors.request.use(
        config => {
            const token = localStorage.getItem('rt');
            //console.log(token)
            if (token) {
                config.headers['Authorization'] = token;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
        });*/

}

export default Sign;