<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <h1 class="centerHeading">صندوق‌های سرمایه‌گذاری</h1>
          <div class="row">
            <box-component v-for= "fund in funds" v-bind:key="fund.id" v-on:goToBoxDetail="goToBoxDetail(fund.id)" v-bind:fund="fund"></box-component>
          </div>
        </div>
      </div>
    </div>
    <!-- Main -->
  </div>
</template>

<script>
import service from '@/services/generalService'
import PageHeader from '../header/PageHeader'
import BoxComponent from './BoxComponent'

// import { debuglog } from 'util'
export default {
  name: 'detailList',
  data: function () {
    return {
      wholeResponse: [],
      get_founds_url: 'invest/fund',
      funds: []
    }
  },
  mounted () {
    this.getFunds()
  },
  methods: {
    getFunds () {
      service.getMethod('invest/fund')
        .then(response => {
          this.funds = response.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    goToBoxDetail: function (id) {
      this.$router.push('/detail/' + id)
    }
  },
  components: {
    PageHeader, BoxComponent
  }
}
</script>

<style scoped>

</style>
