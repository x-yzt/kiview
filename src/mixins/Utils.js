export default {
  methods: {
    isEmpty(obj) {
      return !obj || obj.length === 0 || Object.entries(obj).length === 0
    },

    capFirst(str) {
      return str[0].toUpperCase() + str.slice(1)
    },

    round(x, digits = 2) {
      const factor = 10 ** digits
      return Math.round(x * factor) / factor
    }
  }
}
