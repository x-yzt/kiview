<template>
  <h4 class="my-4 text-xl font-semibold">Receptor affinities</h4>

  <p v-if="isEmpty(values)">No data matched your query.</p>

  <ul class="flex flex-wrap gap-3 items-center">
    <li
      v-for="(data, receptor) in values" :key="receptor"
      class=
        "inline-flex flex-wrap justify-between items-center gap-3 p-3 rounded border-l-4 shadow-md
        bg-gray-100 border-indigo-600"
    >
      <h5 class="text-2xl text-indigo-700">{{ capFirst(receptor) }}</h5>

      <div class="leading-3">
        <div class="text-xl">
          Ki:
            <span class="font-semibold text-indigo-700">
              {{ round(data.median) }}
            </span>
          nM
        </div>
        <small class="text-sm text-gray-600">(median)</small>
      </div>

      <small class="text-sm text-gray-600">
        Mean: {{ round(data.mean) }} nM
        <br/>
        Std. deviation: {{ round(data.std) }}
        {{ data.std.toString() !== "NaN" ? "nM" : "" }}
        <br/>
        Retained values: {{ data.count }}
      </small>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['values']
  }
</script>
