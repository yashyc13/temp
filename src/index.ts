import curdInterface from "./interface.js";
import { Role } from "./role.js";
import { User } from "./user.js";
import jsonData from "./data.json" assert { type: "json" };

export class crudApp implements curdInterface {
  users: User[];
  col: string[];
  roleType: string[];
  data: any[];
  tableContainer: HTMLDivElement;
  td: HTMLElement;
  constructor() {
    this.col = [];
    this.data = jsonData;
    this.users = [];
    this.roleType = ["Super Admin", "Admin", "Subscriber"];
    this.tableContainer = document.getElementById(
      "container"
    )! as HTMLDivElement;
  }
  loadData(): void {
    this.data.forEach((element) => {
      this.users.push(
        new User({
          id: element.id,
          firstName: element.firstName,
          middleName: element.middleName,
          lastName: element.lastName,
          email: element.email,
          phone: element.phone,
          role:
            element.role === "Super Admin" ? Role.superadmin : element.role === "Admin" ? Role.admin : Role.subscriber,
          address: element.address,
        })
      );
    });
  }
  createTable(): void {
    for (let i = 0; i < this.data.length; i++) {
      for (let key in this.data[i]) {
        if (this.col.indexOf(key) === -1) {
          this.col.push(key);
        }
      }
    }
    let table = document.createElement("table");
    table.setAttribute("id", "dataTable");
    var tr = table.insertRow(-1);
    for (let c = 0; c <= this.col.length; c++) {
      let th = document.createElement("th");
      if (this.col[c] !== undefined) {
        th.innerHTML = this.col[c];
        tr.appendChild(th);
      } else {
        th.innerHTML = "Options";
        tr.appendChild(th);
      }
    }
    //Adding rows
    for (let i = 0; i < this.data.length; i++) {
      tr = table.insertRow(-1);
      for (let j = 0; j < this.col.length; j++) {
        let tabcell = tr.insertCell(-1);
        tabcell.innerHTML = this.data[i][this.col[j]];
      }
      this.td = document.createElement("td");
      
      //Edit Btn 
      tr.appendChild(this.td);
      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.setAttribute("id", "Edit");
      editBtn.addEventListener("click", (e: Event) => this.update(e));
      this.td.appendChild(editBtn);
      
      //Delete Btn
      tr.appendChild(this.td);
      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.setAttribute("id", "Delete");
      deleteBtn.addEventListener("click", (e: Event) => this.delete(e));
      this.td.appendChild(deleteBtn);
    }
    // Empty Row for Adding New Data at end of the Table

    tr = table.insertRow(-1); 

    for (let j = 0; j < this.col.length; j++) {
      let newCell = tr.insertCell(-1);
      if (j >= 1) {
        if (j == 6) {
          //Dropdown list for role Type selection
          let select = document.createElement("select"); 
          select.innerHTML = '<option value=""></option>';
          for (let k = 0; k < this.roleType.length; k++) {
            select.innerHTML =
              select.innerHTML +
              '<option value="' +
              this.roleType[k] +
              '">' +
              this.roleType[k] +
              "</option>";
          }
          newCell.appendChild(select);
        } else {
          let tBox = document.createElement("input"); // to create input textbox
          tBox.setAttribute("type", "text");
          tBox.setAttribute("value", "");
          newCell.appendChild(tBox);
        }
      }
    }

    this.td = document.createElement("td");
    tr.appendChild(this.td);

    let createBtn = document.createElement("button");
    createBtn.innerHTML = "Create";
    createBtn.setAttribute("id", "createBtn");
    createBtn.addEventListener("click", (e: Event) => this.create(e));
    this.td.appendChild(createBtn);

    this.tableContainer.innerHTML = "";
    this.tableContainer.appendChild(table);
  }

  update(e: Event) {
    let currentRow = e.target! as HTMLElement;
    let tr = currentRow.parentElement.parentElement! as HTMLTableRowElement;
    let nextSibling = currentRow.nextElementSibling! as HTMLElement;
    if (currentRow.innerHTML === "Edit") {
      tr.contentEditable = "true";
      currentRow.innerHTML = "Save";
      nextSibling.innerHTML = "Cancel";
      nextSibling.contentEditable = "false";
      currentRow.contentEditable = "false";
    } else {
      tr.contentEditable = "false";
      currentRow.innerHTML = "Edit";
      nextSibling.innerHTML = "Delete";
    }
  }

  delete(e: Event): void {
    let currentRow = e.target! as HTMLElement;
    let tr = currentRow.parentElement.parentElement! as HTMLTableRowElement;
    let index = tr.rowIndex;
    let editBtn = document.getElementById("Edit");
    if (currentRow.innerHTML === "Delete") {
      tr.parentElement.removeChild(tr);
      this.data.splice(index - 1, 1);
    } else if (currentRow.innerHTML === "Cancel") {
      tr.contentEditable = "false";
      for (let i = 0; i < tr.children.length - 1; i++) {
        tr.children[i].innerHTML = this.data[index - 1][this.col[i]];
      }
      currentRow.innerHTML = "Delete";
      editBtn.innerHTML = "Edit";
    }
  }

  create(e: Event): void {
    let act = e.target! as HTMLElement;
    let tr = act.parentElement.parentElement! as HTMLTableRowElement;
    let tab = document.getElementById("container")! as HTMLTableElement;
    let rows = tab.querySelectorAll("tr");
    let currentRowIndex = tr.rowIndex;
    let row = rows[currentRowIndex];
    let addNewDataObj = {};

    // Adding new value to user array 
    for (let i = 1; i < this.col.length; i++) {
      let td = row.getElementsByTagName("td")[i];

      let currentVal = (<HTMLInputElement>td.childNodes[0]).value;

      if (currentVal != "") {
        addNewDataObj[this.col[i]] = currentVal.trim();
      } else {
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
  }

  read(): void {}

  refresh(): void {
    this.tableContainer.innerHTML = " ";
    setTimeout(() => {
      this.tableContainer.removeChild(this.tableContainer.firstChild);
      this.createTable();
    }, 100);
  }
}
