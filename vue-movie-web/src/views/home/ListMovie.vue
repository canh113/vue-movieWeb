<template>
  <div>
    <table class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Genre</th>
          <th scope="col">Duration</th>
          <th scope="col">ReleaseDate</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in requestlist" :key="item.Id">
          <th scope="row">{{ index + 1 }}</th>
          <!-- <td class="pointer" @click="getDataById(item)">{{ item.name }}</td> -->
          <td class="pointer" @click="getDataRouter(item)">{{ item.name }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ $moment(item.releaseDate).format("DD/MM/yyyy") }}</td>
          <td class="pointer" @click="RemoveById(item)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="requestId">
      <h4>Change data list</h4>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="mb-3">
        <label class="form-label">Genre</label>
        <!-- <input type="text" class="form-control" v-model="genre" /> -->
        <select class="form-control" v-model="genre">
          <!-- <option value="null" selected>Open this select genre</option> -->
          <option v-for="item in GenreData" :key="item.Id" :value="item.Name">
            {{ item.Name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Duration</label>
        <input type="text" class="form-control" v-model="duration" />
      </div>
      <button @click="saveData()" class="btn btn-primary mx-1">Submit</button>
      <button @click="closeForm()" class="btn btn-danger">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loadList"],
  data() {
    return {
      requestlist: [],
      requestInfo: [],
      isEdit: false,
      name: null,
      genre: null,
      duration: null,
      id: null,
      loadListMovie: false,
      GenreData: {
        1: { Name: "Action/Comedy" },
        2: { Name: "Action/Thriller" },
        3: { Name: "Sci-fi/Drama" },
        4: { Name: "Animation/Family" },
      },
    };
  },
  async mounted() {
    if (this.requestId) {
      console.log("da vao 111");
      await this.getRequest();
      this.showDataDetil(this.requestId);
    } else {
      await this.getRequest();
    }
  },
  computed: {
    requestId() {
      return this.$route.query.requestId;
    },
  },
  watch: {
    loadList() {
      this.getRequest();
    },

    loadListMovie() {
      this.getRequest();
    },
    requestId(val) {
      if (val) {
        console.log("!!!!!!Check data");
        console.log(val);
        this.showDataDetil(val);
      }
    },
  },
  methods: {
    async getRequest() {
      let dataT = await this.$http.get("/movies");
      this.requestlist = dataT.data;
    },

    async getDataById(e) {
      //this.isEdit = true;
      console.log("data get by id");
      console.log(e);
      let requestInfo = e;
      this.requestInfo = requestInfo;
      this.name = e.name;
      this.genre = e.genre;
      this.duration = e.duration;
    },

    getDataRouter(item) {
      //console.log(item);
      let requestId = item.id;
      this.$router
        .push({ name: "HomePage", query: { requestId } })
        .catch(() => {});
    },

    async showDataDetil(val) {
      console.log("data check showDataDetil");
      console.log(val);
      let data = await this.requestlist.find((_) => _.id == val);
      if (data) {
        this.$emit("active");
        this.getDataById(data);
      }
      //console.log(data);
      //this.$emit("active");
      //this.getDataById(data);
    },

    async saveData() {
      //put
      let data = await this.$http.put(
        `/movies/${this.requestInfo.id}`,
        {
          Id: this.requestInfo.id,
          Name: this.name,
          Genre: this.genre,
          Duration: this.duration,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data && data.status == 204) {
        this.loadListMovie = true;
        this.isEdit = false;
        alert("Your request update successfully!");
        // clear form
        this.clearForm();
      } else {
        alert("Your request update fail!");
      }
    },
    clearForm() {
      this.name = null;
      this.genre = null;
      this.duration = null;
    },

    async RemoveById(e) {
      console.log("--data---");
      console.log(e);
      let data = await this.$http.put(
        `/movies/${e.id}`,
        {
          Id: e.id,
          IsDelete: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data && data.status == 204) {
        this.loadListMovie = true;
        this.isEdit = false;
        alert("Your request delete successfully!");
        // clear form
        this.clearForm();
      } else {
        alert("Your request delete fail!");
      }
    },
    closeForm() {
      //this.isEdit = false;

      this.$router.push({ name: "HomePage", query: {} }).catch(() => {});
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
