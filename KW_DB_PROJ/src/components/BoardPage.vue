<template>
  <div class='max-w-[64rem] min-w-[18rem] mx-auto'>
    <div class="mb-12 pb-5 border-gray-600 border-b">
      <h1 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        <span
            class="text-transparent bg-clip-text bg-gradient-to-r to-pink-400 from-yellow-400">주식토론</span> 게시판
      </h1>
      <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"><span class="text-white font-bold">주식거래에
        필요한 인사이트를 얻으세요!</span> 하지만 증권투자는 본인의 판단과 책임으로. 증권투자는 반드시 자기 자신의 판단과 책임하에 하여야 하며, 자신의 여유자금으로 분산투자하는 것이 좋습니다.</p>
    </div>

    <div id="filterContainer" class="pb-5" v-on:click="reload()">
      <router-link v-for="stock in hotStockList" :key="stock.code"
                   :to="{name: 'board', params: {page: 1, stock: stock.stockCode}}">
        <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {{ stock.name }}
          </span>
        </button>
      </router-link>
    </div>


    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class="py-3 px-6 font-bold text-lg" scope="col">
          제목
        </th>
        <th class="py-3 px-6" scope="col">
          <div class="flex items-center">
            종목
            <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
            </svg>
          </div>
        </th>
        <th class="py-3 px-6" scope="col">
          <div class="flex items-center">
            주제
            <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
            </svg>
          </div>
        </th>
        <th class="py-3 px-6" scope="col">
          <div class="flex items-center">
            등록일
            <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
            </svg>
          </div>
        </th>
        <th class="py-3 px-6" scope="col">
          <div class="flex items-center">
            조회수
            <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
            </svg>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="atc in articleList" v-bind:key="atc.post_idx"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
          <router-link :to="{path: '/board/article/viewer/' + atc.post_idx}">
            {{ atc.title }}
          </router-link>
        </th>
        <td class="py-4 px-6">
          {{ atc.cop_name }}
        </td>
        <td class="py-4 px-6">
          {{ atc.topic }}
        </td>
        <td class="py-4 px-6">
          {{ atc.created_date }}
        </td>
        <td class="py-4 px-6">
          {{ atc.views }}
        </td>
      </tr>
      </tbody>
    </table>
    <div ref="loading" class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
         role="status">
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
      <button
          class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <router-link to="/board/article/editor">
            글쓰기
          </router-link>
        </span>
      </button>

      <nav aria-label="Page navigation example"
           class="p-0.5 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg" v-on:click="reload()">
        <ul class="inline-flex -space-x-px">
          <li class="py-2">
            <router-link v-if="pageLookup.cur > pageLookup.bottom"
                         :to="{name: 'board', params: {page: pageLookup.cur - 1, stock: filterStockCode}}"
                         class="px-3 py-2.5 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-opacity-0 hover:border-opacity-0 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              Next
            </router-link>

            <a v-else
               class="px-3 py-2.5 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-opacity-0 hover:border-opacity-0 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">Next</a>
          </li>

          <li v-for="p_idx in pageLookup.top - pageLookup.bottom + 1" v-bind:key="p_idx" class="py-2">
            <router-link v-if="pageLookup.cur == p_idx + pageLookup.bottom - 1"
                         :to="{name: 'board', params: {page: p_idx + pageLookup.bottom - 1, stock: filterStockCode}}"
                         class="px-3 py-2.5 leading-tight text-white bg-opacity-0 hover:border-opacity-0 hover:text-gray-700">
              {{ p_idx + pageLookup.bottom - 1 }}
            </router-link>
            <router-link v-else
                         :to="{name: 'board', params: {page: p_idx + pageLookup.bottom - 1, stock: filterStockCode}}"
                         class="px-3 py-2.5 leading-tight text-gray-500 border border-gray-300 hover:bg-opacity-0 hover:border-opacity-0 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              {{ p_idx + pageLookup.bottom - 1 }}
            </router-link>
          </li>

          <li class="py-2">
            <router-link v-if="pageLookup.cur < pageLookup.top"
                         :to="{name: 'board', params: {page: pageLookup.cur + 1, stock: filterStockCode}}"
                         class="px-3 py-2.5 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-opacity-0 hover:border-opacity-0 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              Next
            </router-link>

            <a v-else
               class="px-3 py-2.5 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-opacity-0 hover:border-opacity-0 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BoardPage",

  data() {
    return {
      articleList: [],

      pageLookup: {
        bottom: 1,
        cur: this.$route.params.page,
        top: 5
      },

      filterStockCode: this.$route.params.stock,

      hotStockList: []
    }
  },

  created() {
    axios.get('/api/stock/hot-stocks')
        .then((response) => {
          this.hotStockList = response.data;
          this.$refs.loading.style.display = 'none'
        })
        .catch((error) => {
          console.log(error);
        });

    this.getArticleList(this.$route.params.stock, this.$route.params.page);
  },

  methods: {
    reload() {
      window.location.reload()
    },

    // TODO:
    getArticleList(stockIdx = 0, p = 1) {
      axios.post('/api/article/list',
          {
            page: p,
            stock_code: stockIdx, // 0: 전체, other : stockIdx
            orderBy: 'date'
          })
          .then((response) => {
            this.articleList = response.data.articleList;
            this.pageLookup = response.data.pageLookup;
            this.articleList.map((article) => {
              // parse into yyyy-mm-dd
              article.created_date = article.created_date.split('T')[0];
            });
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>

</style>