<template>
  <div>
    <nav class="static bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 z-40 w-full border-b border-gray-500">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <router-link to="/" class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          📈 KW 주식거래소
        </router-link>
        <div class="flex items-center md:order-2 gap-2">
          <button type="button" @click="toggleMainMenu"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg  md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <button type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button" @click="toggleUserMenu">
            <span class="sr-only">유저메뉴 열기</span>
            <svg class="w-8 h-8 p-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
              </path>
            </svg>
          </button>
          <!-- Dropdown menu -->
          <div
            class="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 hidden cursor-pointer select-none border border-gray-500"
            id="user-dropdown" ref="userMenu" aria-hidden="true">
            <div class="py-3 px-4">
              <span class="block font-bold text-gray-900 dark:text-white" ref="username">로그인 해주세요.</span>
            </div>
            <ul v-if="is_login" class="py-1" aria-labelledby="user-menu-button">
              <li v-if="is_admin">
                <router-link to="/admin"
                             class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  관리자
                </router-link>
              </li>
              <li>
                <router-link to="/mypage"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  마이페이지
                </router-link>
              </li>
              <li>
                <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  @click="logout">
                  로그아웃
                </a>
              </li>
            </ul>
            <ul v-else class="py-1" aria-labelledby="user-menu-button">
              <li @click="toggleUserMenu">
                <router-link to="/login"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  로그인
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="justify-between items-center w-full md:flex md:w-auto md:order-1 hidden" id="mobile-menu-2"
          ref="mainMenu" aria-hidden>

          <ul
            class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <router-link to="/"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page">메인페이지</router-link>
            </li>
            <li>
              <!-- FIXME: ClusterIP의 내부 도메인 이름으로 변경해서 접근 가능하도록 변경해야함 -->
              <router-link to="/stock"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                주식거래
              </router-link>
            </li>
            <li>
              <!-- FIXME: ClusterIP의 내부 도메인 이름으로 변경해서 접근 가능하도록 변경해야함 -->
              <router-link to="/board/list/0/1"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                토론게시판
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div v-if="is_login" class="fixed bottom-5 right-5 z-50">
      <div v-if="leapUpList.length !== 0" class="hover-alert flex p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200"
           role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div class="ml-3 text-sm font-medium text-blue-700 dark:text-blue-800">
          {{ leapUpList[0].name }} 전일대비 {{leapUpList[0].diff}}% 상승! <router-link
            :to="{name: 'stockInfo', params: {stock_code: leapUpList[0].code}}"
            class="font-semibold underline hover:text-yellow-800 dark:hover:text-yellow-900">링크</router-link>를 클릭해서 더 알아보세요!
        </div>
        <button type="button" @click="closeAlert($event)"
                class="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2
                focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-1" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <div v-if="leapDownList.length !== 0" class="hover-alert flex p-4 mb-4 bg-yellow-100 rounded-lg dark:bg-yellow-200"
           role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-yellow-700 dark:text-yellow-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div class="ml-3 text-sm font-medium text-yellow-700 dark:text-yellow-800">
          {{ leapDownList[0].name }} 전일대비 {{leapDownList[0].diff}}% 하락... <router-link
            :to="{name: 'stockInfo', params: {stock_code: leapDownList[0].code}}"
                            class="font-semibold underline hover:text-yellow-800 dark:hover:text-yellow-900">링크
        </router-link>를 클릭해서 더 알아보세요!
        </div>
        <button type="button" @click="closeAlert($event)"
                class="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300" data-dismiss-target="#alert-4" aria-label="Close">
          <span class="sr-only">닫기</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <div v-for="alert in newlyConfirmed.bought" v-bind:key="alert.order_idx"
           class="hover-alert flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200"
           role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
          "{{ alert.stock_name }}"의 매수주문({{ alert.order_price }} KRW / {{ alert.order_amount }}주]이 전량채결! <router-link
            to="/mypage"
            class="font-semibold underline hover:text-green-800 dark:hover:text-green-900">링크</router-link>를 클릭해서
          더 알아보세요!
        </div>
        <button type="button" @click="checkConfirmAlert($event)" v-bind:value="alert.order_idx" order_type="buy"
                class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert-3" aria-label="Close">
          <span class="sr-only">닫기</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <div v-for="alert in newlyConfirmed.sold" v-bind:key="alert.order_idx"
           class="hover-alert flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200"
           role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
          "{{ alert.stock_name }}"의 매도주문({{ alert.order_price }} KRW / {{ alert.order_amount }}주]이 전량채결! <router-link
            to="/mypage"
            class="font-semibold underline hover:text-green-800 dark:hover:text-green-900">링크</router-link>를 클릭해서
          더 알아보세요!
        </div>
        <button type="button" @click="checkConfirmAlert($event)" v-bind:value="alert.order_idx" order_type="sell"
                class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert-3" aria-label="Close">
          <span class="sr-only">닫기</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

    </div>


  </div>

