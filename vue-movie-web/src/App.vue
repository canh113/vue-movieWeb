<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created: function () {
    this.$http.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if (err.toString().includes("403") || err.toString().includes("401")) {
          if (!this.wasConfirm) {
            this.wasConfirm = true;
            if (
              confirm(
                `${this.$const.MESSAGE.NotAuthorization} ${this.$const.MESSAGE.WannaLogout}`
              )
            ) {
              this.$user.dispatch("logout").then(() => {
                let returnUrl = window.location.href;
                console.log("window.location.href");
                console.log(window.location.href);
                window.location = `https://spp.scancom.net/login?returnUrl=${returnUrl}`;
              });
              return;
            }
          }
        }
        throw err;
      });
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>