<template>
  <div>
    <div class="box_text">
      <div class="text">
        <p>
          اگر مشتری بانک آینده باشید به سهولت میتوانید به صندوق‌های
          سرمایه‌گذاری دسترسی داشته باشید
        </p>
      </div>
    </div>
    <form id="registerForm">
      <div class="form-group">
        <div class="inp_border">
          <input
            type="text"
            v-model="account"
            name="accountNumber"
            class="form-control"
            v-validate="'required|ayandeAccountNumber'"
          />
          <div class="form-alert">
            <p>{{ errors.first('accountNumber') }}</p>
          </div>
          <span class="format_inp">نمونه شماره حساب : 021586521485</span>
          <i class="placeholder">شماره حساب</i>
          <i class="line"></i>
        </div>
      </div>
      <div class="d-flex">
        <button :disabled = 'errors.any() || isComplete' type="button" class="btn mx-auto" @click.prevent="register">{{registerButton}}</button>
      </div>
    </form>
  </div>
</template>
<script>
// import FormInput from '../share/FormInput'
// import submitButton from '../share/submitButton'
import generalService from '@/services/generalService'
import sharedService from '@/services/sharedService'
export default {
  name: 'register',
  data () {
    return {
      registerButton: 'ورود به پیشخوان',
      account: '',
      result: ''
    }
  },
  computed: {
    isComplete () {
      this.$validator.validateAll().then(result => {
        return result
      })
    }
  },
  methods: {
    register: function () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let userInfo = {
            confirmPassword: '123',
            email: 'azade_khalili@yahoo.com',
            password: '123'
          }
          generalService
            .postMethod('auth/register', userInfo)
            .then(response => {
              if (response.status === 0 && response.message === 'OK') {
                sharedService.Done('ثبت نام با موفقیت انجام شد')
              }
            }).catch(error => {
              sharedService.Failed(error.response.data.message)
            })
        } else {
        }
      })
    }
  }
}
</script>

<style scoped>
  #registerForm .form-alert {
    left: 0;
    background-color: #fff;
  }
  #registerForm .format_inp {
    display: block;
    color: #575757;
    font-size: 15px;
    position: absolute;
    right: 0;
  }

  @media only screen and (max-width: 991px) {
   #registerForm .format_inp {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 567px) {
   #registerForm .format_inp {
      font-size: 10px;
    }
  }
</style>
