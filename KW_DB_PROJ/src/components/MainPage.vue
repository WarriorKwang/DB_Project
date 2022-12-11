<template>
  <div>
    <div class="max-w-[72rem] mx-auto">
      <div class="mb-12">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          전례 없는
          <span
              class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">초고속</span> 주식거래소</h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">빠른 주식거래는 KW 주식거래소에서! (하지만 빨랐죠)</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-5 pb-5
            border-gray-600 border-b">
            가장 많이 <span class="text-red-600">오른</span> TOP10
          </h1>

          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                선택
              </th>
              <th scope="col" class="py-3 px-6">
                종목
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  규모(총 주식수)
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  시세
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  변동량
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="stock in stockUpList"
                :key="stock.code">
              <th v-if="stock.isMyStock"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-default">
                ⭐
              </th>
              <th v-else scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                <input id="default-radio-2" type="radio" v-bind:value="stock.code" name="default-radio"
                       @change="radioChange($event)"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </th>
              <th scope="row" class="py-4 px-6 font-bold text-lg text-gray-900 whitespace-nowrap dark:text-white">
                <router-link :to="{path: '/stock/info/' + stock.code}">
                  {{stock.name}}
                </router-link>
              </th>
              <td class="py-4 px-6">
                {{ stock.volume }} 주
              </td>
              <td class="py-4 px-6">
                {{ stock.price }} KRW
              </td>
              <td class="py-4 px-6" v-if="stock.diff > 0">
                <i class="fa-solid fa-caret-up text-red-600"></i> {{ stock.diff }}%
              </td>
              <td class="py-4 px-6" v-else-if="stock.diff < 0">
                <i class="fa-solid fa-caret-down text-blue-600"></i> {{ stock.diff }}%
              </td>
              <td class="py-4 px-6" v-else>
                <i class="fa-solid fa-minus"></i>
              </td>
            </tr>
            </tbody>
          </table>
          <div role="status" ref="loading1"
               class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
          <div id="toolbar" class="pt-5 flex justify-between">
            <button v-on:click="addToMyStocks"
                    class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              관심종목 등록
          </span>
            </button>
          </div>
        </div>

        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-5 pb-5
            border-gray-600 border-b">
            가장 많이 <span class="text-blue-600">내린</span> TOP10
          </h1>

          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                선택
              </th>
              <th scope="col" class="py-3 px-6">
                종목
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  규모(총 주식수)
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  시세
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  변동량
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="stock in stockDownList" :key="stock.code">
              <th v-if="stock.isMyStock"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-default">
                ⭐
              </th>
              <th v-else scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                <input id="default-radio-2" type="radio" v-bind:value="stock.code" name="default-radio"
                       @change="radioChange($event)"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </th>
              <th scope="row" class="py-4 px-6 font-bold text-lg text-gray-900 whitespace-nowrap dark:text-white">
                <router-link :to="{path: '/stock/info/' + stock.code}">
                  {{stock.name}}
                </router-link>
              </th>
              <td class="py-4 px-6">
                {{ stock.volume }} 주
              </td>
              <td class="py-4 px-6">
                {{ stock.price }} KRW
              </td>
              <td class="py-4 px-6" v-if="stock.diff > 0">
                <i class="fa-solid fa-caret-up text-red-600"></i> {{ stock.diff }}%
              </td>
              <td class="py-4 px-6" v-else-if="stock.diff < 0">
                <i class="fa-solid fa-caret-down text-blue-600"></i> {{ stock.diff }}%
              </td>
              <td class="py-4 px-6" v-else>
                <i class="fa-solid fa-minus"></i>
              </td>
            </tr>
            </tbody>
          </table>
          <div role="status" ref="loading2"
               class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
          <div id="toolbar" class="pt-5 flex justify-between">
            <button v-on:click="addToMyStocks"
                    class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              관심종목 등록
          </span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'StockPage',

  data() {
    return {
      stockUpList: [
      ],

      stockDownList: [
      ],

      group_stock_list: [
      ],

      selectedStock: 0,
    }
  },

  created() {
    this.getLeapStockList()
  },

  methods: {
    getLeapStockList() {
      axios.get('/api/stock/jump/', {
        page: this.$route.params.page,
      })
          .then(response => {
            this.stockUpList = response.data.upstock
            this.stockDownList = response.data.downstock

            this.$refs.loading1.style.display = 'none'
            this.$refs.loading2.style.display = 'none'

            this.getMyStockList()
          })
    },

    addToMyStocks() {
      axios.post('/api/user/stock/group', {
        code: this.selectedStock
      })
          .then(() => {
            alert('관심종목에 등록되었습니다.')
            this.$router.go(0)
          })
    },

    getMyStockList() {
      axios.get('/api/user/stock/group/list')
          .then((response) => {
            this.group_stock_list = response.data
            this.group_stock_list.map((stock) => {
              stock.price = String(stock.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              stock.volume = String(stock.volume).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            })

            this.stockUpList.map((stock) => {
              this.group_stock_list.map((group_stock) => {
                if (stock.code === group_stock.stock_code) {
                  stock.isMyStock = true
                }
              })
            })

            this.stockDownList.map((stock) => {
              this.group_stock_list.map((group_stock) => {
                if (stock.code === group_stock.stock_code) {
                  stock.isMyStock = true
                }
              })
            })

            this.$forceUpdate();
          })
          .catch((error) => {
            console.log(error);
          });
    },

    reload() {
      window.location.reload()
    },

    radioChange(event){
      this.selectedStock = event.target.value;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
