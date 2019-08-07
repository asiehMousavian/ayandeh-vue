<template>
  <div class="banner" v-bind:style="{'background-image': 'url(' +require('@/assets/img/banner.jpg') + ')' }">
    <div class="banner_desc">
      <div class="banner_desc_body">
        <div class="banner_desc_body--d" v-bind:style="{'background-image': 'url(' +require('@/assets/img/banner.jpg') + ')' }">
        </div>
        <div class="banner_desc_body--b">
          <div class="container">
            <div class="d-flex" style="width: 100%">
              <img src="@/assets/img/gostaresh.png" alt="">
              <div class="banner_desc_body--text" style="width: 100%">
                <h3 class="banner_desc_body--t">{{fund.name}}</h3>
                <div class="d-flex">
                  <span class="ml-auto banner_desc_body--s">با مجور رسمی از سازمان بورس</span>
                  <span class="mr-auto banner_desc_body--date">تاریخ شروع فعالیت : {{fund.startDate}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['fund'],
  name: 'Banner'
}
</script>

<style scoped>

</style>
