<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер {{ ticker }}</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            @keydown.enter="add"
            @keyup="completesUpdate"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
          <div
            v-if="tickerCompletes.length"
            class="flex bg-white shadow-md p-1 rounded-md flex-wrap"
          >
            <span
              v-for="(item, i) in tickerCompletes"
              :key="i"
              @click="completeAdd(item)"
              class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
            >
              {{ item }}
            </span>
          </div>
          <div v-if="tickerAlreadyExist" class="text-sm text-red-600">
            Тикер уже добавлен
          </div>
          <div v-if="tickerInvalid" class="text-sm text-red-600">
            Тикер не корректен
          </div>
        </div>
      </div>
    </div>
    <add-button @click="add" type="button" class="my-4" />
  </section>
</template>

<script>
import AddButton from "./AddButton.vue";

const COMPLETES_QUANTITY = 4;

export default {
  components: {
    AddButton
  },

  props: {
    coins: {
      type: Array,
      required: true
    },

    tickersNames: {
      type: Array,
      required: true
    }
  },

  emits: {
    "add-ticker": value => typeof value === "string" && value.length > 0
  },

  data() {
    return {
      ticker: "",
      tickerCompletes: [],

      tickerInvalid: false,
      tickerAlreadyExist: false
    };
  },

  methods: {
    add() {
      this.tickerInvalid = !this.isTickerValid;
      if (this.tickerInvalid) {
        return;
      }

      this.tickerAlreadyExist = this.isTickerRepeated;
      if (this.tickerAlreadyExist) {
        return;
      }

      this.$emit("add-ticker", this.ticker);
      this.ticker = "";
    },

    completeAdd(completeName) {
      this.ticker = completeName;
      this.add();
      this.completesUpdate();
    },

    completesUpdate() {
      if (this.normalizedTicker === "") {
        this.tickerCompletes = [];
        return;
      }

      this.tickerCompletes = this.coins
        .filter(coin => coin.startsWith(this.normalizedTicker))
        .slice(0, COMPLETES_QUANTITY);
    }
  },

  computed: {
    normalizedTicker() {
      return this.ticker.toUpperCase();
    },

    isTickerValid() {
      const tickerToCheck = this.normalizedTicker;
      return this.coins.some(c => c == tickerToCheck);
    },

    isTickerRepeated() {
      return this.tickersNames.some(t => t === this.normalizedTicker);
    }
  }
};
</script>
