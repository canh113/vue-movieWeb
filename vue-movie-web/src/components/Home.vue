<template>
  <div>
    <h1 class="text-center">welcome Movie Web</h1>
    <div class="container">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Form Movie
          </button>
          <button
            class="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            List Movie
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <Form @reload="loadList = !loadList" />
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <ListMovie :loadList="loadList" />
        </div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
import Form from "./Form.vue";
import ListMovie from "./ListMovie.vue";
export default {
  components: {
    Form,
    ListMovie,
  },
  data() {
    return {
      loadList: false,
    };
  },
};
</script>
