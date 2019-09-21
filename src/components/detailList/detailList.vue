<template>
  <div>
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

    <div>
      <b-modal id="alertModal" title="BootstrapVue" hide-header size="lg">
        <h3 class="modal_title">تکمیل اطلاعات کاربری</h3>
        <div class="modal_txt">
          <p style="text-align: right">
              اطلاعات کاربری شما ناقص است. لطفا برای کامل کردن اطلاعات اقدام کنید.
          </p>
        </div>
        <div slot="modal-footer">
          <button class="btn" @click= "goToUserProfile">کامل کردن اطلاعات</button>
          <button class="btn" @click= "goToAuthentication">شرایط احراز هویت</button>
          <button class="btn btn-cancel" @click= "$bvModal.hide('alertModal')">بعدا یادآوری کن</button>
        </div>
      </b-modal>
    </div>

    <div>
        <b-modal id="descModal" title="BootstrapVue" hide-header size="lg">
            <fund-description v-bind:desTabIndex = "1"></fund-description>
          <div slot="modal-footer">
            <button class="btn" @click= "closeDesModal()">بستن</button>
          </div>
        </b-modal>
      </div>


  </div>
</template>

<script>
import service from '@/services/generalService'
import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
import BoxComponent from './BoxComponent'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import fundDescription from '../detailPage/fundDescription'
import sharedService from '@/services/sharedService'

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
    PageHeader, BoxComponent, toggleMenu, Loading, fundDescription
  },
  beforeUpdate () {
    sharedService.toggleMenu()
  },
  mounted () {
    // if (!this.getLocalItem()) {
    //   this.getFunds()
    // }
    service.getMethod('invest/fund')
      .then(response => {
        this.funds = response.content
        this.isDone = true
        this.$bvModal.show('alertModal')
        // this.setLocalItem()
      })
      .catch(error => {
        console.log(error)
        this.isDone = true
        this.$bvModal.show('alertModal')
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
    },
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
    goToUserProfile () {
      this.$router.push('/user')
    },
    goToAuthentication()
    {
      this.$bvModal.hide('alertModal')
      this.$bvModal.show('descModal')
    },
    closeDesModal()
    {
      this.$bvModal.hide('descModal')
        this.$bvModal.show('alertModal')
    }
  }
}
</script>

<style scoped>

</style>
