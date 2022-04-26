import { crudApp } from "./index.js";
let dt = new Date();
let dateTime = document.getElementById("dispDate");
dateTime.classList.add("hidden");

class App {
  loadBtn: HTMLButtonElement;
  refreshBtn: HTMLButtonElement;
  crudUser: crudApp;

  date: string = "";
  constructor() {
    this.crudUser = new crudApp();
    this.loadBtn = document.getElementById("loadBtn")! as HTMLButtonElement;
    this.refreshBtn = document.getElementById("refreshBtn")! as HTMLButtonElement;
    this.loadBtn.addEventListener("click", () => this.loadData());
    this.refreshBtn.addEventListener("click", () => this.refreshData());
    this.refreshBtn.style.display = "none";
  }

  updateDate() {
    const datetime = document.getElementById("dateAndTime");
    datetime!.innerHTML = `Updated on - ${this.date.replace(",", " at ")}`;
  }
  loadData() {
    this.crudUser = new crudApp();
    this.crudUser.createTable();
    this.refreshBtn.style.display = "block";
    this.loadBtn.style.display = "none";
    dateTime.classList.remove("hidden");
    document.getElementById("dateAndTime").innerHTML = dt.toLocaleString();
  }
  refreshData() {
    this.crudUser.refresh();
    dateTime.classList.remove("hidden");
    document.getElementById("dateAndTime").innerHTML = dt.toLocaleString();
  }
}
new App();
