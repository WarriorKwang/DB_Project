<template>
  <div ref="content" class="flex flex-col max-w-7xl 2xl: sticky top-0">
    <div class="block pb-5 mb-5 g-white shadow-md dark:bg-gray-800 dark:border-gray-700 border-gray-600 border-b">
      <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ corp["cop_name"] }} ({{ corp["market"] }})
      </h5>
      <p class="font-normal text-lg dark:text-white">
        {{
          String(chart["ohlcv"][chart["ohlcv"].length - 1][4]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }} KRW (<span
          v-if="corp.diff > 0"><i class="fa-solid fa-caret-up text-red-600"></i> {{ corp.diff }}%</span><span
          v-else-if="corp.diff < 0"><i class="fa-solid fa-caret-down text-blue-600"></i> {{
          corp.diff
        }}%</span><span v-else><i class="fa-solid fa-minus"></i></span>)
      </p>
      <p class="font-normal text-lg text-gray-700 dark:text-gray-400">
        {{ corp["cop_info"] }}
      </p>
    </div>

    <div class="flex flex-col-reverse gap-10">
      <!-- NOTE: list view -->

      <div class="flex flex-col 2xl:flex-row gap-10 justify-between">
        <div id="chart" class="flex flex-col gap-10">
          <trading-vue ref="tradingVue"
                       :color-back="colors.colorBack"
                       :color-grid="colors.colorGrid"
                       :color-text="colors.colorText"
                       :data="this.chart"
                       :height=500
                       :overlays="overlays"
                       :titleTxt="this.corp['cop_name']"
                       :width="this.width"
                       class="rounded-lg overflow-hidden pb-10 bg-white mx-auto"
          >
          </trading-vue>

          <div class="flex gap-10 justify-between">
              <div class="w-full p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mb-5">
                  기본 정보
                </h5>
                <dl
                    class="flex flex-col gap-2 max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div class="flex flex-col pb-1">
                    <dt class="font-bold md:text-lg dark:text-gray-400">
                      발행 주식 수
                    </dt>
                    <dd class="text-gray-500 font-semibold dark:text-white">
                      {{ corp["stock_amount"] }} 주
                    </dd>
                  </div>
                  <div class="flex flex-col py-1">
                    <dt class="font-bold md:text-lg dark:text-gray-400">
                      주요 주주
                    </dt>
                    <dd class="text-gray-500 font-semibold dark:text-white">
                      {{ corp["stockholder_name"] }}
                    </dd>
                  </div>
                  <div class="flex flex-col pt-1">
                    <dt class="font-bold md:text-lg dark:text-gray-400">
                      최대주주 ({{ String(corp.stockholder_name).split(" ")[0] }}) 보유량
                    </dt>
                    <dd class="text-gray-500 font-semibold dark:text-white">
                      {{ corp["stock_holding_amount"] }}주
                      ({{ corp["stock_holding_ratio"] }}%)
                    </dd>
                  </div>
                </dl>
              </div>

            <div
                class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  거래 지표
                </h5>
                <div class="flex flex-col">
                  <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          v-on:click="button_click">
                    offchart 변경
                  </button>
                </div>
              </div>
              <div class="flow-root">
                <ul class="divide-y divide-gray-200 dark:divide-gray-700" role="list">
                  <li class="py-3 sm:py-2">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p class="font-bold md:text-lg text-gray-900 truncate dark:text-gray-400 ">
                          전일 거래량(24H)
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{
                          String(this.chart["ohlcv"][this.chart["ohlcv"].length -
                          1][5]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }} 주
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-2">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p class="font-bold md:text-lg text-gray-900 truncate dark:text-gray-400">
                          고가(당일)
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{
                          String(this.chart["ohlcv"][this.chart["ohlcv"].length -
                          1][2]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }} KRW
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-2">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p class="font-bold md:text-lg text-gray-900 truncate dark:text-gray-400">
                          저가(당일)
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{
                          String(this.chart["ohlcv"][this.chart["ohlcv"].length -
                          1][3]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }} KRW
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-2">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p class="font-bold md:text-lg text-gray-900 truncate dark:text-gray-400">
                          전일종가
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{
                          String(this.chart["ohlcv"][this.chart["ohlcv"].length -
                          2][4]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }} KRW
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- sidebar -->
        <div class="flex flex-row 2xl:flex-col gap-5 min-w-[20rem]">
          <div
              class="w-full p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
            <h5
                class="text-3xl font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r to-yellow-400 from-blue-400">
              주문콘솔
            </h5>
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400">
                예치금
              </label>
              <p class="font-extrabold text-xl dark:text-white">
                {{ money }} KRW
              </p>
            </div>
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400">
                보유수량
              </label>
              <p class="font-extrabold text-xl dark:text-white">
                {{ String(user_stock_info.stock_count).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }} 주
              </p>
            </div>
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400"
                     for="trade">
                매수/매도
              </label>
              <select
                  id="trade"
                  v-model="trade"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="sell">매도</option>
                <option selected value="buy">매수</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                     for="order_amount">
                수량(1 단위)
              </label>
              <input
                  id="order_amount" v-model="order_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"
                  required
                  type="number"/>
            </div>
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-900 dark:text-white" for="order_price">
                주문가격
              </label>
              <input
                  id="order_price" v-model="order_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"
                  required
                  type="number"/>
            </div>
            <button class="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    v-on:click="order">
              주문
            </button>
            <p class="font-bold text-red-600">
              {{order_alert}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TradingVue from "trading-vue-js";
import Overlays from "tvjs-overlays";
import axios from "axios";

export default {
  name: "app",
  components: {TradingVue},

  watch: {
    order_amount: function() {this.validateOrder()},
    order_price: function() {this.validateOrder()},
    trade: function() {this.validateOrder()},
  },

  methods: {
    onResize() {
      if (window.innerWidth > 1536) {
        this.width = 880
      } else {
        this.width = window.innerWidth > 1280 ? 1240 : window.innerWidth - 40;
      }
    },
    checkMoney() {
      axios
          .get("/api/user/money/")
          .then((res) => {
            this.money_integer = res.data
            this.money = String(res.data).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          })
          .catch((err) => {
            console.log(err);
          });
    },
    order() {
      if (this.order_valid) {
        axios.post("/api/stock/order/", {
          trade: this.trade,
          stock_code: this.stock_code,
          order_amount: this.order_amount,
          order_price: this.order_price,
        })
            .then(() => {
              alert((this.trade === 'buy' ? '[매수주문] ' : '[매도주문] ') + this.corp.cop_name + ' ' + this.order_amount +
                  " 주 / " + this.order_price + " KRW");
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        alert("주문이 올바르지 않습니다.");
      }
    },
    loadCorpInfo() {
      axios
          .post("/api/stock/info/", {
            stock_code: this.stock_code,
          })
          .then((res) => {
            this.corp = res.data;
            console.log('lsadkfjlsfjsa')
            console.log(this.corp)
            this.corp.stock_amount = String(this.corp.stock_amount).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
            );
            this.corp.stock_holding_amount = String(
                this.corp.stock_holding_amount
            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          })
          .catch((err) => {
            console.log(err);
          });
    },
    loadPriceData() {
      axios
          .post("/api/stock/price/", {
            stock_code: this.stock_code,
            group_name: "default",
          })
          .then((res) => {
            console.log('hi')
            if(res.data.length > 0) {

              console.log('hi')
              this.chart.ohlcv = []
              res.data.map((item) => {
                this.chart.ohlcv.push([
                  Date.parse(item.price_date),
                  item.open_price,
                  item.max_price,
                  item.min_price,
                  item.close_price,
                  item.volume
                ]);
              });

              console.log(this.chart.ohlcv)
              this.corp.diff = Math.floor((this.chart["ohlcv"][this.chart["ohlcv"].length - 1][4] /
                  this.chart["ohlcv"][this.chart["ohlcv"].length - 2][4] - 1) * 10000) / 100

              this.drawOnChart()

              this.button_click()
              // this.$refs.tradingVue.resetChart()
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    button_click() {
      this.count += 1;
      const types = ["RSI", "MOM", "BBW", "MFI"];
      const names = [
        "Relative Strength Index, 20",
        "Momentum, 10",
        "Bollinger Bands Width, 20",
        "Money Flow Index, 14",
      ];
      if (this.count % 4 == 1) {
        this.chart["offchart"][0]["name"] = names[1];
        this.chart["offchart"][0]["type"] = types[1];
        this.chart["offchart"][0]["data"] = this.MOM(this.chart["ohlcv"]);
      }
      if (this.count % 4 == 2) {
        this.chart["offchart"][0]["name"] = names[2];
        this.chart["offchart"][0]["type"] = types[2];
        this.chart["offchart"][0]["data"] = this.BBW(this.chart["ohlcv"]);
      }
      if (this.count % 4 == 3) {
        this.chart["offchart"][0]["name"] = names[3];
        this.chart["offchart"][0]["type"] = types[3];
        this.chart["offchart"][0]["data"] = this.MFI(this.chart["ohlcv"]);
      }
      if (this.count % 4 == 0) {
        this.chart["offchart"][0]["name"] = names[0];
        this.chart["offchart"][0]["type"] = types[0];
        this.chart["offchart"][0]["data"] = this.RSI(this.chart["ohlcv"]);
      }
    },
    loadUserStockInfo() {
      axios.get('/api/user/stock/' + this.stock_code)
          .then((res) => {
            console.log(res.data)
            this.user_stock_info = res.data
          })
          .catch((err) => {
            console.log(err)
            this.user_stock_info.stock_count = 0
          })
    },
    validateOrder() {
      this.order_amount = parseInt(this.order_amount)
      this.order_price = parseInt(this.order_price)

      if(this.order_amount < 0)
        this.order_amount = 0
      if(this.order_price < 0)
        this.order_price = 0

      if (this.trade === 'buy') {
        if (this.order_amount * this.order_price > this.money_integer) {
          this.order_alert = "예치금이 부족합니다!";
          this.order_valid = false;
        } else {
          this.order_alert = "";
          this.order_valid = true;
        }
      } else if (this.trade === 'sell') {
        if (this.order_amount > parseInt(this.user_stock_info.stock_count)) {
          this.order_alert = "보유주식이 부족합니다!";
          this.order_valid = false;
        } else {
          this.order_alert = "";
          this.order_valid = true;
        }
      } else {
        this.order_alert = "주문을 다시 확인해주세요!";
        this.order_valid = false;
      }

      console.log(this.order_alert)
      this.$forceUpdate();
    },
    drawOnChart() {
      this.chart["onchart"][0]["data"] = this.BB(this.chart["ohlcv"]);
      this.chart["onchart"][1]["data"] = this.SMA(this.chart["ohlcv"]);
      this.chart["onchart"][2]["data"] = this.EMA(this.chart["ohlcv"]);
      this.chart["offchart"][0]["data"] = this.MFI(this.chart["ohlcv"]);
    },

    //MFI,BBW,MOM,RSI
    SMA(ohlcv) {
      //console.log(ohlcv);
      var data = [];
      var close_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 20) {
          const result = close_data.reduce(function add(sum, currValue) {
            return sum + currValue;
          }, 0);
          const average = result / close_data.length;
          data.push([ohlcv[i][0], average]);
          close_data.shift();
          close_data.push(ohlcv[i][4]);
          continue;
        }
        close_data.push(ohlcv[i][4]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
    EMA(ohlcv) {
      //console.log(ohlcv);
      var data = [];
      var close_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 20) {
          const result = close_data.reduce(function add(sum, currValue) {
            return sum + currValue;
          }, 0);
          const average = result / close_data.length;
          const multiplier = 2 / 21;
          const EMA = ohlcv[i][4] * multiplier + average * (1 - multiplier);
          data.push([ohlcv[i][0], EMA]);
          close_data.shift();
          close_data.push(ohlcv[i][4]);
          continue;
        }
        close_data.push(ohlcv[i][4]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
    MOM(ohlcv) {
      var data = [];
      var before_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 10) {
          const momentum = ohlcv[i][4] / before_data[0];
          data.push([ohlcv[i][0], momentum * 100]);
          before_data.shift();
          before_data.push(ohlcv[i][4]);
          continue;
        }
        before_data.push(ohlcv[i][4]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
    BBW(ohlcv) {
      //console.log(ohlcv);
      var data = [];
      var close_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 20) {
          const result = close_data.reduce(function add(sum, currValue) {
            return sum + currValue;
          }, 0);
          const average = result / close_data.length;

          var devTotal = 0; // 편차
          for (var j = 0; j < close_data.length; j++) {
            var dev = close_data[j] - average;
            devTotal += dev * dev;
          }

          var sStdDev = Math.sqrt(devTotal / (close_data.length - 1)); // 표본표준편차
          const upper_limit = average + sStdDev * 2;
          const lower_limit = average - sStdDev * 2;
          data.push([ohlcv[i][0], (upper_limit - lower_limit) / average]);
          close_data.shift();
          close_data.push(ohlcv[i][4]);
          continue;
        }
        close_data.push(ohlcv[i][4]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
    BB(ohlcv) {
      //console.log(ohlcv);
      var data = [];
      var close_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 20) {
          const result = close_data.reduce(function add(sum, currValue) {
            return sum + currValue;
          }, 0);
          const average = result / close_data.length;

          var devTotal = 0; // 편차
          for (var j = 0; j < close_data.length; j++) {
            var dev = close_data[j] - average;
            devTotal += dev * dev;
          }

          var sStdDev = Math.sqrt(devTotal / (close_data.length - 1)); // 표본표준편차
          const upper_limit = average + sStdDev * 2;
          const lower_limit = average - sStdDev * 2;
          data.push([
            ohlcv[i][0],
            lower_limit,
            (upper_limit - lower_limit) / average,
            upper_limit,
          ]);
          close_data.shift();
          close_data.push(ohlcv[i][4]);
          continue;
        }
        close_data.push(ohlcv[i][4]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
    MFI(ohlcv) {
      //console.log(ohlcv);
      var data = [];
      var close_data = [];
      var high_data = [];
      var low_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 5) {
          const TP = (ohlcv[i][2] + ohlcv[i][3] + ohlcv[i][4]) / 3;
          var PMF = 0;
          var NMF = 0;
          for (var j = 0; j < close_data.length; j++) {
            const MF = (close_data[j] + high_data[j] + low_data[j]) / 3;
            if (TP < MF) PMF += MF;
            else NMF += MF;
          }
          const MFR = PMF / NMF;
          const MFI = MFR / (1 + MFR);
          data.push([ohlcv[i][0], MFI * 100]);
          close_data.shift();
          high_data.shift();
          low_data.shift();
          close_data.push(ohlcv[i][4]);
          high_data.push(ohlcv[i][2]);
          low_data.push(ohlcv[i][3]);
          continue;
        }
        close_data.push(ohlcv[i][4]);
        high_data.push(ohlcv[i][2]);
        low_data.push(ohlcv[i][3]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
    RSI(ohlcv) {
      //console.log(ohlcv);
      var data = [];
      var close_data = [];
      let count = 0;
      for (var i = 0; i < ohlcv.length; i++) {
        if (count == 20) {
          var AU = 0;
          var AD = 0;
          for (var j = 0; j < close_data.length - 1; j++) {
            const diff = close_data[j + 1] - close_data[j];
            if (diff > 0) AU += diff;
            else AD += diff * -1;
          }
          const RS = AU / AD;
          const RSI = RS / (1 + RS);
          data.push([ohlcv[i][0], RSI * 100]);
          close_data.shift();
          close_data.push(ohlcv[i][4]);
          continue;
        }
        close_data.push(ohlcv[i][4]);
        count++;
      }
      for (var k = 0; k < data.length; k++) {
        //console.log(data[k]);
      }
      return data;
    },
  },
  created() {
    window.addEventListener('resize', this.onResize)
    this.onResize()

    this.loadCorpInfo()
    this.loadPriceData()
    this.loadUserStockInfo()
    this.checkMoney()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      width: window.innerWidth,
      stock_code: this.$router.currentRoute.params.stock_code,
      user_stock_info: {},
      corp: {},
      money_integer: 0,
      money: "",
      order_alert: "",
      order_valid: false,
      count: 999,
      trade: "buy",
      order_amount: 0,
      order_price: 0,
      overlays: [
        Overlays["MOM"],
        Overlays["SMA"],
        Overlays["EMA"],
        Overlays["BBW"],
        Overlays["MFI"],
        Overlays["RSI"],
        Overlays["BB"],
      ],
      chart: {
        ohlcv: [],
        onchart: [
          {
            name: "Bollinger Bands, 20",
            type: "BB",
            data: [],
            settings: {
              color: "#2cc6c9ab",
              backColor: "#2cc6c90a",
            },
          },
          {
            name: "Simple Moving Average, 20",
            type: "SMA",
            data: [],
            settings: {
              color: "#0000cc",
            },
          },
          {
            name: "Exponential Moving Average, 20",
            type: "EMA",
            data: [],
            settings: {
              color: "#ff0000",
            },
          },
        ],
        offchart: [
          {
            name: "Money Flow Index, 14",
            type: "MFI",
            data: [],
            settings: {
              color: "#ff0000",
              backColor: "#2cc6c90a",
            },
          },
        ],
      },
      colors: {
        colorBack: "#fff",
        colorGrid: "#eee",
        colorText: "#333",
      },
    };
  },
};
</script>
