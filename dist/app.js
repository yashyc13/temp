import { crudApp } from "./index.js";
var dt = new Date();
var dateTime = document.getElementById("dispDate");
dateTime.classList.add("hidden");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.date = "";
        this.crudUser = new crudApp();
        this.loadBtn = document.getElementById("loadBtn");
        this.refreshBtn = document.getElementById("refreshBtn");
        this.loadBtn.addEventListener("click", function () { return _this.loadData(); });
        this.refreshBtn.addEventListener("click", function () { return _this.refreshData(); });
        this.refreshBtn.style.display = "none";
    }
    App.prototype.updateDate = function () {
        var datetime = document.getElementById("dateAndTime");
        datetime.innerHTML = "Updated on - ".concat(this.date.replace(",", " at "));
    };
    App.prototype.loadData = function () {
        this.crudUser = new crudApp();
        this.crudUser.createTable();
        this.refreshBtn.style.display = "block";
        this.loadBtn.style.display = "none";
        dateTime.classList.remove("hidden");
        document.getElementById("dateAndTime").innerHTML = dt.toLocaleString();
    };
    App.prototype.refreshData = function () {
        this.crudUser.refresh();
        dateTime.classList.remove("hidden");
        document.getElementById("dateAndTime").innerHTML = dt.toLocaleString();
    };
    return App;
}());
new App();
