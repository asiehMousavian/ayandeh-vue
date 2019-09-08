<template>
  <!-- Header -->
  <header id="header">
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-7">
            <div class="d-flex">
              <div id="logo">
                <a href="#" class="logo" @click.prevent="goToDetailList">
                  <img src="@/assets/img/logo.png" alt="">
                </a>
              </div>
              <div id="menu">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" @click.prevent="goToDetailList">صندوق‌های سرمایه‌گذاری</a>
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
              <div class="toggle_menu">
                  <span class="toggle_menu_ic">
                      <i></i>
                      <i></i>
                      <i></i>
                  </span>
                منو
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-5 d-flex">
            <div class="d-flex align-items-center mr-auto">
              <div class="login_link">
                <div class="login_link_t d-flex align-items-center">
                  <img src="@/assets/img/arrow_down.svg" alt="" class="login_link_arrow ml-auto" v-if="name">
                  <span style="margin: 0 4px;">{{name}}</span>
                  <img src="@/assets/img/avatar.svg" alt="" v-if="name" class="login_link_pic mr-auto">
                </div>
                <div class="login_link_box">
                  <ul class="list-unstyled">
                    <li>
                      <a href="#" @click.prevent="goToUserProfile">اطلاعات کاربر</a>
                    </li>
                    <li>
                      <a href="#" @click.prevent="logout" class="logout">
                        <img src="@/assets/img/logout.svg" alt="">
                        خروج از حساب
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- <a href="/" class="login_link"> -->
              <!-- {{name}} -->
              <!-- <a href="/login" class="login_link">ورود</a>/ <a href="/register" class="login_link">عضویت</a> -->
                <!-- <img src="@/assets/img/avatar.svg" alt=""> -->
              <!-- </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header -->

</template>
<script>
import sharedService from '../../services/sharedService'

export default {
  name: 'PageHeader',
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    // if (this.$session.has('clientName')) {
    //   let clientname = this.$session.get('clientName')
    //   if (clientname) {
    //     this.name = clientname
    //   }
    // }
    sharedService.loginBox()
    sharedService.closeLoginBox()
    if (this.$session.has('clientInfo')) {
      let client = this.$session.get('clientInfo')
      if (client) {
        let user = JSON.parse(client)
        this.name = user.firstName + ' ' + user.lastName
      }
    }
    if (this.name === 'null null') {
      this.name = 'کاربر جدید'
    }
  },
  methods: {
    goToDetailList: function () {
      this.$router.push('/detailList')
    },
    goToUserProfile: function () {
      this.$router.push('/user')
    },
    logout: function () {
      this.$session.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
