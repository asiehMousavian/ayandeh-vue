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
    <form>
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
          <span class="format_inp">hint</span>
          <i class="placeholder">شماره حساب</i>
          <i class="line"></i>
        </div>
      </div>
      <div class="d-flex">
        <submit-button v-bind:buttonTitle="registerButton" v-on:submit="register"></submit-button>
      </div>
    </form>

    <div>
      <b-modal id="resultModal" title="نتیجه" hide-header size="lg">
        <container>
          <p style="text-align:left">{{result}}</p>
        </container>
        <div slot="modal-footer">
          <b-button class="btn" @click="closeModal">بستن</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import FormInput from '../share/FormInput'
import submitButton from '../share/submitButton'
import generalService from '@/services/generalService'

export default {
  name: 'register',
  data () {
    return {
      registerButton: 'ورود به پیشخوان',
      account: '',
      result: ''
    }
  },
  components: {
    submitButton,
    FormInput
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
                this.result = 'ثبت نام با موفقیت انجام شد'
              }
            })
            .catch(error => {
              this.result = error.response.data.message
            })
          this.$bvModal.show('resultModal')
        } else {

        }
      })
    },
    closeModal: function () {
      this.$bvModal.hide('resultModal')
    }
  }
}
</script>

<style scoped>
.form-alert {
  left: 0;
  background-color: #f2f2f2;
}
.format_inp {
  display: block;
  color: #666;
  font-size: 13px;
  position: absolute;
  right: 0;
}
</style>
