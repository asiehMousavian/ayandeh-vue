<template>
  <div class="container">
    <div class="back fund_detail mb15 table-err" v-if="hasError">
      <div  class="register_top error">
        <p>{{errorMsg}}</p>
      </div>
    </div>
    <div id="accountingTable" class="back fund_detail" v-show="!hasError">
      <div class="row">
        <div id="table" class="col-xs-12 table-responsive">
          <datatable
            :columns="columns"
            :data="getData"
            id="data-table"></datatable>
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
import sharedService from '@/services/sharedService'
export default {
  name: 'Accounting',
  props: ['row', 'column'],
  data () {
    return {
      filter: '',
      columns: [
        {label: 'تاریخ', field: 'orderDate', filterable: false},
        {label: 'عملیات', field: 'orderTypeName'},
        {label: 'مبلغ سفارش', field: 'orderAmount'},
        {label: 'شماره پیگیری', field: 'receiptId'}
        // {label: 'بستانکار', field: 'transactionType', align: 'right', sortable: false},
        // {label: 'شعبه', field: 'transactionType', align: 'right', sortable: false}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10,
      hasError: false,
      errorMsg: '',
      fund: {},
      fundId: 0
    }
  },
  mounted () {
  },
  methods: {
    getFundInfo () {
      this.fund = JSON.parse(this.$session.get('currentFund'))
      this.fundId = this.fund.code
    },
    getData: function (params, setRowData) {
      this.getFundInfo()
      params.dsCode = this.fundId// this.$route.params.foundId
      params.from = (params.page_number - 1) * params.page_length
      params.page = params.page_number
      params.page_saze = 10
      generalService.getMethod('/invest/fund/user/accounting', {params: params})
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
          //todo
          $('#accountingTable li a').addClass('page-link')
        }).catch(error => {
          this.hasError = true
          if (error.response.data.message) {
            if (error.response.data.developerMessage === 'errors.kariz.dev') {
              this.errorMsg = 'در بازه زمانی کنونی قادر به دریافت اطلاعات نیستیم'
            } else {
              this.errorMsg = 'اطلاعاتی وجود ندارد'
            }
          } else {
            this.errorMsg = 'از سرور پاسخ مناسبی دریافت نشد لطفا بعدا مراجعه نمایید'
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
    color: #5c3226;
    font-size: 18px;
  }
  #data-table{
    text-align: right;
    direction: rtl;
  }
</style>
