<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <banner v-bind:fund="fund"></banner>
      <div class="mainarea">
        <div class="container" >
          <div class="detail_btn">
            <ul class="list-unstyled">
              <li>
                <a href="#" @click.prevent="showComponent('requestReport')">گزارش درخواست‌ها</a>
              </li>
              <li>
                <a href="#" @click.prevent="showComponent('statement')">گردش حساب</a>
              </li>
              <li>
                <a href="" @click.prevent="goToUserProfile()">اطلاعات کاربر</a>
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
          <div>
<!--            <request-report></request-report>-->
            <component :is="currentComponent"></component>
          </div>
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
    <!-- Main -->
    <!-- Mobile Menu -->
    <toggleMenu></toggleMenu>
    <!-- Mobile Menu -->
  </div>
</template>

<script>
import PageHeader from '../header/PageHeader'
import Banner from '../share/Banner'
import toggleMenu from '../share/toggleMenu'
import requestReport from './requestReport'
import statement from './statement'
import fundDescription from './fundDescription'
import issueUnit from './issueUnit'
import innerSodoor from './innerSodoor'
import service from '@/services/generalService'
export default {
  name: 'Detail',
  data () {
    return {
      // fundtitle: 'صندوق سرمایه‌گذاری گسترش فردای ایرانیان',
      // fundtext: 'با مجور رسمی از سازمان بورس',
      // funddate: '94/4/21',
      currentComponent: 'requestReport',
      fund: {},
      isLoading: true,
      isDone: false
    }
  },
  methods: {
    showComponent: function (componentName) {
      // alert(componentName)
      this.currentComponent = componentName
    },
    goToUserProfile: function () {
      this.$router.push('/user')
    },
    closeModal: function () {
      this.$bvModal.hide('descModal')
      this.$bvModal.hide('sodoorModal')
      this.$bvModal.hide('innerSodoorModal')
    },
    connectToBank: function () {
      let baseUrl = window.location.origin // + '/#/'
      debugger
      let paymentObj =
      {
        detail: 'string',
        price: 100000,
        redirectUrl: baseUrl + '/redirect' // `${baseUrl}/redirect`
      }
      service.postMethod('payment', paymentObj).then(response => {
        if (response.message === 'OK' && response.status === 0) {
          window.location.href = response.content.redirectUrl
        }
      }).catch(error => {
        console.log()
      })
    }
  },
  components: {
    PageHeader, Banner, requestReport, statement, fundDescription, issueUnit, innerSodoor, toggleMenu
  },
  mounted () {
  }

}
</script>

<style scoped>
  .btn.btn-cancel{
    border: none;
  }
</style>
