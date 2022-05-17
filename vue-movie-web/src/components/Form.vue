<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        placeholder="Name"
        v-model="name"
      />
      <div v-if="checkInput" class="text-danger">
        <p>please input data</p>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Genre</label>
      <!-- <input type="text" class="form-control" v-model="genre" /> -->
      <select class="custom-select form-control" v-model="genre">
        <option value="null" selected>Open this select genre</option>
        <option v-for="item in GenreData" :key="item.Id" :value="item.Name">
          {{ item.Name }}
        </option>
      </select>
      <div v-if="checkInput" class="text-danger">
        <p>please input data</p>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Time</label>
      <input
        type="text"
        class="form-control"
        placeholder="Time"
        v-model="duration"
      />
      <div v-if="checkInput" class="text-danger">
        <p>please input data</p>
      </div>
    </div>
    <button @click="SubmitData()" class="btn btn-primary">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkInput: false,
      name: null,
      genre: null,
      duration: null,
      GenreData: {
        1: { Name: "Action/Comedy" },
        2: { Name: "Action/Thriller" },
        3: { Name: "Sci-fi/Drama" },
        4: { Name: "Animation/Family" },
      },
    };
  },

  methods: {
    async SubmitData() {
      this.CheckDataInput();
      if (this.checkInput == true) {
        return;
      }
      let res = await this.$http.post(
        "/movies",
        {
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
      //console.log("----------data check-----------");
      //console.log(res);
      if (res && res.status == 200) {
        this.$emit("reload");
        alert("Your request sent successfully!");
        // clear form
        this.clearForm();
      } else {
        alert("Your request sent fail!");
      }
    },
    CheckDataInput() {
      if (this.name == null && this.genre == null && this.duration == null) {
        this.checkInput = true;
        return;
      } else {
        this.checkInput = false;
      }
    },
    clearForm() {
      this.name = null;
      this.genre = null;
      this.duration = null;
    },
  },
};
</script>
<style></style>
