<template>
  <div class="all">
    <page-header></page-header>
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
  </div>
</template>

<script>
import PageHeader from '../header/PageHeader'
import register from '../home/register'
import login from '../home/login'
export default {
  name: 'Home',
  data () {
    return {
      tabs: ['#login', '#register'],
      tabIndex: 1
    }
  },
  components: {
    PageHeader, register, login
  },
  mounted () {
    setTimeout(() => {
      this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.hash)
    }, 100)
  }
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
