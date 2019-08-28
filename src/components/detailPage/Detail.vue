<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main" v-if="isDone">
      <banner v-bind:fund="fund"></banner>
      <div class="mainarea">
        <div class="container" >
          <div class="detail_btn">
            <ul class="list-unstyled">
              <li>
                <a href="#" @click.prevent="showComponent('requestReport')" >گزارش درخواست‌ها</a>
              </li>
              <li>
                <a href="#" @click.prevent="showComponent('turnover')">گردش حساب</a>

              </li>
              <li>
                <a href="#" @click.prevent="goToUserProfile()">اطلاعات کاربر</a>
              </li>
              <li>
                <a href="#" v-b-modal.descModal>توضیحات صندوق</a>
              </li>
              <li>
                <a href="#" v-b-modal.sodoorModal>صدور واحد</a>
              </li>
              <li>
                <a href="#" data-toggle="modal" data-target="#ebtalModal">ابطال واحد</a>
              </li>
            </ul>
          </div>
          <div v-if="currentComponent === 'requestReport'">
            <request-report v-bind:fund="fund"></request-report>
          </div>
          <div v-else-if="currentComponent === 'turnover'">
            <turnover></turnover>
          </div>
<!--          <div>-->
<!--            <component :is="currentComponent"></component>-->
<!--          </div>-->
          <div>
            <b-modal id="descModal" title="BootstrapVue" hide-header size="lg">
              <container>
                <fund-description></fund-description>
              </container>
              <div slot="modal-footer">
                <b-button class="btn" @click="closeModal">بستن</b-button>
              </div>
            </b-modal>
          </div>
          <div>
            <b-modal id="sodoorModal" title="BootstrapVue" hide-header size="lg">
              <container>
                <issue-unit></issue-unit>
              </container>
              <div slot="modal-footer">
                <a href="#" class="btn sodur_btn" v-b-modal.innerSodoorModal>صدور واحد</a>
                <b-button class="btn btn-cancel" @click="closeModal">لغو</b-button>
              </div>
            </b-modal>
          </div>
          <div>
            <b-modal id="innerSodoorModal" title="BootstrapVue" hide-header size="lg">
              <container>
                <inner-sodoor></inner-sodoor>
              </container>
              <div slot="modal-footer">
                <a @click="connectToBank" class="btn">اتصال به درگاه بانک</a>
                <b-button class="btn btn-cancel" @click="closeModal">انصراف</b-button>
              </div>
            </b-modal>
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

import toggleMenu from '../share/toggleMenu'
import PageHeader from '../header/PageHeader'
import Banner from '../share/Banner'
import requestReport from './requestReport'
import statement from './statement'
import fundDescription from './fundDescription'
import issueUnit from './issueUnit'
import innerSodoor from './innerSodoor'
import turnover from './turnOver'
import service from '@/services/generalService'
// eslint-disable-next-line no-unused-vars
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'Detail',
  data () {
    return {
      currentComponent: 'requestReport',
      fund: {},
      isLoading: true,
      isDone: false
    }
  },
  components: {
    PageHeader,
    Banner,
    requestReport,
    statement,
    fundDescription,
    issueUnit,
    innerSodoor,
    turnover,
    toggleMenu,
    Loading
  },
  methods: {
    showComponent: function (componentName) {
      this.currentComponent = componentName
      // localStorage.setItem('currentComponent', this.currentComponent)
    },
    goToUserProfile: function () {
      this.$router.push('/user')
    },
    closeModal: function () {
      this.$bvModal.hide('descModal')
      this.$bvModal.hide('sodoorModal')
      this.$bvModal.hide('innerSodoorModal')
    },
    connectToBank () {
      let baseUrl = window.location.origin // + '/#/'
      let paymentObj = {
        detail: 'string',
        price: 100000,
        redirectUrl: baseUrl + '/redirect' // `${baseUrl}/redirect`
      }
      service
        .postMethod('payment', paymentObj)
        .then(response => {
          if (response.message === 'OK' && response.status === 0) {
            window.location.href = response.content.redirectUrl
          }
        })
        .catch(error => {})
    },
    getFunds () {
      let fundID = this.$route.params.fundId
      service.getMethod('invest/fund/' + fundID)
        .then(response => {
          this.fund = response.content
          this.isDone = true
        })
        .catch(error => {
          console.log(error)
          this.isDone = true
        })
    }
  },

  mounted: function () {
    this.isDone = false
    if (this.currentComponent === 'requestReport') {
      this.getFunds()
    }
    let savedComponent = localStorage.getItem('currentComponent')
    if (savedComponent == null) {
      localStorage.setItem('currentComponent', this.currentComponent)
    } else {
      this.currentComponent = savedComponent
    }
  }
}
</script>

<style scoped>
  .btn.btn-cancel {
    border: none;
  }
  .active {
      background-color: #5c3226;
  }
</style>
