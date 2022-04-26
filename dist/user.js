var User = /** @class */ (function () {
    function User(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.middleName = user.middleName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
        this.role = user.role;
        this.address = user.address;
    }
    return User;
}());
export { User };
