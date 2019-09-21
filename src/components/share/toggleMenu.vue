<template>
  <div class="div">
    <!-- Small Menu -->
    <div class="small_menu">
      <a href="javascripts:void(0)" class="small_menu_close">
        <img src="@/assets/img/close.png" alt="">
      </a>
      <span class="small_menu_t">منوی دسترسی</span>
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
    <!-- Small Menu -->
    <!-- Filter Body -->
    <div class="filter_body"></div>
    <!-- Filter Body -->
  </div>
</template>
<script>
export default {
  name: 'toggleMenu',
  methods: {
    goToDetailList () {
      this.$router.push('/detailList')
    }
  }
}

</script>

<style scoped>

</style>
