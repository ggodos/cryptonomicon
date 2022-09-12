<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div
      v-if="!coins.length"
      class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewbox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentcolor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentcolor"
          d="m4 12a8 8 0 018-8v0c5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 014 12h0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <div class="container">
      <add-ticker
        @add-ticker="add"
        :coins="this.coins"
        :tickersNames="this.tickers.map(t => t.name)"
      />

      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <div>
          <button
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            v-if="page > 1"
            @click="page = page - 1"
          >
            Назад
          </button>
          <button
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled"
            v-if="hasNextPage"
            @click="page = page + 1"
          >
            Вперёд
          </button>
          <div>Фильтр: <input v-model="filter" /></div>
        </div>
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="t in paginatedTickers"
            :key="t.name"
            @click="select(t)"
            :class="{
              'border-4': selectedTicker === t
            }"
            class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
          >
            <div
              :class="{
                'bg-red-100': !t.tickerValid
              }"
              class="bg-white px-4 py-5 sm:p-6 text-center"
            >
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ t.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ formatPrice(t.price) }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
              @click.stop="handleDelete(t)"
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path></svg
              >Удалить
            </button>
          </div>
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
      </template>

      <selected-ticker-graph
        ref="graph"
        v-model:graph="graph"
        :graph="this.graph"
        @close:graph="this.selectedTicker = null"
        :selectedTicker="this.selectedTicker"
      />
    </div>
  </div>
</template>

<script>
import { loadAllCoins, subscribeToCoin, unsubscribeFromCoin } from "./api";
import AddTicker from "./components/AddTicker.vue";
import SelectedTickerGraph from "./components/SelectedTickerGraph.vue";

const VISIBLE_TICKERS = 6;
const PRICE_FIXED_DECIMAL = 2;
const LOW_PRICE_PRECISION = 4;

export default {
  name: "App",

  components: {
    AddTicker,
    SelectedTickerGraph
  },

  data() {
    return {
      filter: "",
      page: 1,

      graph: [],
      tickers: [],
      selectedTicker: null,

      coins: []
    };
  },

  methods: {
    updateTicker(ticker, price) {
      this.tickers
        .filter(t => t.name === ticker)
        .forEach(t => {
          if (t === this.selectedTicker) {
            this.graph.push(price);
            if (this.graph.length > this.maxGraphElements) {
              this.graph = this.graph.slice(
                this.graph.length - this.maxGraphElements
              );
            }
          }
          t.price = price;
        });
      this.tickers = [...this.tickers]; // Trigger watch
    },

    changeTickerValidity(ticker, valid = true) {
      this.tickers
        .filter(t => t.name === ticker)
        .forEach(t => {
          t.tickerValid = valid;
        });
    },

    formatPrice(price) {
      if (price === "-") {
        return price;
      }
      return price > 1
        ? price.toFixed(PRICE_FIXED_DECIMAL)
        : price.toPrecision(LOW_PRICE_PRECISION);
    },

    add(ticker) {
      const currentTicker = {
        name: ticker.toUpperCase(),
        price: "-",
        tickerValid: true
      };

      this.tickers = [...this.tickers, currentTicker];
      this.filter = "";

      subscribeToCoin(
        currentTicker.name,
        newPrice => this.updateTicker(currentTicker.name, newPrice),
        () => this.changeTickerValidity(currentTicker.name, false)
      );
    },

    handleDelete(tickerToRemove) {
      this.tickers = this.tickers.filter(t => t != tickerToRemove);
      if (this.selectedTicker === tickerToRemove) {
        this.selectedTicker = null;
      }
      if (tickerToRemove.tickerValid) {
        unsubscribeFromCoin(tickerToRemove.name);
      }
    },

    select(ticker) {
      this.selectedTicker = ticker;
    }
  },

  computed: {
    startIndex() {
      return (this.page - 1) * VISIBLE_TICKERS;
    },

    endIndex() {
      return this.page * VISIBLE_TICKERS;
    },

    filteredTickers() {
      return this.tickers.filter(ticker =>
        ticker.name.includes(this.filter.toUpperCase())
      );
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.startIndex, this.endIndex);
    },

    hasNextPage() {
      return this.filteredTickers.length > this.endIndex;
    },

    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page
      };
    }
  },

  watch: {
    tickers() {
      localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
    },

    selectedTicker() {
      this.graph = [];
      this.$nextTick().then(this.calculateMaxGraphElements);
    },

    paginatedTickers() {
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },

    filter() {
      this.page = 1;
    },

    pageStateOptions(v) {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${v.filter}&page=${v.page}`
      );
    }
  },

  async created() {
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );
    const VALID_KEYS = ["filter", "page"];

    VALID_KEYS.forEach(key => {
      if (windowData[key]) {
        this[key] = windowData[key];
      }
    });

    const tickersData = localStorage.getItem("cryptonomicon-list");
    if (tickersData) {
      this.tickers = JSON.parse(tickersData);
      this.tickers.forEach(ticker => {
        subscribeToCoin(
          ticker.name,
          newPrice => this.updateTicker(ticker.name, newPrice),
          () => this.changeTickerValidity(ticker.name, false)
        );
      });
    }

    const data = await loadAllCoins();
    this.coins = Object.values(data.Data)
      .map(coin => coin.Symbol)
      .sort();
  }
};
</script>
