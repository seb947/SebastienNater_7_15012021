import { createStore } from 'vuex'
import axios from 'axios';
import router from '../router/index';

const store = createStore({

    state: {
        userToken: '',
        userId: '',
        isAdmin: ''
    },
    getters:{
    },
    actions: {
        login(context,credentials){
            console.log(credentials);
            axios({
                method: 'post',
                url: 'http://localhost:80/api/user/login',
                data: {
                    email: credentials.email,
                    password: credentials.password
                }
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                this.state.userToken = response.data.token;
                this.state.userId = response.data.userId;
                this.state.isAdmin = response.data.isAdmin;
                //commit(this.types.LOGIN, { token: response.data.token, userId:  response.data.userId, isAdmin: response.data.isAdmin })
                router.push("/");
            })
            .catch((error) => console.log(error));
        }
    },   
    /*mutations: {
        [this.types.LOGIN](data) {
            this.state.userToken = data.token;
            this.state.userId = data.userId;
            this.state.isAdmin = data.isAdmin;
        }
    },
    types: {
        LOGIN: 'LOGIN',
    }*/
})

export default store;