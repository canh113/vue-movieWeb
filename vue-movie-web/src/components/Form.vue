<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="name" />
      <div v-if="checkInput" class="text-danger">
        <p>please input data</p>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Genre</label>
      <input type="text" class="form-control" v-model="genre" />
      <div v-if="checkInput" class="text-danger">
        <p>please input data</p>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Time</label>
      <input type="text" class="form-control" v-model="duration" />
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
    };
  },

  methods: {
    async SubmitData() {
      this.CheckDataInput();
      //   if (!this.CheckDataInput()) {
      //     return;
      //   }
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
      console.log("----------data check-----------");
      console.log(res);
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
