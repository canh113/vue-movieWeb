import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getCookie = function (cname) {
    console.log(cname);
    // // // Split cookie string and get all individual name=value pairs in an array
    // var cookieArr = document.cookie.split(";");

    // // Loop through the array elements
    // for (var i = 0; i < cookieArr.length; i++) {
    //     var cookiePair = cookieArr[i].split("=");

    //     /* Removing whitespace at the beginning of the cookie name
    //       and compare it with the given string */
    //     if (cname == cookiePair[0].trim()) {
    //         // Decode the cookie value and return
    //         return decodeURIComponent(cookiePair[1]);
    //     }
    // }

    // // Return null if not found
    // return null;

    return decodeURIComponent(
        "%7B%22fullName%22:%22Le%20Minh%20Canh%22,%22firstName%22:%22Canh%22,%22token%22:%22eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxNDIxIiwiVVVJZCI6IjFmNmQ4M2YwLWNkNjctNGEwMS05MDBkLTk5MWYyOGFhZGRmOCIsImV4cCI6MTY1MjYzMzE2NSwiaXNzIjoia2xjLWlzc3VlciIsImF1ZCI6ImtsYy1hdWRpZW5jZSJ9.X8xb-9SRCS413VrXseEj6DlvyvBZl_SByaOD2d6OEbU%22%7D"
    );
};

export default new Vuex.Store({
    state: {
        status: "",
        user: getCookie("user-scancom")
            ? JSON.parse(decodeURI(getCookie("user-scancom")))
            : null
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, user) {
            state.status = "success";
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.user = null;
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                this._vm.$http
                    .post("/api/auth/token", user)
                    .then(resp => {
                        if (resp.data.status == "Success") {
                            let data = resp.data.data;
                            const user = {
                                userName: data.userName,
                                fullName: data.fullName,
                                token: data.token,
                                role: data.role
                            };
                            this._vm.$func.setCookie(
                                "user-scancom",
                                encodeURI(JSON.stringify(user)),
                                365
                            );
                            //axios.defaults.headers.common["Authorization"] = token;
                            commit("auth_success", user);
                        }
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error");
                        this._vm.$func.deleteCookie("user-scancom");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                try {
                    commit("logout");
                    this._vm.$http.post("/api/auth/logout").then(() => {
                        this._vm.$func.deleteCookie("user-scancom");
                    });

                    //delete axios.defaults.headers.common["Authorization"];
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        }
    },
    getters: {
        authStatus: state => state.status,
        authUser: state => state.user
    }
});
