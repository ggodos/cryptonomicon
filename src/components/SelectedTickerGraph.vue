<template>
  <section v-if="selectedTicker" class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
      {{ selectedTicker.name }}
    </h3>
    <div
      class="flex items-end border-gray-600 border-b border-l h-64"
      ref="graph"
    >
      <div
        v-for="(bar, idx) in normalizedGraph"
        :key="idx"
        :style="{ height: `${bar}%` }"
        class="bg-purple-800 border w-10"
      ></div>
    </div>
    <cross-button @click="closeGraph" />
    <!-- selectedTicker = null" /> -->
  </section>
</template>

<script>
import CrossButton from "./CrossButton.vue";

const MIN_GRAPH_SIZE_PERCENT = 5;

export default {
  components: {
    CrossButton
  },

  props: {
    selectedTicker: {
      required: true
    },

    graph: {
      type: Array,
      required: true
    }
  },

  emits: {
    "close:graph": null,
    "update:graph": null
  },

  data() {
    return {
      maxGraphElements: 1
    };
  },

  methods: {
    closeGraph() {
      this.$emit("close:graph");
    },

    calculateMaxGraphElements() {
      if (!this.$refs.graph) {
        return;
      }
      this.maxGraphElements = this.$refs.graph.offsetWidth / 38;

      if (this.graph.length > this.maxGraphElements) {
        this.$emit("update:graph", this.graph.slice(0, this.maxGraphElements));
      }
    }
  },

  computed: {
    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);

      if (maxValue == minValue) {
        return this.graph.map(() => 50);
      }
      return this.graph.map(
        price =>
          MIN_GRAPH_SIZE_PERCENT +
          ((price - minValue) * (100 - MIN_GRAPH_SIZE_PERCENT)) /
            (maxValue - minValue)
      );
    }
  },

  mounted() {
    window.addEventListener("resize", this.calculateMaxGraphElements);
  },

  beforeMount() {
    window.removeEventListener("resize", this.calculateMaxGraphElements);
  }
};
</script>
