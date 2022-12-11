<template>
  <div class="gap-10 max-w-[64rem] sticky top-0">
    <div class="flex flex-col gap-10">
      <!-- NOTE: list view -->
      <div class="text-gray-900 dark:text-white mb-5 pb-5
						border-gray-600 border-b ">
        <p class="text-3xl font-bold">
          관리자 콘솔
        </p>
        <span class="text-gray-600 dark:text-gray-400">
				신규주식 등록, 주식정보 수정, 미승인 유저 관리 등의 관리자 기능을 제공합니다.
			</span>
      </div>
      <div class="flex gap-10 justify-between">
        <div
            class="grow h-min p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
            <div>
              <h5
                  class="text-2xl font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b">
                주식 정보 관리
              </h5>
            </div>
            <div id="selector" class="flex flex-row gap-5">
              <button v-on:click="toAddMode"
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    신규등록
                </span>
              </button>
              <button v-on:click="toEditMode"
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br to-purple-600 from-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    정보변경
                </span>
              </button>
            </div>
            <div id="addContainer" class="flex flex-col gap-5" v-if="mode === 'add'">
              <div>
                <label for="stock_code" class="block mb-2 text-lg font-bold text-gray-900 dark:text-white">종목코드</label>
                <input type="text" v-model="stock_info['stock_code']" id="stock_code"
                       class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="6자리 종목코드" required />
              </div>

              <div>
                <label for="stock_name " class="block mb-2 text-lg font-bold text-gray-900 dark:text-white">종목명</label>
                <input type="text" v-model="stock_info['cop_name']" id="stock_name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="주식 종목명" required />
              </div>

              <div>
                <label for="stock_amount" class="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  발행 주식 수</label>
                <input type="text" v-model="stock_info['stock_amount']" id="stock_amount"
                       class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="초기발행 총 주식 수" required />
              </div>
              <div>
                <label for="cop_info" class="block mb-2 text-lg font-bold text-gray-900 dark:text-white">기업정보</label>
                <textarea id="cop_info" v-model="stock_info['cop_info']" rows="4"
                          class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="간단한 기업에 대한 소개"></textarea>
              </div>

              <div>
                <button type="button" v-on:click="submit_stock"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  등록
                </button>
              </div>
            </div>
            <div id="editContainer" class="flex flex-col gap-5" v-else>
              <div>
                <select id="countries_disabled" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="editStockTarget">
                  <option value="0" selected disabled>--정보를 수정할 주식종목--</option>
                  <option v-for="stock in stockList" v-bind:key="stock" v-bind:value="stock.code">
                    {{ stock.name }}
                  </option>
                </select>
              </div>

              <div>
                <label for="cop_info" class="block mb-2 text-xl font-bold text-gray-900 dark:text-white">기업정보</label>
                <textarea id="cop_info" v-model="stock_info['cop_info']" rows="4"
                          class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="간단한 기업에 대한 소개"></textarea>
              </div>

              <div>
                <button type="button" v-on:click="edit_stock"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  업데이트
                </button>
              </div>
            </div>
        </div>
        <div class="gap-5 grow h-min">
          <div
              class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
            <h5
                class="text-2xl font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b">
              유저관리
            </h5>

            <div id="selector" class="flex flex-row gap-5">
              <button v-on:click="toApproval"
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    가입승인
                </span>
              </button>
              <button v-on:click="toDeposit"
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br to-purple-600 from-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    유저송금
                </span>
              </button>
            </div>

            <div v-if="userMode === 'approval'" id="approvalContainer" class="relative sm:rounded-lg">
                <table v-if="user_info.length !== 0" class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="text-center py-3 px-6">유저 아이디</th>
                    <th scope="col" class="text-center py-3 px-6">유저 이름</th>
                    <th scope="col" class="text-center py-3 px-6">작업</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="user in user_info" :key="user.idx"
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        class="py-4 px-6 font-bold text-gray-900 text-center whitespace-nowrap dark:text-white">
                      {{ user["id"] }}
                    </th>
                    <td class="py-4 px-6 font-bold text-gray-900 text-center whitespace-nowrap dark:text-white">
                      {{ user["user_name"] }}
                    </td>

                    <td class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly">
                      <button v-on:click="approve_user(user)"
                              class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              승인
                          </span>
                      </button>
                      <button
                          v-on:click="decline_user(user)"
                          class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              거절
                          </span>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <h5 v-else ref="no_pending_user" style="display: none"
                    class="text-xl text-center font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r to-yellow-400 from-blue-400">
                  깔끔해요! 미승인 유저가 없습니다.
                </h5>
                <div role="status" ref="loading"
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
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            <div v-else id="depositContianer" class="flex flex-col gap-5">
              <div>
                <select id="countries_disabled" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="depositTargetUser">
                  <option value="0" selected disabled>--송금할 대상유저--</option>
                  <option v-for="user in userList" v-bind:key="user.id" v-bind:value="user.id">
                    {{ user.user_name }} ({{ user.id }})
                  </option>
                </select>
              </div>

              <div>
                <label for="stock_code" class="block mb-2 text-lg font-bold text-gray-900 dark:text-white">금액</label>
                <input type="text" v-model="depositAmount" id="deposit-amount"
                       class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="유저에게 송금할 금액" required />
              </div>

              <div>
                <button type="button" v-on:click="submitDeposit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  송금
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  components: {},

  watch: {
    editStockTarget: function () {
      this.getStockInfo()
    }
  },

  methods: {
    getPendingUserList() {
      axios.get("/api/user/info/pending/")
          .then((res) => {
            console.log(res.data);
            this.user_info = res.data;

            this.$refs.loading.style.display = 'none'
            this.$refs.no_pending_user.style.display = 'block'
          })
          .catch((err) => {
            console.log(err);
          });
    },
    toAddMode() {
      this.mode = "add";
      this.stock_info = {
        stock_code: "",
        cop_name: "",
        stock_amount: "",
        cop_info: "",
        market: "",
      };
    },
    toEditMode() {
      this.mode = "edit";
    },
    toApproval() {
      this.userMode = "approval";
      this.getPendingUserList()
    },
    toDeposit() {
      this.userMode = "deposit";
      this.getUserList()
    },
    submit_stock() {
      axios
          .post("/api/stock/submit/", {
            submit_type: "submit",
            stock_code: this.stock_info["stock_code"],
            stock_name: this.stock_info["cop_name"],
            stock_amount: this.stock_info["stock_amount"],
            cop_info: this.stock_info["cop_info"],
            market: "KOSPI",
          })
          .then((res) => {
            alert("등록되었습니다.");
            this.$router.go(0)
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    edit_stock() {
      axios
          .post("/api/stock/submit/", {
            submit_type: "edit",
            stock_code: this.stock_info["stock_code"],
            stock_name: this.stock_info["cop_name"],
            stock_amount: this.stock_info["stock_amount"],
            cop_info: this.stock_info["cop_info"],
            market: this.stock_info["market"],
          })
          .then((res) => {
            alert("수정되었습니다.");
            this.$router.go(0)
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    approve_user(user) {
      axios
          .post("/api/user/approve/", {
            id: user["id"],
            user_name: user["user_name"],
          })
          .then((res) => {
            console.log(res.data);
            this.getPendingUserList()
          })
          .catch((err) => {
            console.log(err);
          });
    },
    decline_user(user) {
      console.log(user["id"]);
      console.log(user["user_name"]);
      axios
          .post("/api/user/decline/", {
            id: user["id"],
            user_name: user["user_name"],
          })
          .then((res) => {
            console.log(res.data);
            this.getPendingUserList()
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getStockList() {
      axios.post('/api/stock/list', {
        page: 0
      }).
      then((response) => {
        this.stockList = response.data.stockList;
      }).
      catch((error) => {
        console.log(error);
      });
    },
    getStockInfo() {
      axios
          .post("/api/stock/info/", {
            stock_code: this.editStockTarget,
          })
          .then((res) => {
            this.stock_info = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getUserList() {
      axios.get('/api/user/list')
          .then((response) => {
            console.log(response.data);
            this.userList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitDeposit() {
      axios.post('/api/user/deposit', {
        user_id: this.depositTargetUser,
        money: this.depositAmount
      })
          .then((response) => {
            alert("송금되었습니다.");
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  created() {
    this.getPendingUserList()
    this.getStockList()
  },
  data() {
    return {
      stock_info: {
        stock_code: "",
        cop_name: "",
        stock_amount: "",
        cop_info: "",
        market: "",
      },
      userList: [],
      user_info: [],
      mode: "add",
      userMode: "approval",
      stockList: [],
      depositTargetUser: "0",
      depositAmount: "",
      editStockTarget: "0",
    };
  },
};
</script>
