<template>
  <div id="registerPage">
    <div>
      <div class="box_text">
        <div class="text">
          <p>
            اگر مشتری بانک آینده باشید به سهولت میتوانید به صندوق‌های
            سرمایه‌گذاری دسترسی داشته باشید
          </p>
        </div>
      </div>
      <div id="signUpS1">
        <div class="option" @click.prevent= "goToWithAccount">
          <div class="d-flex justify-content-between">
            <img src="@/assets/img/MaskGroup.png" alt="" />
            <span >حساب بانک آینده دارم</span>
          </div>
        </div>
        <div class="option" @click.prevent= "goToWithoutAccount">
          <div class="d-flex justify-content-between">
            <img src="@/assets/img/smartphone.png" alt="" />
            <span>ورود با شماره تلفن</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import generalService from "@/services/generalService"
  import sharedService from "@/services/sharedService"
  export default {
    name: "register",
    data() {
      return {
      }
    },
    beforeUpdate () {
      sharedService.handleInputLabels()
      sharedService.checkInputs()
      sharedService.toggleMenu()
    },
    methods: {
      goToWithoutAccount(){
        this.$emit("goToWithoutAccount", true)
      },
      goToWithAccount(){
         this.$emit("goToWithAccount", true)
      }
    }
  }
</script>
<style scoped>
</style>
