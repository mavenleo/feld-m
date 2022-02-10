<template>
  <section class="p-4 p-md-5 p-lg-5">
    <div class="loader d-flex justify-content-center align-items-center" v-if="loadingState">
      <Loader></Loader>
    </div>
    <div v-else>
      <div class="d-block d-md-flex d-lg-flex justify-content-between mb-4">
        <div class="mb-4 mb-md-0 mb-lg-0">
          <div class="font-weight-bold">Public Api</div>
          <div class="text-muted font-weight-lighter font-italic"><small>View all available apis, filter by title, category</small></div>
        </div>
        <div class="d-flex align-items-center">
          <input v-model="filter.title" type="text" class="form-control mr-1" placeholder="Search">
          <select v-model="filter.category" class="form-control">
            <option disabled selected>--Select category--</option>
            <option v-for="(category, i) in categories" :value="category" :key="i">{{ category }}</option>
          </select>
        </div>
      </div>
      <div class="scrollable">
        <table class="box-shadow">
          <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>CORS</th>
            <th>Https</th>
            <th>Auth</th>
            <th>Link</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(api, i) in filteredApis" :key="i">
            <td>{{ api.API }}</td>
            <td>{{ api.Category }}</td>
            <td>{{ api.Description }}</td>
            <td>{{ api.Cors }}</td>
            <td>{{ api.HTTPS }}</td>
            <td>{{ api.Auth }}</td>
            <td><a :href="api.Link">{{ api.Link }}</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PublicApi from "@/models/PublicApi";
import Loader from "@/components/Loader.vue";
import {Api, Data} from "@/types/types";

export default defineComponent({
  name: "Index",
  components: {Loader},
  data(): Data {
    return {
      apis: [],
      loadingState: true,
      filter: {
        title: '',
        category: '',
      },
      categories: []
    };
  },

  mounted() {
    this.getApis()
    this.getCategories()
  },

  computed:{
    filteredApis() : Array<Api> {
      if (this.filter.title || this.filter.category) {
        return this.apis.filter((api: Api) => {
          const searchByTitle = this.searchString(api.API, this.filter.title)
          const searchByCategory = this.searchString(api.Category, this.filter.category)

          if (searchByTitle
              || (searchByCategory && !searchByTitle)
              || (searchByCategory && searchByTitle)){
            return api
          }
        })
      }
      return this.apis
    }
  },

  methods: {
    getApis() : void {
        PublicApi.getApis().then(r => {
          this.apis = r.entries
        }).finally(() => this.loadingState = false)
    },
    searchString(str: string, q: string): boolean {
      if (q && q.length > 0) return str.toLowerCase()
          .indexOf(q.toLowerCase()) > -1;
      return false
    },
    getCategories() : void {
        PublicApi.getApiCategories().then(r => {
          this.categories = r.categories
        }).finally(() => this.loadingState = false)
    }
  }
})

</script>

<style lang="scss" scoped>
$border-radius: 8px;
.box-shadow{
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.075);
}
.loader{
  height: 100vh;
  width: 100vw;
}
table {
  min-width: 100%;
  thead {
    border-collapse: collapse;
    tr:first-child {
      th:first-child{
        border-top-left-radius: $border-radius;
      }
      th:last-child {
        border-top-right-radius: $border-radius;
      }
      th {
        padding: 18px;
        font-weight: bold;
        text-align: left;
      }
    }
    tr > th {
      font-weight: 500;
      border-top: none;
      border-bottom: none;
      background: #04598b;
      color: #fff;
      white-space: nowrap;
      vertical-align: top;
      text-transform: uppercase;
    }
  }
  tbody {
    tr{
      &:nth-of-type(odd){
        background: #bfe5fb57;
      }
      &:nth-of-type(even){
        background: rgba(35, 79, 128, 0.34);
      }
    }
    background-color: #ffffff;
    td {
      padding: 15px 10px;
    }
    tr:first-child {
      td:first-child {
        border-top-left-radius: 0;
      }
      td:last-child {
        border-top-right-radius: 0;
      }
    }
  }
}
.scrollable{
  width: 100%;
  overflow-x: scroll;
}
html, body{
  overflow-x: hidden;
}
</style>