</template>

<script>

import axios from 'axios'


export default {
  name: 'AppNav',

  methods: {
    toggleMainMenu() {
      this.$refs.mainMenu.toggleAttribute('aria-hidden')
      this.$refs.mainMenu.classList.toggle('hidden')
    },
    toggleUserMenu() {
      this.$refs.userMenu.toggleAttribute('aria-hidden')
      this.$refs.userMenu.classList.toggle('hidden')
    },
    logout() {
      axios.get('/api/logout')
        .then(() => {
          this.toggleUserMenu()
          this.is_login = false
          this.$refs.username.innerHTML = "로그인 해주세요."
          this.$store.commit('logout')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getJumpedStock() {
      axios.get('/api/user/hober')
          .then((res) => {
            this.leapUpList = res.data.upstock
            this.leapDownList = res.data.downstock
          })
    },
    closeAlert(e) {
      // remove target alert from dom
      e.target.closest('.hover-alert').remove()
    },
    getNewlyConfirmedList() {
      axios.get('/api/user/stock/confirmed')
          .then((res) => {
            this.newlyConfirmed.bought = res.data.buylist
            this.newlyConfirmed.sold = res.data.selllist
            console.log(this.newlyConfirmed)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    checkConfirmAlert(e) {
      axios.post('/api/user/stock/confirmed/check/', {
        order_idx: e.target.closest('.ml-auto').value,
        order_type: e.target.closest('.ml-auto').getAttribute('order_type')
      })
          .then(() => {
            this.closeAlert(e)
            this.getNewlyConfirmedList()
          })
          .catch((error) => {
            console.log(error)
          })
    }
  },

  created() {
    this.getJumpedStock()
    this.getNewlyConfirmedList()
  },

  data() {
    return {
      is_login: false,
      is_admin: false,
      leapUpList: [],
      leapDownList: [],
      newlyConfirmed: {
        bought: [],
        sold: []
      },
    }
  },

  watch: {
    // TODO: 토큰이 있다면, 토큰이 만료되었는지 여부를 확인하고,,, refresh token까지 만료된 경우에는
    // 로그아웃을 시키고,,, access token만 만료된 경우에는 refresh token으로 access token을 재발급 받아야함
    $route() {
      this.is_login = false
      if(this.$store.getters.getUserId !== '') {
        this.is_login = true
        this.$refs.username.innerHTML = this.$store.getters.getUserName
      }

      console.log(this.$store.getters.getPermission)
      if(this.$store.getters.getPermission === '2') {
        this.is_admin = true
      }

      this.$refs.userMenu.classList.add('hidden')
      this.$refs.userMenu.setAttribute('aria-hidden', 'true')

      this.getJumpedStock()
      this.getNewlyConfirmedList()
    }
  },
}

</script>

<style>
#user-dropdown {
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
  width: 170px;
  transform: translate3d(calc(100vw - 200px), 82px, 0px);
}

* {
  box-sizing: border-box;
}
</style>