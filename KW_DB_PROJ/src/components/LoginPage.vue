<template>
  <section class="">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            로그인
          </h1>

            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                사용자 ID
              </label>
              <input type="username" name="username" id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="사용자 ID" required="" v-model="username">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                비밀번호
              </label>
              <input type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="" v-model="password">
            </div>
            <button
              class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="login">
              로그인
            </button>
            <div class="flex items-center justify-between">
              <router-link to="/password-find"
                 class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-gray-400">
                비밀번호 찾기
              </router-link>
            </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              아직 계정이 없으시다면
              <router-link to="/signup"
                           class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                여기를 클릭
              </router-link>
            </p>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
// import bcrypt from 'bcryptjs'

export default {
  name: 'LoginPage',

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    login() {
      axios.post('/api/login/',
          {
            "id": this.username,
            "pw": this.password,//bcrypt.hashSync(this.password,10),
          },
          {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
        .then((res) => {
          if (res.status === 200) {
            let data = {
              userId: res.data.user_id,
              userName: res.data.user_name,
              permission: res.data.permission
            }
            console.log(data)

            this.is_login = false

            this.$store.commit('login', data);
            this.$router.push('/');
          }
        })
        .catch((err) => {
          alert('로그인 실패');
          console.log(err);
          if (err.response.status === 400) {
            console.log(JSON.stringify(err.response.data));
          } else {
            console.log('알수없는 에러입니다');
          }
        });
    },
  },
};

</script>

<style>

</style>
