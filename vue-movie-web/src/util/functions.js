const Functions = {
    addCommas(nStr) {
        nStr += "";
        var x = nStr.split(",");
        var x1 = x[0];
        var x2 = x.length > 1 ? "," + x[1] : "";
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, "$1" + "," + "$2");
        }
        return x1 + x2;
    },

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
            c
        ) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    },

    isObject(objValue) {
        return (
            objValue &&
            typeof objValue === "object" &&
            objValue.constructor === Object
        );
    },

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    },

    getFileExtension(filename) {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : null;
    },

    getDomainWithoutSubdomain() {
        let urlParts = location.hostname.includes(".")
            ? location.hostname.split(".")
            : [location.hostname];

        return urlParts
            .slice(0)
            .slice(-(urlParts.length === 4 ? 3 : 2))
            .join(".");
    },

    setCookie(cname, cvalue, days) {
        var dt, expires, domain;
        dt = new Date();
        dt.setTime(dt.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + dt.toGMTString();
        domain = this.getDomainWithoutSubdomain();
        document.cookie = cname + "=" + cvalue + expires + "; domain=" + domain;
    },

    getCookie(cname) {
        console.log(cname);
        // // Split cookie string and get all individual name=value pairs in an array
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
    },

    deleteCookie(cname) {
        let domain = this.getDomainWithoutSubdomain();
        if (this.getCookie(cname)) {
            document.cookie =
                cname +
                "=" +
                (domain ? ";domain=" + domain : "") +
                ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    }
};

Functions.install = function (Vue) {
    Vue.prototype.$func = Functions;
};
export default Functions;
