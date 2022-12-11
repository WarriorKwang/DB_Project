<template>
  <div class="max-w-[72rem] mx-auto">
    <div class="text-gray-900 dark:text-gray-300 mb-5 pb-5
						border-gray-600 border-b ">
      <p class="text-3xl font-bold">
        총 평가자산 : {{ tot_asset }}원 😎
      </p>
      <span class="text-gray-600 dark:text-gray-400">
				예치금 : {{ own_money }}원
			</span>
    </div>
    <div class="flex xl:flex-row gap-5 justify-center">
      <div id="userinfo-container"
           class="flex flex-col gap-5 h-min max-w-[460px] border rounded-lg dark:border-gray-700 sm:p-8">
        <div v-if="userinfoEditMode" id="userinfo-edit-container"
             class="bg-white dark:bg-gray-800 flex flex-col gap-5">
          <p class="text-2xl font-bold dark:text-gray-300 mb-3 pb-5 border-gray-600 border-b">
            🙍내 정보 수정
          </p>

          <div class="relative z-0 mb-6 w-full group">
            <input id="floating_name" v-model="user_info_new.user_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   name="floating_name"
                   placeholder=" " required="" type="text">
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                   for="floating_nmae">
              이름
            </label>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input id="floating_email" v-model="user_info_new.mail_addr" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   name="floating_email"
                   placeholder=" " required="" type="email">
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                   for="floating_email">
              메일주소</label>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input id="floating_phone" v-model="user_info_new.phone_number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="floating_phone"
                     pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                     placeholder=" " required="" type="tel">
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                     for="floating_phone">
                전화번호 (123-456-7890)</label>
            </div>

            <div class="relative z-0 mb-6 w-full group">
              <input id="floating_password" v-model="user_info_new.birthday"
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     name="floating_password"
                     placeholder=" " required="" type="date">
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                     for="floating_password">
                생년월일
              </label>
            </div>
          </div>
        </div>
        <div v-else id="userinfo-show-container"
             class="bg-white dark:bg-gray-800 flex flex-col gap-5">
          <p class="text-2xl font-bold dark:text-gray-300 mb-3 pb-5 border-gray-600 border-b">
            🙍내 정보
          </p>

          <div class="relative z-0 mb-6 w-full group">
            <input id="floating_name" v-model="user_info.user_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled
                   name="floating_name"
                   placeholder=" " required="" type="text">
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                   for="floating_nmae">
              이름
            </label>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input id="floating_email" v-model="user_info.mail_addr" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled
                   name="floating_email"
                   placeholder=" " required="" type="email">
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                   for="floating_email">
              메일주소</label>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input id="floating_phone" v-model="user_info.phone_number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled
                     name="floating_phone"
                     pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                     placeholder=" " required="" type="tel">
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                     for="floating_phone">
                전화번호 (123-456-7890)</label>
            </div>

            <div class="relative z-0 mb-6 w-full group">
              <input id="floating_password" v-model="user_info.birthday"
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled
                     name="floating_password"
                     placeholder=" " required="" type="date">
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                     for="floating_password">
                생년월일
              </label>
            </div>
          </div>
        </div>
        <div id="userinfo-toolbar">
          <div v-if="userinfoEditMode">
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    v-on:click="submitNewUserInfo">
              <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  저장
              </span>
            </button>
            <button v-on:click="userinfoEditMode = !userinfoEditMode"
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  취소
              </span>
            </button>
          </div>
          <button v-else class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  v-on:click="userinfoEditMode = !userinfoEditMode">
            <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                수정
            </span>
          </button>
        </div>
      </div>
      <div id="my-stock-container" class="flex flex-col gap-5 min-w-[460px]">
        <div id="own-stock-list"
             class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
          <p class="text-2xl font-bold dark:text-gray-300 mb-3 pb-5 border-gray-600 border-b">
            💼 보유주식
          </p>
          <table v-if="own_stock_list.length !== 0" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                  보유수량
                  <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                  </svg>
                </div>
              </th>
              <th class="py-3 px-6" scope="col">
                <div class="flex items-center">
                  시세
                  <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                  </svg>
                </div>
              </th>
              <th class="py-3 px-6" scope="col">
                <div class="flex items-center">
                  평가금액
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
            <tr v-for="stock in own_stock_list" :key="stock.stock_code"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                <router-link :to="{path: '/stock/info/' + stock.stock_code}">
                  {{ stock.stock_name }}
                </router-link>
              </th>
              <td class="py-4 px-6">
                {{ stock.stock_count }} 주
              </td>
              <td class="py-4 px-6">
                {{ stock.price }} KRW
              </td>
              <td v-if="stock.diff > 0" class="py-4 px-6">
                {{ stock.total_price }} <i class="fa-solid fa-caret-up text-red-600"></i> {{ stock.diff }}%
              </td>
              <td v-else-if="stock.diff < 0" class="py-4 px-6">
                {{ stock.total_price }} <i class="fa-solid fa-caret-down text-blue-600"></i> {{
                  stock.diff
                }}%
              <td v-else class="py-4 px-6">
                {{ stock.total_price }} <i class="fa-solid fa-minus"></i>
              </td>
            </tr>
            </tbody>
          </table>

          <div ref="loading1"
               class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
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
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div id="own-stock-list"
             class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
          <p class="text-2xl font-bold dark:text-gray-300 mb-3 pb-5 border-gray-600 border-b">
            ⭐ 관심종목
          </p>
          <table v-if="group_stock_list.length !== 0"
                 class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="py-3 px-6" scope="col">
                선택
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
                  규모(총 주식수)
                  <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                  </svg>
                </div>
              </th>
              <th class="py-3 px-6" scope="col">
                <div class="flex items-center">
                  시세
                  <svg aria-hidden="true" class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                  </svg>
                </div>
              </th>
              <th class="py-3 px-6" scope="col">
                <div class="flex items-center">
                  변동량
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
            <tr v-for="stock in group_stock_list" :key="stock.stock_code"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                <input id="default-radio-2"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                       name="default-radio" type="radio"
                       v-bind:value="stock.stock_code"
                       @change="radioChange($event)">
              </th>
              <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                <router-link :to="{path: '/stock/info/' + stock.code}">
                  {{ stock.cop_name }}
                </router-link>
              </th>
              <td class="py-4 px-6">
                {{ stock.volume }} 주
              </td>
              <td class="py-4 px-6">
                {{ stock.price }} KRW
              </td>
              <td v-if="stock.diff > 0" class="py-4 px-6">
                <i class="fa-solid fa-caret-up text-red-600"></i> {{ stock.diff }}%
              </td>
              <td v-else-if="stock.diff < 0" class="py-4 px-6">
                <i class="fa-solid fa-caret-down text-blue-600"></i> {{ stock.diff }}%
              </td>
              <td v-else class="py-4 px-6">
                <i class="fa-solid fa-minus"></i>
              </td>
            </tr>
            </tbody>
          </table>

          <div ref="loading2"
               class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
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
            <span class="sr-only">Loading...</span>
          </div>

          <div v-if="group_stock_list.length !== 0" id="toolbar" class="pt-5 flex justify-between">
            <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                v-on:click="removeFromMyStock">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    관심종목 해제
                </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyPage",

  data() {
    return {
      tot_asset: 0, // 이건 계산 알아서 할게요
      // 이 정보를 페이지 로드시에 요청하여 받아올 것임
      own_money: {
        money: 0,
      },

      user_info: {},
      user_info_new: {},

      own_stock_list: [],

      group_stock_list: [],

      selectedStock: 0,

      userinfoEditMode: false,
    }
  },

  mounted() {
    axios.get('/api/user/stock/own',)
        .then((response) => {
          this.own_stock_list = response.data.own_stock_list
          this.own_money = response.data.own_money

          this.tot_asset = response.data.own_money
          for (let i = 0; i < this.own_stock_list.length; i++) {
            this.tot_asset += this.own_stock_list[i].stock_count * this.own_stock_list[i].price
          }
          this.own_stock_list.map((stock) => {
            stock.total_price = String(stock.stock_count * stock.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          })

          this.tot_asset = String(this.tot_asset).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          this.own_money = String(this.own_money).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          this.own_stock_list.map((stock) => {
            stock.price = String(stock.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          })

          this.$refs.loading1.style.display = 'none'
        })
        .catch((error) => {
          console.log(error);
        });

    this.getUserInfo()
    this.getMyStockList()
  },

  methods: {
    getUserInfo() {
      axios.get('/api/user/info',)
          .then((response) => {
            this.user_info = response.data
            this.user_info.birthday = String(this.user_info.birthday).split('T')[0]
            this.user_info_new = this.user_info
          })
          .catch((error) => {
            console.log(error);
          });
    },

    submitNewUserInfo() {
      axios.put('/api/user/info', {
        user_name: this.user_info_new.user_name,
        phone_number: this.user_info_new.phone_number,
        mail_addr: this.user_info_new.mail_addr,
        birthday: String(this.user_info_new.birthday),
      })
          .then(() => {
            alert('회원정보가 수정되었습니다.')
            this.$router.go(0)
          })
          .catch((error) => {
            console.log(error);
          });
    },

    removeFromMyStock() {
      console.log(this.selectedStock)
      axios.delete('/api/user/stock/group/' + this.selectedStock)
          .then(() => {
            alert('관심종목에서 삭제 되었습니다.')
            this.$refs.loading2.style.display = 'block'
            this.getMyStockList()
            this.$refs.loading2.style.display = 'none'
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
            this.$refs.loading2.style.display = 'none'
          })
          .catch((error) => {
            console.log(error);
          });
    },

    radioChange(event) {
      this.selectedStock = event.target.value;
      console.log(event.target.value)
    }
  }
}
</script>

<style scoped>

</style>