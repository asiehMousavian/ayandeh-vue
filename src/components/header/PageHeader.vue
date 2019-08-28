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
              <span class="login_link">
                {{name}}
                <img src="@/assets/img/avatar.svg" alt="" v-if="name">
              </span>
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
import { debuglog } from 'util'
export default {
  name: 'PageHeader',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    goToDetailList: function () {
      this.$router.push('/detailList')
    }
  },
  mounted () {
    // if (this.$session.has('clientName')) {
    //   let clientname = this.$session.get('clientName')
    //   if (clientname) {
    //     this.name = clientname
    //   }
    // }


    if (this.$session.has('clientInfo')) {
      let client = this.$session.get('clientInfo')
      if (client) {
        let user=JSON.parse(client)
        this.name = user.firstName + ' ' + user.lastName
      }
    }
  }
}
</script>

<style scoped>

</style>
