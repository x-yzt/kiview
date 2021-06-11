<template>
  <div v-for="(label, option) in options" :key="option">
    <input
      :id="`${name}-${option}`" class="mr-1"
      type="radio" :name="name"
      :value="option" v-model="value"
    />
    <label :for="`${name}-${option}`">{{ label }}</label>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: String,
      options: Object,
      name: {
        type: String,
        default: ''
      }
    },

    emits: ['update:modelValue'],

    computed: {
      value: {
        get() { return this.modelValue },
        set(val) { this.$emit('update:modelValue', val) }
      }
    }
  }
</script>
