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
                      <b-tab @click= "register" id= "register" title= "ثبت نام" title-item-class="mytab">
                        <register  v-if= "signupStep =='first'" @goToWithoutAccount= "signin" @goToWithAccount= "signinByAccount"></register>
                        <signInByAccount v-else-if= "signupStep=='withAccount'" @goToWithoutAccount= "signin" @goToWithAccount= "signinByAccount"></signInByAccount>
                        <signIn v-else-if= "signupStep == 'withoutAccount'" @goToWithoutAccount= "signin" @goToWithAccount= "signinByAccount"></signIn>
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
import signInByAccount from '../home/signInByAccount'
import signIn from '../home/signIn'
import login from '../home/login'
import toggleMenu from '../share/toggleMenu'
import sharedService from '@/services/sharedService'

export default {
  name: 'Home',
  data () {
    return {
      tabIndex: 0,
      signupStep:'first',
    }
  },
  components: {
    PageHeader, register, login, toggleMenu, signInByAccount, signIn
  },
  mounted () {
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  },
  methods:{
  signin(){
    this.signupStep= "withoutAccount"
  },
  signinByAccount(){
     this.signupStep= "withAccount"
  },
  register(){
    this.signupStep= "first"
  }
  }
}
</script>

<style lang="css">
  /* .box_tab ul {
    border-bottom: 2px solid #dee2e6;
    border-radius: 8px 8px 0 0;
  } */
</style>
