<template>
  <button type="button" class="btn mx-auto" @click.prevent="submit">{{buttonTitle}}</button>
</template>
<script>
export default {
  props: ['buttonTitle'],
  name: 'submitButton',
  methods: {
    submit: function () {
      this.$emit('submit')
    }
  }
}

</script>

<style scoped>

</style>
