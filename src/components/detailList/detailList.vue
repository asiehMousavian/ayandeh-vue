<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main" v-if="isDone">
      <div class="mainarea">
        <div class="container">
          <h1 class="centerHeading">صندوق‌های سرمایه‌گذاری</h1>
          <div class="row">
            <box-component v-for= "fund in funds" v-bind:key="fund.id" v-on:goToBoxDetail="goToBoxDetail(fund.id)" v-bind:fund="fund"></box-component>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- Main -->
    <!-- Mobile Menu -->
    <toggleMenu></toggleMenu>
    <!-- Mobile Menu -->
  </div>
</template>

<script>
import service from '@/services/generalService'
import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
import BoxComponent from './BoxComponent'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'detailList',
  data: function () {
    return {
      wholeResponse: [],
      get_founds_url: 'invest/fund',
      funds: [],
      isLoading: true,
      isDone: false
    }
  },
  components: {
    PageHeader, BoxComponent, toggleMenu, Loading
  },
  mounted: function () {
    // if (!this.getLocalItem()) {
    //   this.getFunds()
    // }
    service.getMethod('invest/fund')
      .then(response => {
        this.funds = response.content
        this.isDone = true
        // this.setLocalItem()
      })
      .catch(error => {
        console.log(error)
        this.isDone = true
      })
  },
  methods: {
    // getFunds () {
    //   service.getMethod('invest/fund')
    //     .then(response => {
    //       this.funds = response.content
    //       // this.setLocalItem()
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    goToBoxDetail: function (id) {
      this.$router.push('/detail/' + id)
    }
    // getLocalItem () {
    //   let mySession = localStorage.getItem('item')
    //   if (mySession) {
    //     this.funds = JSON.parse(mySession)
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    // setLocalItem () {
    //   localStorage.setItem('item', JSON.stringify(this.funds))
    // }
  }
}
</script>

<style scoped>

</style>
