<template>
  <div class="form-group">
    <div :class="['inp_border', isVistited?'visited':'']">
      <input type="text" class="form-control" v-on:blur="blurFunction" v-model="inputVal">
      <i class="placeholder">{{labelTitle}}</i>
      <i class="line"></i>
    </div>
    <div class="form-alert">
      <p>
        {{labelError}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['labelTitle', 'labelError'],
  name: 'FormInput',
  labelError: '',
  data () {
    return {
      inputVal: '',
      isVistited: false
    }
  },
  methods: {
    blurFunction: function () {
      // eslint-disable-next-line eqeqeq
      if (this.inputVal != '') {
        this.isVistited = true
      } else {
        this.isVistited = false
      }
    }
  }
}

</script>

<style scoped>

</style>
