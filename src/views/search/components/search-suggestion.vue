<template >
  <div class="search-suggestion">
    <van-cell 
    icon="search"
     v-for="(text,index) in suggestions"
     :key="index"
     @click="$emit('search',text)"  
    >
   <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
     
  </div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
import { debounce } from 'lodash' //第三方包lodash
 

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
        suggestions:[]
    }
  },
  watch: {
    searchText: {
        handler:debounce(function(value){
            this.loadSearchSuggestions(value)
        },200),
    //   handler(value) {
    //     this.loadSearchSuggestions(value)
    //   },
      immediate: true
    }
  },
  methods:{
     async loadSearchSuggestions(q){
         try {
              const {data}=await  getSearchSuggestions(q)
            this.suggestions=data.data.options   
         } catch (err) {
             this.$toast('获取数据列表失败，请稍后重试')
         }
      },

      highlight(text){
        const highlightStr=`<span class="active">${this.searchText}</span>`
        const reg=new RegExp(this.searchText,'gi')
       return text.replace(reg,highlightStr)
      }
  }
}
</script>

<style lang="less" scoped>
     .search-suggestion{
    /deep/   span.active{
         color:#3296fa
       }
     }
</style>