<template>
  <div class="all">
    <page-header></page-header>
    <!-- <loading :active.sync="isLoading"></loading> -->

    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
              <div class="box">
                <div class="box_tab">
                  <div>
                    <b-tabs v-model="tabIndex">
                      <b-tab id="login" title="ورود" title-item-class="mytab">
                        <login></login>
                      </b-tab>
                      <b-tab id="register" title="ثبت نام" title-item-class="mytab">
                        <register></register>
                      </b-tab>
                    </b-tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main -->
    <!-- Small Menu -->
    <div class="small_menu">
      <a href="javascripts:void(0)" class="small_menu_close">
        <img src="@/assets/img/close.png" alt="">
      </a>
      <span class="small_menu_t">منوی دسترسی</span>
      <ul class="list-unstyled">
        <li>
          <a href="#">صندوق‌های سرمایه‌گذاری</a>
        </li>
        <li>
          <a href="#">همکاران ما</a>
        </li>
        <li>
          <a href="#">درباره ما</a>
        </li>
        <li>
          <a href="#">تماس با ما</a>
        </li>
      </ul>
    </div>
    <!-- Small Menu -->
    <!-- Filter Body -->
    <div class="filter_body"></div>
    <!-- Filter Body -->
  </div>
</template>

<script>
import PageHeader from '../header/PageHeader'
import register from '../home/register'
import login from '../home/login'
import sharedService from '@/services/sharedService'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Home',
  data () {
    return {
      tabIndex: 0
      // isLoading: true
    }
  },
  components: {
    PageHeader, register, login, Loading
  },
  mounted () {
    // setTimeout(() => {
    //   this.isLoding=false
    // }, 1000)
    // setTimeout(() => {
    //   this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.path)
    // }, 100)
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  },
 
  // beforeCreate () {
  //   setTimeout(() => {
  //     this.isLoading = false
  //   }, 1000)
  // }

}
</script>

<style lang="css">
  .box_tab ul {
    border-bottom: 2px solid #dee2e6;
    border-radius: 8px 8px 0 0;
  }
  .box_tab .mytab{
    width: 50%;
  }
  .box_tab .mytab a{
    display: block;
    height: 68px;
    line-height: 68px;
    text-align: center;
    color: #000;
    font-family: "Iransans_Medium";
    font-size: 24px;
    padding: 0;
    border: none;
  }
  .box_tab .mytab .active{
    background-color: transparent;
    position: relative;
  }
  .box_tab .mytab .active:before{
    display: block;
    content: '';
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: -1px;
    right: 0;
    z-index: 100;
    background-color: #7d4434;
  }
  @media only screen and (max-width: 991px){
    .box_tab .mytab a{
      height: 55px;
      line-height: 55px;
      font-size: 18px;
    }
  }
  @media only screen and (max-width: 414px){
    .box_tab .mytab a{
      height: 45px;
      line-height: 45px;
      font-size: 15px;
    }
  }
</style>
