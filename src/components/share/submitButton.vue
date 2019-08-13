<template>
  <button type="button" class="btn mx-auto">{{buttonTitle}}</button>
</template>
<script>
import VueLoadingButton from 'vue-loading-button'
export default {
  props: ['buttonTitle'],
  name: 'submitButton',
  data () {
    return {
    }
  },
  methods: {
    submit: function () {
      this.$emit('submit')
    }
  },
  components: VueLoadingButton
}

</script>

<style scoped>

</style>
