const sessionData = {

    getUser: function () {
        return JSON.parse(sessionStorage.getItem("users"));
    },
    setUsers: function (users) {
        sessionStorage.setItem("users", JSON.stringify(users));
    },
    removeUsers: function () {
        sessionStorage.removeItem('users');
    }
}

export default sessionData;