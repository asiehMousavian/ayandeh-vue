<template>
  <div class="all">
    <page-header></page-header>

    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
              <div class="box" id="homePage">
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
    <!-- Mobile Menu -->
    <toggleMenu></toggleMenu>
    <!-- Mobile Menu -->
  </div>
</template>
<script>
import PageHeader from '../header/PageHeader'
import register from '../home/register'
import login from '../home/login'
import toggleMenu from '../share/toggleMenu'
import sharedService from '@/services/sharedService'

export default {
  name: 'Home',
  data () {
    return {
      tabIndex: 0
    }
  },
  components: {
    PageHeader, register, login, toggleMenu
  },
  mounted () {
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  }
}
</script>

<style lang="css">
  /* .box_tab ul {
    border-bottom: 2px solid #dee2e6;
    border-radius: 8px 8px 0 0;
  } */
</style>
