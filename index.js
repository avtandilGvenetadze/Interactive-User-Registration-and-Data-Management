"use strict";

const table = document.querySelector(".table");
const bodyElement = document.body;
const allInput = document.querySelectorAll(".input");
const mainForm = document.querySelector(".mainForm");
const row = document.querySelectorAll(".row");
const screenForNote = document.querySelector(".screenForNote");
const container = document.querySelector(".container");

///////////////////////////

let usersArrays = JSON.parse(localStorage.getItem("users")) || [];

usersArrays.forEach((element, index) => {
  const newTr = document.createElement("tr");
  newTr.classList.add("row");
  newTr.innerHTML = `
  <td>${index + 1}</td>
  <td>${element.name}</td>
  <td>${element.lastName}</td>
  <td>${element.adress}</td>
  <td>${element.date}</td>
  <td>${element.gender}</td>
  <td><button class="delete">&nbspdelete &nbsp </button></td>`;
  table.appendChild(newTr);
});

function clearNotes(event) {
  if (event.target.tagName !== "TD" && event.target.tagName !== "TH") {
    bodyElement.classList.remove("blur");
  }
}

const rows = document.querySelectorAll(".row");

function showNotes(index) {
  screenForNote.innerHTML = usersArrays[index].notes;
  bodyElement.classList.toggle("blur");
}

const deleteButtons = document.querySelectorAll(".delete");

function deleteUser(index) {
  usersArrays.splice(index, 1);
  if (usersArrays.length == 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("users", JSON.stringify(usersArrays));
  }

  location.reload();
}

function clearErrors(element) {
  if (element.previousElementSibling.tagName === "IMG") {
    element.style.border = "1px solid black";
    element.previousElementSibling.style.display = "none";
  }
}

function checkErrors(element) {
  if (!element.value && element.classList.contains("toBeChecked")) {
    element.nextElementSibling.style.display = "none";
    element.previousElementSibling.style.display = "inline";
    element.style.outline = "none";
    element.style.border = "2px solid red";
  } else if (element.classList.contains("toBeChecked")) {
    element.previousElementSibling.style.display = "none";
    element.nextElementSibling.style.display = "inline";
    element.style.border = "1px solid black";
  } else {
    element.nextElementSibling.style.display = "inline";
  }
}

function checkErrorsAndSaveInformation(e) {
  e.preventDefault();
  let error = false;
  allInput.forEach((element) => {
    if (!element.value && element.classList.contains("toBeChecked")) {
      error = true;
    }
  });

  if (!error) {
    usersArrays.push({
      name: allInput[0].value,
      lastName: allInput[1].value,
      adress: allInput[2].value,
      date: allInput[3].value,
      gender: allInput[4].value,
      notes: allInput[5].value,
    });

    localStorage.setItem("users", JSON.stringify(usersArrays));
    location.reload();
    return;
  }

  allInput.forEach((element) => checkErrors(element));
}

mainForm.addEventListener("submit", (e) => checkErrorsAndSaveInformation(e));

container.addEventListener("click", clearNotes);

rows.forEach((element, index) => {
  element.addEventListener("click", () => showNotes(index));
});

deleteButtons.forEach((element, index) => {
  element.addEventListener("click", () => deleteUser(index));
});

allInput.forEach((element) => {
  element.addEventListener("input", () => clearErrors(element));
});
