<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id= "main" role="main" v-if= "isDone">
      <banner v-bind:fund="fund"></banner>
      <div class= "mainarea">
        <div class= "container">
          <div v-if= "showUserAlert">
            <div class= "userAlert" v-if= "!isUserVerified">
                <div class= "d-flex align-items-center justify-content-between">
                  <div class= "closeContainer" @click.prevent="closeAlert()">
                    <img class="" src="@/assets/img/close.png" alt="">
                  </div>
                  <div class="msgContainer">
                    <p>اطلاعات کاربری شما کامل نمی‌باشد. لطفا برای کامل کردن اطلاعات اقدام کنید</p>
                  </div>
                </div>
                <div class="btnContainers">
                      <button class="btn" @click.prevent= "goToAuthentication()">شرایط احراز هویت</button>
                      <button class="btn" @click.prevent= "goToUserProfile()">کامل کردن اطلاعات</button>
                </div>
            </div>
        </div>
          <div class="detail_btn">
            <ul class="list-unstyled">
              <li>
                <a href="#" @click.prevent= "showComponent('requestReport')" >گزارش درخواست‌ها</a>
              </li>
              <li>
                <!-- <a href="#" @click.prevent= "showComponent('accounting')">گردش حساب</a> -->
                <a href="" @click.prevent="showComponent('turnover')">گردش حساب</a>
              </li>
              <li>
                <a href="#" @click.prevent= "goToUserProfile()">اطلاعات کاربر</a>
              </li>
              <li>
                <a href="#" @click.prevent= "showModal('descModal')" >توضیحات صندوق</a>
              </li>
              <li>
                <a href="#" @click.prevent= "showModal('sodoorModal')">صدور واحد</a>
              </li>
              <li>
                <a href="#" @click.prevent= "showModal('ebtalModal')"  v-bind:class= "{'disableButton' : !isUserVerified}">ابطال واحد</a>
              </li>
            </ul>
          </div>
          <div v-if= "currentComponent == 'requestReport'">
            <request-report v-bind:fund= "fund"></request-report>
          </div>
          <div v-else-if= "currentComponent == 'turnover'">
            <turnover></turnover>
          </div>
           <div v-else-if= "currentComponent == 'accounting'">
            <accounting></accounting>
           </div>
          <div>
            <b-modal id="descModal" title="BootstrapVue" hide-header size="lg" @hidden= "resetModal('descModal')">
                <fund-description v-bind:desTabIndex= "desTabIndex"></fund-description>
              <div slot="modal-footer">
                <button class="btn" @click= "closeModal('descModal')">بستن</button>
              </div>
            </b-modal>
          </div>
          <div>
            <b-modal id="sodoorModal" title="BootstrapVue" hide-header size="lg" hide-footer>
                <issue-unit @exit= "closeModal('sodoorModal')"  @purchase= "$bvModal.show('innerSodoorModal')"></issue-unit>
            </b-modal>
          </div>
          <div>
            <b-modal id="innerSodoorModal" title="BootstrapVue" hide-header size="lg"  hide-footer>
                <inner-sodoor @exit= "closeModal('innerSodoorModal')"></inner-sodoor>
            </b-modal>
          </div>
           <div>
            <b-modal id= "ebtalModal" title= "BootstrapVue" hide-header size="lg" hide-footer>
                <ebtal-unit v-bind:fund= "fund" @exit= "closeModal('ebtalModal')"></ebtal-unit>
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
import accounting from './accounting'
import fundDescription from './fundDescription'
import issueUnit from './issueUnit'
import innerSodoor from './innerSodoor'
import turnover from './turnOver'
import service from '@/services/generalService'
import sharedService from '@/services/sharedService'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import ebtalUnit from './ebtalUnit'
export default {
  name: 'Detail',
  data () {
    return {
      currentComponent: 'requestReport',
      fund: {},
      fundId: 0,
      userLicense: {},
      isLoading: true,
      isDone: false,
      isUserVerified:false,
      showUserAlert:true,
      desTabIndex:0,
      userStatus:''
    }
  },
  components: {
    PageHeader,
    Banner,
    requestReport,
    fundDescription,
    issueUnit,
    innerSodoor,
    turnover,
    toggleMenu,
    Loading,
    accounting,
    ebtalUnit
  },
  methods: {
    resetModal (modal) {
      // modal.preventDefault()
    },
    showModal (modalId) {
      // v-b-modal.descModal
      let logged = this.$session.get('isLogged')
      if (logged) {
        if (modalId === 'ebtalModal') {
          if (this.isUserVerified) { this.$bvModal.show(modalId) }
          return
        }
        if (modalId === 'sodoorModal') {
          if (this.isUserVerified) { this.$bvModal.show(modalId) } else { this.goToUserProfile() }
          return
        }
        if (modalId === 'descModal') {
          this.desTabIndex = 0
          this.$bvModal.show(modalId)
        }
      }
    },
     closeModal (modalId) {
      this.$bvModal.hide(modalId)
    },
    closeAlert () {
      this.showUserAlert = false
    },
    showComponent (componentName) {
      this.currentComponent = componentName
      this.$session.set('currentComponent', this.currentComponent)
    },
    goToAuthentication () {
      this.desTabIndex = 1
      this.$bvModal.show('descModal')
    },
    goToUserProfile () {
      this.$router.push('/user')
    },
   
    getCurrentFund () {
      service.getMethod('invest/fund/' + this.fundId)
        .then(response => {
          this.fund = response.content
          this.$session.set('currentFund', JSON.stringify(this.fund))
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCurrentComponent () {
      let savedComponent = this.$session.get('currentComponent')
      if (savedComponent == null) {
        this.$session.set('currentComponent', this.currentComponent)
      } else {
        this.currentComponent = savedComponent
      }
    },
    getLicense () {
      service.getMethod(`invest/fund/license/${this.fundId}`)
        .then(response => {
          if (response.status === 0) {
            this.userLicense = response.content
            debugger
            this.$session.set('userLicense', this.userLicense)
          }
          this.isDone = true
        })
        .catch(error => {
            debugger

          this.isDone = true
          if (error.response.data) {
            if (error.response.data.message) {
              // this.canInvokeMsg = error.response.data.message
            } else {
              // this.canInvokeMsg = 'در حال حاضر قادر به انجام این کار نمی باشید'
            }
          }
        })
    },
    getUserValidate () {
      service.getMethod('invest/user/validate')
        .then(response => {
          if (response.status === 0) {
            if (response.content === true) { this.isUserVerified = true } // else { return false }
          }
        })
        .catch(error => {
        console.log(error)
        })
    },
    getUserStatus()
    {
      // let user=JSON.parse(localStorage.getItem('userInfoData'))
      let client = localStorage.getItem('userData')
      if (client) {
        let user = JSON.parse(client)
        this.userStatus = user.registerStatus
      }
    }
  },
  beforeUpdate () {
    sharedService.toggleMenu()
  },
  beforeRouteLeave (to, from, next) {
    this.$session.set('currentComponent', 'requestReport')
    next()
  },
  mounted: function () {
    this.isDone = false
    this.fundId = this.$route.params.fundId
    this.getCurrentFund()
    this.getUserValidate()
    this.getLicense()
    this.getCurrentComponent()
    this.getUserStatus()
  }
}
</script>

<style scoped>

</style>
