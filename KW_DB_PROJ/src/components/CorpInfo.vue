<template>
  <div>
    <div id="card">
      <a
        href="#"
        class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ corp["cop_name"] }} ({{ corp["market"] }})
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ corp["cop_info"] }}
        </p>
      </a>
    </div>
    <div id="information">
      <footer
        class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900"
      >
        <div class="sm:flex sm:items-center sm:justify-between">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >{{ corp["cop_name"] }} 총 주식량 : {{ corp["stock_amount"] }}</span
          >
        </div>
        <div class="sm:flex sm:items-center sm:justify-between">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >{{ corp["cop_name"] }} 주식 보유자 :
            {{ corp["stockholder_name"] }}</span
          >
        </div>
        <div class="sm:flex sm:items-center sm:justify-between">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >{{ corp["cop_name"] }} 보유 주식량 :
            {{ corp["stock_holding_amount"] }}</span
          >
        </div>
        <div class="sm:flex sm:items-center sm:justify-between">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >{{ corp["cop_name"] }} 보유 주식 비율 :
            {{ corp["stock_holding_ratio"] }}</span
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {},
  created() {
    // axios
    //   .get("http://127.0.0.1:8080/api/stock/list/:page/", {
    //     //스탁 코드를 보내고 기업 주주 정보랑 여러가지를 받아오기
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     this.ohlcv = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //주식회사 정보 조회
    //- 해당 주식회사 주식 차트
    //- 기업 개요
    //- 주요 주주 및 보유 지분
  },
  mounted() {},
  beforeDestroy() {},
  data() {
    return {
      corp: {
        stock_code: "005930",
        cop_name: "삼성전자",
        stock_amount: 596978255,
        cop_info:
          "한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 233개의 종속기업으로 구성된 글로벌 전자기업임.",
        market: "KOSPI 500",
        stockholder_name: "삼성생명보험 외 15인",
        stock_holding_amount: 1241176035,
        stock_holding_ratio: 20.79,
      },
    };
  },
};
</script>
