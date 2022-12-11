<template>
  <section class="">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            비밀번호 찾기
          </h1>

          <div v-if="temp_validation_key === ''" id="tempValidationContainer" class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                사용자 ID
              </label>
              <input type="text" name="username" id="username"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="사용자 ID" required="" v-model="id">
            </div>
            <div>
              <label for="user_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                이름
              </label>
              <input type="text" name="user_name" id="user_name" placeholder="이름"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required="" v-model="user_name">
            </div>
            <div>
              <label for="phone_num" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                전화번호
              </label>
              <input type="text" name="phone_num" id="phone_num" placeholder="전화번호"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required="" v-model="phone_num">
            </div>
            <button
                class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="getValidation">
              임시 인증요청
            </button>
          </div>
          <div v-else id="newPwContainer" class="space-y-4 md:space-y-6">
            <div>
              <label for="newPw" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {{ id }}의 새로운 비밀번호
              </label>
              <input type="password" name="newPw" id="newPw"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="비밀번호" required="" v-model="newPw">
            </div>
            <div>
              <label for="newPw2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                비밀번호 확인
              </label>
              <input type="password" name="newPw2" id="newPw2"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="비밀번호 확인" required="" v-model="newPw2">
            </div>

            <p class="font-bold text-red-600">
              {{ pwValidAlert }}
            </p>

            <button
                class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="submitNewPw">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'


export default {
  name: 'PasswordFindPage',

  watch: {
    newPw: function() {
      this.validatePw()
    },

    newPw2: function() {
      this.validatePw()
    }
  },

  data() {
    return {
      id: '',
      user_name: '',
      phone_num: '',

      temp_validation_key: '',

      newPw: '',
      newPw2: '',
      pwValid: false,
      pwValidAlert: ''
    };
  },

  methods: {
    getValidation() {
      axios.post('/api/login/temp-validation', {
        id: this.id,
        user_name: this.user_name,
        phone_num: this.phone_num,
      }).then((res) => {
        alert("인증완료")
        this.temp_validation_key = res.data
      }).catch((error) => {
        alert("인증실패")
        this.temp_validation_key = ""
        console.log(error);
      });
    },

    validatePw() {
      if(this.newPw === this.newPw2) {
        this.pwValid = true
        this.pwValidAlert = ''
      } else {
        this.pwValid = false
        this.pwValidAlert = '비밀번호가 일치하지 않습니다.'
      }
    },

    submitNewPw() {
      if(this.pwValid) {
        axios.post('/api/login/reset-pw', {
          id: this.id,
          key: this.temp_validation_key,
          pw: this.newPw,
        }).then(() => {
          alert("비밀번호 변경 완료")
          this.$router.push('/login')
        }).catch((error) => {
          console.log(error);
        });
      } else {
        alert("비밀번호가 일치하지 않습니다.")
      }
    }
  },
};

</script>

<style>

</style>
