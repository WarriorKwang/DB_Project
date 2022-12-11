<template>
  <div>
    <div class="max-w-[64rem] mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-5 pb-5
						border-gray-600 border-b ">
       게시글 작성
      </h1>
      <div class="flex gap-10">
        <div class="flex-1 max-w-[48rem] min-w-[18rem] mx-auto">
          <div class="mb-5">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">글 제목</label>
            <input type="text" id="first_name" v-model="title" placeholder="제목을 입력해주세요"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>

          <div class="grid md:grid-cols-4 gap-x-6">
            <div class="relative z-0 mb-6 col-span-2 w-full group">
              <label for="countries_disabled" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                주식종목
              </label>
              <select id="countries_disabled" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="article_stock">
                <option value="0" selected>--글의 주제와 연관된 주식종목--</option>
                <option v-for="stock in stockList" v-bind:key="stock" v-bind:value="stock.code">
                  {{ stock.name }}
                </option>
              </select>
            </div>
            <div class="relative z-0 mb-6 col-span-2 w-full group">
              <label for="countries_disabled" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                게시글 주제
              </label>
              <select id="countries_disabled" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="article_topic">
                <option value="0">--글의 주제--</option>
                <option value="discussion">종목토론</option>
                <option value="general">일반</option>
              </select>
            </div>
          </div>

          <label for="pre_script"
                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">내용</label>
          <editor-content :editor="editor"
                          class="block mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:border focus:border-blue-500 focus:ring-blue-500  dark:bg-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

          <button v-on:click="submitArticle"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Cookies from "js-cookie";
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";


axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  components: {
    EditorContent
  },

  watch: {
    p_pre_script: function (newVal) {
      this.editor.commands.setContent(newVal)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.p_pre_script,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
      extensions: [
        Document,
        Paragraph,
        Text,
        Placeholder.configure({
          placeholder: '내용을 채워주세요',
        }),
        HardBreak,
        HorizontalRule,
      ]
    })

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

  beforeDestroy() {
    this.editor.destroy()
  },

  data() {
    return {
      title: "",
      editor: null,

      stockList: [
        {
          name: '삼성전자',
          code: '005930',
          market: 'KOSPI',
        },
        {
          name: 'SK하이닉스',
          code: '000660'
        }
      ],

      article_stock: "0",
      article_topic: "0",
    }
  },


  methods: {
    submitArticle() {
      const data = {
        stock_code: this.article_stock,
        title: this.title,
        content: this.editor.getHTML(),
        topic: this.article_topic // "discussion" or "general"
      }
      console.log(data);

      axios.post('/api/article', data)
        .then(() => { // 성공시에 200, 실패하면 400번대로
          this.$router.push({ name: 'ArticleList' });
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>

<style lang="scss">
button {
  line-break: nowrap;
}

/* Basic editor styles */
.ProseMirror {
  padding: 1rem;
  border: 1px solid #4b5563;
  border-radius: 0.5rem;
  height: 100%;

  >hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

@media (prefers-color-scheme: dark) {
  .ProseMirror {
    border-color: rgb(107 114 128);
  }
}

/* Basic editor styles */

/* Placeholder (at the top) */

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #6B7280;
  pointer-events: none;
  height: 0;
}

hr.ProseMirror-selectednode {
  border-top: 1px solid #68CEF8;
}

#defaultModal {
  background: rgba($color: #000000, $alpha: 0.5);
}

.pr {
  color: orange;
}
.te {
  color: deepskyblue;
}
.tr {
  color: lightgreen;
}
</style>