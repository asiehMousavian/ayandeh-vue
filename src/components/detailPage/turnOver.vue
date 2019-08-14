
<template>
  <div class="container">
    <div class="back fund_detail mb15 table-err" v-if="hasError">
      <div  class="register_top error">
        <p>{{errorMsg}}</p>
      </div>
    </div>
    <div class="back fund_detail" v-show="!hasError">
      <div class="row">
        <div id="table" class="col-xs-12 table-responsive">
          <datatable :columns="columns" :data="getData"  id="data-table" class="table-responsive"></datatable>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 form-inline">
          <datatable-pager v-model="page" type="abbreviated"  :per-page="per_page"></datatable-pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import generalService from '@/services/generalService'
export default {
  name: 'turnOver',
  props: ['row', 'column'],
  data () {
    return {
      filter: '',
      columns: [
        {label: 'نام شعبه', field: 'branchName', filterable: false},
        {label: 'توضیحات', field: 'comments'},
        {label: 'میزان اعتبار', field: 'creditAmount'},
        {label: 'میزان بدهی', field: 'debitAmount'},
        {label: 'نوع تراکنش', field: 'transactionType', align: 'right', sortable: false},
      ],
      rows: window.rows,
      page: 1,
      per_page: 10,
      hasError: false,
      errorMsg: ''
    }
  },

  methods: {
    getData: function (params, setRowData) {
        // debugger
      params.dsCode = this.$route.params.id
      params.from = (params.page_number - 1) * params.page_length
      params.page = params.page_number
      params.page_saze = 10
      generalService.getMethod('/invest/fund/user/turnover', {params: params})
        .then(response => {
          if (response.content.data.length === 0) {
            this.hasError = true
            this.errorMsg = 'نتیجه ای یافت نشد'
          }
          let start_index = (params.page_number - 1) * params.page_length
          let end_index = start_index + params.page_length
          setRowData(
            response.content.data,
            response.content.totalSize
          )
          $("li a").addClass("page-link");
        }).catch(error => {

          this.hasError = true
          if (error.response.data.message) {
            if (error.response.data.developerMessage === 'errors.kariz.dev') {
              this.errorMsg = 'در بازه زمانی کنونی قادر به دریافت اطلاعات نیستیم'
            }
            else {
              this.errorMsg = 'اطلاعاتی وجود ندارد'
            }
          } else {
            this.errorMsg = 'اطلاعاتی وجود ندارد'
          }
      })
    }
  }
}
</script>

<style scoped>
  .table-err {
    min-height: 150px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #27ba94;
    font-size: 15px;
  }
</style>
