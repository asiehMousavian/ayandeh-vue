<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div class="top_site d-flex">
            <h1 class="page-header ml-auto">ورود اطلاعات کاربر</h1>
            <a href="#" class="btn edit_btn mr-auto">
              <img src="@/assets/img/edit.svg" alt="">
              ویرایش اطلاعات
            </a>
          </div>
          <form class="user-details-form" action="">
            <div class="form-row-new">
              <h1 class="form-header">مشخصات عمومی</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="firstName" class="form-control" v-validate="'required|alpha'">
                      <div class="form-alert">
                        <p>{{ errors.first('firstName') }}</p>
                      </div>
                      <i class="placeholder"> نام</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="lastName" class="form-control" v-validate="'required|alpha'">
                      <div class="form-alert">
                        <p>{{ errors.first('lastName') }}</p>
                      </div>
                      <i class="placeholder">نام خانوادگی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="birth" class="form-control" v-validate="'required|date_format:yyyy/MM/dd'">
                      <div class="form-alert">
                        <p>{{ errors.first('birth') }}</p>
                      </div>
                      <span class="format_inp">(روز/ماه/سال)</span>
                      <i class="placeholder">تاریخ تولد</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="birthCertNumber" class="form-control" v-validate="'required|numeric|max:10'">
                      <div class="form-alert">
                        <p>{{ errors.first('birthCertNumber') }}</p>
                      </div>
                      <i class="placeholder">شماره شناسنامه</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="issuingCity" class="form-control" v-validate="'required|alpha'">
                      <div class="form-alert">
                        <p>{{ errors.first('issuingCity') }}</p>
                      </div>
                      <i class="placeholder">محل صدور</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="nationalId" class="form-control" v-validate="'required|numeric|length:10'">
                      <div class="form-alert">
                        <p>{{ errors.first('nationalId') }}</p>
                      </div>
                      <i class="placeholder"> کد ملی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="d-flex justify-content-end align-items-center uploadBtns">
                    <div class="form-group">
                      <input type="file" name="nationalCardPhoto" ref="myFile" @change="previewFiles()" class="upload-btn" v-validate="'required|image'"
                             value="آپلود تصویر کارت ملی">
                      <div class="form-alert">
                        <p>{{ errors.first('nationalCardPhoto') }}</p>
                      </div>
<!--                      <div class="pic marginR25">-->
                        <img v-bind:src="profileImage" id="sample" alt="">
<!--                        <span class="dl_pic">-->
<!--                            <img src="@/assets/img/close2.svg" alt="">-->
<!--                        </span>-->
<!--                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <h1 class="form-header">اطلاعات تماس</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="phoneNumber" class="form-control" v-validate="'required|numeric'">
                      <div class="form-alert">
                        <p>{{ errors.first('phoneNumber') }}</p>
                      </div>
                      <i class="placeholder">شماره تماس</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="mobileNumber" class="form-control" v-validate="'required|numeric'">
                      <div class="form-alert">
                        <p>{{ errors.first('mobileNumber') }}</p>
                      </div>
                      <i class="placeholder">شماره موبایل</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="address" class="form-control" v-validate="'required'">
                      <div class="form-alert">
                        <p>{{ errors.first('address') }}</p>
                      </div>
                      <i class="placeholder">آدرس</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="postalCode" class="form-control" v-validate="'required|numeric|length:10'">
                      <div class="form-alert">
                        <p>{{ errors.first('postalCode') }}</p>
                      </div>
                      <i class="placeholder">کدپستی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <h1 class="form-header">اطلاعات بانکی</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="bankName" class="form-control" v-validate="'required|alpha'">
                      <div class="form-alert">
                        <p>{{ errors.first('bankName') }}</p>
                      </div>
                      <i class="placeholder">نام بانک</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="ibanNumber" class="form-control"  v-validate="'required|length:27'">
                      <div class="form-alert">
                        <p>{{ errors.first('ibanNumber') }}</p>
                      </div>
                      <span class="format_inp">IR XXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                      <i class="placeholder">شماره شبا</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <div class="form-group">
                <div class="d-flex justify-content-start submitBtns">
                  <button class="btn" @click.prevent="submitData()">ثبت اطلاعات</button>
                  <button type="button" class="btn btn-cancel marginR25">انصراف</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../header/PageHeader'
export default {
  name: 'user',
  data () {
    return {
      profileImage: ''
    }
  },
  components: {
    PageHeader
  },
  methods: {
    submitData () {
      debugger
    },
    previewFiles () {
      let files = this.$refs.myFile.files
      let That = this
      if (files && files[0]) {
        const reader = new FileReader()

        reader.onload = function (e) {
          That.profileImage = e.target.result
        }

        reader.readAsDataURL(files[0])
      }
    }
  }
}
</script>

<style scoped>
  .form-alert{
    left: 0;
    background-color: #f2f2f2;
  }
  .format_inp{
    display: block;
    color: #666;
    font-size: 13px;
    position: absolute;
    right: 0;
  }
</style>
