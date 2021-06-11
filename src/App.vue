<template>
  <p class="my-4">Select a ligand to fetch its Ki data.</p>

  <form class="max-w-sm my-4">
    <SearchableSelect :options="ligands" v-model="ligand"/>
    <label class="text-sm text-gray-600">Type to filter ligands.</label>
  </form>

  <h3 class="my-4 text-2xl font-bold">Ligand: {{ ligand }}</h3>

  <div class=
    "max-w-xl my-4 overflow-hidden rounded-xl shadow-md
    bg-gray-100"
  >
    <h4 class=
      "p-3 text-xl border-b-4
      bg-indigo-600 border-gray-300 text-white"
    >
      Filters
    </h4>

    <form class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 items-center">
      <div>
        <p class="font-semibold">Restrict values to experiments concerning:</p>
      </div>

      <div>
        <RadioButtons
          name="species"
          :options="SPECIES" v-model="filters.species"
        />
      </div>

      <div>
        <p class="font-semibold">Reject outlying values:</p>
      </div>

      <div>
        <div>
          <input
            id="outliers" class="mr-1"
            type="checkbox"
            v-model="filters.outliers"
          />
          <label for="outliers">Exclude outliers exceeding</label>
        </div>
        <div>
          <input
            id="deviation"
            class=
              "rounded px-1 py-0.5 mr-1 w-16 align-middle border
              border-gray-300 text-gray-700"
            type="number" min="0" step="0.01" :disabled="!filters.outliers"
            v-model="filters.deviation"
          />
          <label for="deviation">standard deviations</label>
        </div>
        <div>
          <label for="deviation" class="text-sm text-gray-600">
            If you're unsure, keep it in the range 1-3.
          </label>
        </div>
      </div>
    </form>
  </div>

  <div
    v-if="warning"
    class=
      "my-3 p-3 max-w-xl rounded-xl font-semibold shadow-md
      bg-red-500 text-white"
  >
    Something wrong occured: {{ warning }}
  </div>

  <ValueList :values="values"/>
  <SourceList :sources="sources"/>

  <p class="my-4 text-center">All data is from the PDSP Ki database.</p>
  <p class="my-4 text-center">
    This app and its underlying API are volunteer works. If you like them,
    please <a class="underline text-indigo-700"
    href="https://liberapay.com/xyzt_/donate">consider supporting them</a>!
  </p>
</template>

<script>
  import axios from 'axios'

  import SearchableSelect from './components/SearchableSelect.vue'
  import RadioButtons from './components/RadioButtons.vue'
  import ValueList from './components/ValueList.vue'
  import SourceList from './components/SourceList.vue'

  export default {
    components: {
      SearchableSelect,
      RadioButtons,
      ValueList,
      SourceList
    },

    methods: {
      async fetchData(endpoint, params = {}) {
        const url = this.API_URL + endpoint
        this.warning = null
        try {
          return await axios.get(url, { params: params })
        } catch (err) {
          this.warning = err.message
          console.error(err)
        }
      },

      async fetchValues() {
        const endpoint = `ki/${encodeURIComponent(this.ligand)}`
        const response = await this.fetchData(endpoint, this.params)
        this.values = response.data.ki
        this.sources = response.data.sources
        console.log(response)
      },

      async fetchLigands() {
        const response = await this.fetchData('ligands', { 'max-len': 30 })
        this.ligands = response.data.sort()
      }
    },

    watch: {
      ligand: 'fetchValues',
      params: {
        handler: 'fetchValues',
        deep: true
      }
    },

    computed: {
      params() {
        const p = {}
        if (this.filters.outliers && this.filters.deviation) {
          p.deviation = this.filters.deviation
        }
        switch (this.filters.species) {
          case 'HUMAN':
            p.species = 'HUMAN'
            break
          case 'CLONED':
            p.species = 'HUMAN'
            p.source = 'CLONED'
        }
        return p
      }
    },

    data() {
      return {
        API_URL: 'https://kidb.mixtures.info/v1/',
        SPECIES: {
          ALL: 'All species',
          HUMAN: 'Human only',
          CLONED: 'Human, cloned receptors only'
        },

        ligand: 'LSD',
        filters: {
          species: 'HUMAN',
          outliers: true,
          deviation: 1
        },

        values: null,
        sources: null,
        ligands: [],
        warning: null
      }
    },

    mounted() {
      this.fetchLigands()
      this.fetchValues()
    }
  }
</script>
