<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <h1 class="centerHeading">صندوق‌های سرمایه‌گذاری</h1>
          <div class="row">
            <box-component v-for="found in founds" :key="found.id" :found="found"></box-component>
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
export default {
  name: 'detailList',
  data () {
    return {
      wholeResponse: [],
      get_founds_url: 'invest/fund',
      founds: []
      // funds: [
      //   {
      //     boxImage: '@/assets/images/gostaresh.png',
      //     boxTitle: 'صندوق سرمایه گذاری گسترش فردای ایرانیان',
      //     boxText: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.\n' +
      //     '                          چاپگرها و متون بلکه\n' +
      //     ' روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد',
      //     unitNumber: 132,
      //     fundNumber: 132
      //   },
      //   {
      //     boxTitle: 'salam',
      //     boxText: 'salaaaaaaam',
      //     unitNumber: 132,
      //     fundNumber: 132
      //   },
      //   {
      //     boxTitle: 'salam',
      //     boxText: 'salaaaaaaam',
      //     unitNumber: 132,
      //     fundNumber: 132
      //   }
      // ]
    }
  },
  methods: {
    getFunds () {
      service.getMethod(this.get_founds_url)
        .then(response => {
          this.founds = response.content
          return response.content
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    PageHeader, BoxComponent
  }
}
</script>

<style scoped>

</style>
