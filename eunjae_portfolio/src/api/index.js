import axios from 'axios';

class getAPI {
    config = {
        baseurl : 'https://api.edamam.com/search?q=chicken&app_id=042a700b&app_key=c9006684790446b685cb7af3fc4d2358&from=0&to=100&calories=591-722&health=alcohol-free',
    }

    getCont() {
        axios.get(this.config.baseurl).then(res => {  
            console.log(res);
            return res;
        }).catch(err => {
            console.log(err);
            return err;
        })
    }
}

export default new getAPI();