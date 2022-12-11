<template>
  <div>
    <div class="max-w-[64rem] mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-5 pb-5
						border-gray-600 border-b ">
        {{ title }}
      </h1>
      <div class="flex mb-5">
        <div class="flex-1 min-w-[18rem] mx-auto flex flex-col gap-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">내용</label>
          <editor-content :editor="editor"
                          class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:border focus:border-blue-500 focus:ring-blue-500  dark:bg-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>
      <div id="toolbar">
        <router-link to="/board">
          <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
            목록으로
          </button>
        </router-link>
        <button type="button" v-on:click="deleteArticle" v-if="writer === $store.getters.getUserId ||
          $store.getters.getPermission ===
          2 ||
          $store.getters.getUserId==='leejh9226'"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
          삭제
        </button>
      </div>
      <div id="comment-container" class="mt-5 pt-5 border-gray-600 border-t flex flex-col gap-5">
        <label class="block text-sm font-medium text-gray-900 dark:text-gray-400">댓글</label>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" v-model="comment"
                 class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="댓글을 입력하세요" required>
          <button v-on:click="addComment"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            등록
          </button>
        </div>

        <div id="prev-comment">
          <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:pb-4" v-for="cmt in commentList" v-bind:key="cmt">
              <div class="flex items-center space-x-4">
                <div class="min-w-0 border-r-2 border-gray-300 px-4">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {{ cmt.user_id }}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {{ cmt.date }}
                  </p>
                  <p v-if="cmt.userId === $store.getters.getUserId" v-on:click="deleteComment(cmt.commentIdx)">
                    <i class="fa-solid fa-x text-red-900"></i>
                  </p>
                </div>
                <div class="flex-1 items-center text-base font-semibold text-gray-900 dark:text-white">
                  {{ cmt.content }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Editor, EditorContent} from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import axios from "axios";

export default {
  name: "ArticleViewerPage",

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
      content: this.article_content,
      editable: false,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
      extensions: [
        Document,
        Paragraph,
        Text,
        HardBreak,
        HorizontalRule,
      ]
    })

    axios.get('/api/article/' + this.$route.params.articleIdx)
      .then(response => {
        this.title = response.data.title
        this.article_content = response.data.content
        this.editor.commands.setContent(this.article_content)
        this.view_count = response.data.view_count
      })
      .catch(error => {
        console.log(error)
      })

    this.getCommentList()
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  data() {
    return {
      editor: null,

      title: "dummy",
      article_content: "dummy",
      view_count: 0,
      writer: "dummy",

      comment: "",

      commentList: [
          {
            userId: 1,
            commentIdx: 1,
            user: "dummy",
            content: "dummy",
            date: "2022-01-01"
          }
      ]
    }
  },

  methods: {
    addComment() {
      axios.post('/api/comment', {
        articleIdx: this.$route.params.articleIdx,
        comment: this.comment
      })
        .then(res => {
          console.log(res)
          this.getCommentList()
        })
        .catch(error => {
          alert("댓글 등록에 실패했습니다.")
          console.log(error)
        })
    },

    deleteComment(commentIdx) {
      axios.delete('/api/comment/' + commentIdx)
        .then(res => {
          console.log(res)
          this.getCommentList()
        })
        .catch(error => {
          alert("댓글 삭제에 실패했습니다.")
          console.log(error)
        })
    },

    getCommentList() {
      axios.get('/api/comment/' + this.$route.params.articleIdx)
          .then(response => {
            this.commentList = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    deleteArticle() {
      axios.delete('/api/article/' + this.$route.params.articleIdx)
          .then(() => {
            alert("게시글이 삭제되었습니다.")
            this.$router.push('/board')
          })
          .catch(error => {
            alert("게시글 삭제에 실패했습니다.")
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