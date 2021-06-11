<template>
  <h4 class="my-4 text-xl font-semibold">Retained values sources</h4>

  <div class="my-4 overflow-x-auto rounded shadow-md">
    <table class="w-full bg-gray-100">
      <tr class="border-b-4 border-indigo-600">
        <th>Receptor</th>
        <th>Species</th>
        <th>Result</th>
        <th>Reference ligand</th>
        <th>Publication</th>
      </tr>

      <tr v-if="isEmpty(sources)">
        <td colspan="99">No source matched your query.</td>
      </tr>

      <tr v-for="source in sources" :key="source">
        <td>
          {{ source.receptor }}
          <small v-if="source.unigene" class="block text-sm text-gray-600" >
            UniGene: {{ source.unigene }}
          </small>
        </td>
        <td>
          {{ source.species }}
          <small v-if="source.source" class="block text-sm text-gray-600">
            Source: {{ source.source }}
          </small>
        </td>
        <td class="whitespace-nowrap">
          Ki {{ source.ki_op }} {{ round(source.ki) }} nM
        </td>
        <td>{{ source.ref_ligand }}</td>
        <td>
          <a
            v-if="source.link"
            class="underline text-indigo-700"
            :href="source.link"
          >{{ source.reference }}</a>
          <span v-else>{{ source.reference }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['sources']
  }
</script>

<style scoped>
  table tr:nth-child(2n) {
    @apply bg-gray-200;
  }

  td, th {
    @apply px-3 py-1;
  }

  tr th {
    @apply font-semibold;
  }
</style>
