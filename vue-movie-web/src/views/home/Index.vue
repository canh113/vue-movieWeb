<template>
  <div>
    <h1 class="text-center">welcome Movie Web</h1>
    <div class="container">
      <!-- <router-link to="/form">Form</router-link>
      <router-link to="/list">List</router-link> -->
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link"
            :class="{ active: activeTab == 'nav-home-tab' }"
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
            :class="{ active: activeTab == 'nav-profile-tab' }"
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
          class="tab-pane fade"
          :class="{ 'active show': activeTab == 'nav-home-tab' }"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <Form @reload="loadList = !loadList" />
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab == 'nav-profile-tab' }"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <ListMovie
            :loadList="loadList"
            @active="activeTab = 'nav-profile-tab'"
          />
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
      activeTab: "nav-home-tab",
    };
  },
  methods: {},
};
</script>
