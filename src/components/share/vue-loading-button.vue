<template>
  <button type="button" className="btn mx-auto">
      <div className="loading_body">
      </div>
  </button>
</template>
<script>
export default {
  name: 'loading',
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    styled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
