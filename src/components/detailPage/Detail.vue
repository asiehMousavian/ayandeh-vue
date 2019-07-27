<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <banner v-bind:fundTitle="fundtitle" v-bind:fundText="fundtext" v-bind:fundDate="funddate"></banner>
      <div class="mainarea">
        <div class="container">
          <div class="detail_btn">
            <ul class="list-unstyled">
              <li>
                <a @click="showComponent('requestReport')" href="#">گزارش درخواست‌ها</a>
              </li>
              <li>
                <a @click="showComponent('statement')" href="#">گردش حساب</a>
              </li>
              <li>
                <a @click="showComponent('accountInfo')" href="#">اطلاعات کاربر</a>
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
                <a href="#" class="btn">اتصال به درگاه بانک</a>
                <b-button class="btn btn-cancel" @click="closeModal">انصراف</b-button>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <!-- Main -->
  </div>
</template>

<script>
import PageHeader from '../header/PageHeader'
import Banner from '../share/Banner'
import requestReport from './requestReport'
import statement from './statement'
import accountInfo from './accountInfo'
import fundDescription from './fundDescription'
import issueUnit from './issueUnit'
import innerSodoor from './innerSodoor'
export default {
  name: 'Detail',
  data () {
    return {
      fundtitle: 'صندوق سرمایه‌گذاری گسترش فردای ایرانیان',
      fundtext: 'با مجور رسمی از سازمان بورس',
      funddate: '94/4/21',
      currentComponent: 'requestReport'
    }
  },
  methods: {
    showComponent: function (componentName) {
      // alert(componentName)
      this.currentComponent = componentName
    },
    closeModal: function () {
      this.$bvModal.hide('descModal')
      this.$bvModal.hide('sodoorModal')
      this.$bvModal.hide('innerSodoorModal')
    }
  },
  components: {
    PageHeader, Banner, requestReport, statement, accountInfo, fundDescription, issueUnit, innerSodoor
  }
}
</script>

<style scoped>
  .btn.btn-cancel{
    border: none;
  }
</style>
