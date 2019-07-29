<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <h1 class="centerHeading">صندوق‌های سرمایه‌گذاری</h1>
          <div class="row">
            <box-component v-for= "fund in funds" v-bind:key="fund.id" v-on:goToBoxDetail="goToBoxDetail(fund.id)" v-bind:boxImage="fund.boxImage" v-bind:boxTitle="fund.boxTitle" v-bind:boxText="fund.boxText" v-bind:fundNumber="fund.fundNumber" v-bind:unitNumber="fund.unitNumber"></box-component>
          </div>
        </div>
      </div>
    </div>
    <!-- Main -->
  </div>
</template>

<script>
import PageHeader from '../header/PageHeader'
import BoxComponent from './BoxComponent'
export default {
  name: 'detailList',
  data () {
    return {
      funds: [
        {
          id:'box1',
          boxImage: '@/assets/images/gostaresh.png',
          boxTitle: 'صندوق سرمایه گذاری گسترش فردای ایرانیان',
          boxText: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.\n' +
          '                          چاپگرها و متون بلکه\n' +
          ' روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد',
          unitNumber: 132,
          fundNumber: 132
        },
        {
          id:'box2',
          boxTitle: 'salam',
          boxText: 'salaaaaaaam',
          unitNumber: 132,
          fundNumber: 132
        },
        {
          id:'box3',
          boxTitle: 'salam',
          boxText: 'salaaaaaaam',
          unitNumber: 132,
          fundNumber: 132
        }
      ]
    }
  },
  components: {
    PageHeader, BoxComponent
  },
  methods:{
    goToBoxDetail:function(id)
    {
      this.$router.push("/detail/"+id)
    }
  }
}
</script>

<style scoped>

</style>
