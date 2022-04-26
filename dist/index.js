import { Role } from "./role.js";
import { User } from "./user.js";
import jsonData from "./data.json" assert { type: "json" };
var crudApp = /** @class */ (function () {
    function crudApp() {
        this.col = [];
        this.data = jsonData;
        this.users = [];
        this.roleType = ["Super Admin", "Admin", "Subscriber"];
        this.tableContainer = document.getElementById("container");
    }
    crudApp.prototype.loadData = function () {
        var _this = this;
        this.data.forEach(function (element) {
            _this.users.push(new User({
                id: element.id,
                firstName: element.firstName,
                middleName: element.middleName,
                lastName: element.lastName,
                email: element.email,
                phone: element.phone,
                role: element.role === "Super Admin" ? Role.superadmin : element.role === "Admin" ? Role.admin : Role.subscriber,
                address: element.address,
            }));
        });
    };
    crudApp.prototype.createTable = function () {
        var _this = this;
        for (var i = 0; i < this.data.length; i++) {
            for (var key in this.data[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }
        var table = document.createElement("table");
        table.setAttribute("id", "dataTable");
        var tr = table.insertRow(-1);
        for (var c = 0; c <= this.col.length; c++) {
            var th = document.createElement("th");
            if (this.col[c] !== undefined) {
                th.innerHTML = this.col[c];
                tr.appendChild(th);
            }
            else {
                th.innerHTML = "Options";
                tr.appendChild(th);
            }
        }
        //Adding rows
        for (var i = 0; i < this.data.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < this.col.length; j++) {
                var tabcell = tr.insertCell(-1);
                tabcell.innerHTML = this.data[i][this.col[j]];
            }
            this.td = document.createElement("td");
            //Edit Btn 
            tr.appendChild(this.td);
            var editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.setAttribute("id", "Edit");
            editBtn.addEventListener("click", function (e) { return _this.update(e); });
            this.td.appendChild(editBtn);
            //Delete Btn
            tr.appendChild(this.td);
            var deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute("id", "Delete");
            deleteBtn.addEventListener("click", function (e) { return _this.delete(e); });
            this.td.appendChild(deleteBtn);
        }
        // Empty Row for Adding New Data at end of the Table
        tr = table.insertRow(-1);
        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {
                if (j == 6) {
                    //Dropdown list for role Type selection
                    var select = document.createElement("select");
                    select.innerHTML = '<option value=""></option>';
                    for (var k = 0; k < this.roleType.length; k++) {
                        select.innerHTML =
                            select.innerHTML +
                                '<option value="' +
                                this.roleType[k] +
                                '">' +
                                this.roleType[k] +
                                "</option>";
                    }
                    newCell.appendChild(select);
                }
                else {
                    var tBox = document.createElement("input"); // to create input textbox
                    tBox.setAttribute("type", "text");
                    tBox.setAttribute("value", "");
                    newCell.appendChild(tBox);
                }
            }
        }
        this.td = document.createElement("td");
        tr.appendChild(this.td);
        var createBtn = document.createElement("button");
        createBtn.innerHTML = "Create";
        createBtn.setAttribute("id", "createBtn");
        createBtn.addEventListener("click", function (e) { return _this.create(e); });
        this.td.appendChild(createBtn);
        this.tableContainer.innerHTML = "";
        this.tableContainer.appendChild(table);
    };
    crudApp.prototype.update = function (e) {
        var currentRow = e.target;
        var tr = currentRow.parentElement.parentElement;
        var nextSibling = currentRow.nextElementSibling;
        if (currentRow.innerHTML === "Edit") {
            tr.contentEditable = "true";
            currentRow.innerHTML = "Save";
            nextSibling.innerHTML = "Cancel";
            nextSibling.contentEditable = "false";
            currentRow.contentEditable = "false";
        }
        else {
            tr.contentEditable = "false";
            currentRow.innerHTML = "Edit";
            nextSibling.innerHTML = "Delete";
        }
    };
    crudApp.prototype.delete = function (e) {
        var currentRow = e.target;
        var tr = currentRow.parentElement.parentElement;
        var index = tr.rowIndex;
        var editBtn = document.getElementById("Edit");
        if (currentRow.innerHTML === "Delete") {
            tr.parentElement.removeChild(tr);
            this.data.splice(index - 1, 1);
        }
        else if (currentRow.innerHTML === "Cancel") {
            tr.contentEditable = "false";
            for (var i = 0; i < tr.children.length - 1; i++) {
                tr.children[i].innerHTML = this.data[index - 1][this.col[i]];
            }
            currentRow.innerHTML = "Delete";
            editBtn.innerHTML = "Edit";
        }
    };
    crudApp.prototype.create = function (e) {
        var act = e.target;
        var tr = act.parentElement.parentElement;
        var tab = document.getElementById("container");
        var rows = tab.querySelectorAll("tr");
        var currentRowIndex = tr.rowIndex;
        var row = rows[currentRowIndex];
        var addNewDataObj = {};
        // Adding new value to user array 
        for (var i = 1; i < this.col.length; i++) {
            var td = row.getElementsByTagName("td")[i];
            var currentVal = td.childNodes[0].value;
            if (currentVal != "") {
                addNewDataObj[this.col[i]] = currentVal.trim();
            }
            else {
                addNewDataObj = "";
                alert("Fill all Details");
                break;
            }
        }
        addNewDataObj[this.col[0]] = this.data.length + 1; // Creating new id
        if (Object.keys(addNewDataObj).length > 0) {
            // to check new created obj is not empty 
            this.data.push(addNewDataObj); // to push data to the json array 
            this.createTable();
        }
    };
    crudApp.prototype.read = function () { };
    crudApp.prototype.refresh = function () {
        var _this = this;
        this.tableContainer.innerHTML = " ";
        setTimeout(function () {
            _this.tableContainer.removeChild(_this.tableContainer.firstChild);
            _this.createTable();
        }, 100);
    };
    return crudApp;
}());
export { crudApp };
