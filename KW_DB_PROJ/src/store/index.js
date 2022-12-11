import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router.js';
import creatPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [creatPersistedState()],
    state: {
        userId: '',
        userName: '',
        permission: '',
    },
    mutations: {
        login: function(state, data) {
            state.userId = data.userId;
            state.userName = data.userName;
            state.permission = String(data.permission);
            alert('로그인 성공');
        },
        authCheck: function(state) {
            if (state.userId === '' || state.userName === '') {
                alert('로그인이 필요합니다.');
                router.push('/login').then(r => r);
            } else if(state.permission === '0') {
                alert('가입승인 대기중입니다.');
                router.push('/').then(r => r);
            }
        },
        adminCheck: function(state) {
          if(state.permission !== '2') {
            alert('관리자만 접근 가능합니다.');
            router.push('/').then(r => r);
          }
        },
        logout: function (state) {
            state.userId = '';
            state.userName = '';
            alert('로그아웃 성공');
            router.push('/stock').then(r => r);
        }
    },
    getters:{
        getUserId: function(state) {
            return state.userId;
        },
        getUserName: function(state) {
            return state.userName;
        },
        getPermission: function(state) {
            return state.permission;
        }
    },
    actions:{

    }
})

export default store