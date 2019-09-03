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
                <!-- <a href="" @click.prevent="showComponent('turnover')">گردش حساب</a> -->
<!--                <a href="" @click.prevent="showComponent('accounting')">گردش حساب</a>-->
              </li>
              <li>
                <a href="#" @click.prevent="goToUserProfile()">اطلاعات کاربر</a>
              </li>
              <li>
                <a href="#" @click="showModal('descModal')" >توضیحات صندوق</a>
              </li>
              <li>
                <a href="#" @click="showModal('sodoorModal')">صدور واحد</a>
              </li>
              <li>
                <a href="#" @click="showModal('ebtalModal')">ابطال واحد</a>
              </li>
            </ul>
          </div>
          <div v-if="currentComponent == 'requestReport'">
            <request-report v-bind:fund="fund"></request-report>
          </div>
          <div v-else-if="currentComponent == 'turnover'">
            <turnover></turnover>
          </div>
           <div v-else-if="currentComponent == 'accounting'">
            <accounting></accounting>
           </div>
          <div>
            <b-modal id="descModal" title="BootstrapVue" hide-header size="lg" >
                <fund-description></fund-description>
              <div slot="modal-footer">
                <button class="btn" @click="closeModal('descModal')">بستن</button>
              </div>
            </b-modal>
          </div>
          <div>
            <b-modal id="sodoorModal" title="BootstrapVue" hide-header size="lg" hide-footer>
                <issue-unit v-bind:fund="fund" @exit="closeModal('sodoorModal')"  @purchase="$bvModal.show('innerSodoorModal')"></issue-unit>
            </b-modal>
          </div>
          <div>
            <b-modal id="innerSodoorModal" title="BootstrapVue" hide-header size="lg"  hide-footer>
                <inner-sodoor @exit="closeModal('innerSodoorModal')" ></inner-sodoor>
            </b-modal>
          </div>
           <div>
            <b-modal id="ebtalModal" title="BootstrapVue" hide-header size="lg" hide-footer>
                <ebtal-unit v-bind:fund="fund" @exit="closeModal('ebtalModal')"></ebtal-unit>
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
      isDone: false
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
    showModal(modalId){
      //v-b-modal.descModal
       let logged = this.$session.get('isLogged')
      if (logged) { 
        if(modalId =="sodoorModal")
        {
          if(this.getUserValidate())
          {
            this.$bvModal.show(modalId)
          }
        }
        else
          this.$bvModal.show(modalId)
      }
    },
    showComponent(componentName) {
      this.currentComponent = componentName
      this.$session.set('currentComponent', this.currentComponent)
    },
    goToUserProfile() {
      this.$router.push('/user')
      this.$session.set('currentComponent', 'requestReport')
    },
    closeModal (modalId) {
      this.$bvModal.hide(modalId)
    },
    getFunds () {
      service.getMethod('invest/fund/' + this.fundId)
        .then(response => {
          this.fund = response.content
          this.isDone = true
          this.$session.set('currentFund',JSON.stringify(this.fund))
        })
        .catch(error => {
          console.log(error)
          this.isDone = true
        })
    },
    getCurrentComponent(){
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
            this.$session.set('userLicense', this.userLicense)
          }
        })
        .catch(error => {
          this.$session.set('userLicense', this.userLicense)
          if (error.response.data) {
            if (error.response.data.message) {
              // this.canInvokeMsg = error.response.data.message
            } else {
              // this.canInvokeMsg = 'در حال حاضر قادر به انجام این کار نمی باشید'
            }
          }
        })
    },
    getUserValidate()
    {
        service.getMethod("invest/user/validate")
        .then(response => {
          if (response.status === 0) {
            debugger
            if(response.content === true)
              return true
            else
              return false
          }
        })
        .catch(error => {
        debugger
        })
    }
  },
  mounted: function () {
    this.isDone = false
    this.fundId = this.$route.params.fundId
    this.getFunds()
    this.getLicense()
    this.getCurrentComponent()
  }
}
</script>

<style scoped>

/*  .btn.btn-cancel {
    border: none;
  }
   .active {
      background-color: #5c3226;
  } */

</style>
