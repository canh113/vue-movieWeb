<template>
  <div>
    <div class="container pt-5">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <form>
            <h2 class="text-center">Welcome web movie</h2>
            <div class="form-group inputForm">
              <label for="exampleInputEmail1">Email address</label>
              <input type="text" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="text" class="form-control" v-model="password" />
            </div>
            <br />
          </form>
          <button @click="Login()" class="btn btn-primary">Login</button>
          <div v-if="checkInput">
            <p class="text-danger">{{ textInformation }}</p>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      requestlist: [],
      email: null,
      password: null,
      checkInput: false,
      textInformation: null,
    };
  },
  methods: {
    async Login() {
      if (this.email == null) {
        this.checkInput = true;
        this.textInformation = "Please input email or password";
        return;
      } else {
        let getUser = await this.$http.get("/movies/user");
        this.requestlist = getUser.data;
        this.requestlist.forEach((item) => {
          if (
            this.email &&
            item.mail == this.email &&
            item.passWorld == this.password
          ) {
            this.$router.push({ name: "HomePage" });
          } else {
            this.checkInput = true;
            this.textInformation =
              "Email or Password incorrect please check!!!";
          }
        });
      }

      // console.log(this.requestlist);
    },

    // async Login() {
    //   if (this.email == null) {
    //     this.checkInput = true;
    //     this.textInformation = "Please input email or password";
    //     return;
    //   } else {
    //     // let params = {
    //     //   mail: this.email,
    //     //   pass: this.password,
    //     // };
    //     // let res = await this.$http.get("/movies/login/", {
    //     //   params: params,
    //     // });

    //     let data = this.$http.get(
    //       "/api/movies/login/" +
    //         this.$route.params.mail +
    //         "/" +
    //         this.$route.params.password
    //     );
    //     console.log(data);
    //   }

    //   // console.log(this.requestlist);
    // },
  },
};
</script>
