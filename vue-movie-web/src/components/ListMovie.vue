<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Genre</th>
          <th scope="col">Duration</th>
          <th scope="col">ReleaseDate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in requestlist" :key="item.Id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ $moment(item.releaseDate).format("DD/MM/yyyy") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["loadList"],
  data() {
    return {
      requestlist: [],
    };
  },
  mounted() {
    this.getRequest();
  },
  watch: {
    loadList() {
      this.getRequest();
    },
  },
  methods: {
    async getRequest() {
      let dataT = await this.$http.get("/movies");
      this.requestlist = dataT.data;
    },
  },
};
</script>

<style></style>
