<template>
  <v-select
    :options="displayedOptions"
    :filterable="false"
    @search="input => search = input"
    v-model="modelValue"
  >
    <template #list-footer>
      <li v-show="truncated">
        Plus {{ truncated }} hidden items...
      </li>
    </template>
  </v-select>
</template>

<script>
  import vSelect from 'vue-select-connorshea'
  import 'vue-select-connorshea/dist/vue-select.css'

  function normalize(string) {
    return string.toLowerCase().replace(/[^\w]/g, '')
  }

  function relevance(a, b, query) {
    /* This is highly suboptimal... */
    a = normalize(a)
    b = normalize(b)
    query = normalize(query)
    return (
      2 * a.startsWith(query) + a.endsWith(query) <
      2 * b.startsWith(query) + b.endsWith(query)
    )
  }

  export default {
    components: {
      vSelect
    },

    data() {
      return {
        modelValue: null,
        search: ''
      }
    },

    props: {
      options: {
        type: Array
      },
      maxOptions: {
        type: Number,
        default: 200
      }
    },

    computed: {
      displayedOptions() {
        return this.options
          .filter(opt => normalize(opt).includes(normalize(this.search)))
          .slice(0, this.maxOptions)
          .sort((a, b) => relevance(a, b, this.search))
      },

      truncated() {
        return this.options.length - this.displayedOptions.length
      }
    }
  }
</script>
