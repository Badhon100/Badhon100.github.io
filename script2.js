const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  let messages = [];

  if (fname.value == "" || fname.value == null) {
    messages.push("First name is requred");
  }

  if (fname.value.search(/[0-9]/) == -1) {
  } else {
    messages.push("First Name can not contain numeric character");
  }

  if (fname.value.search(/[!/@/#/%/^/&/*/(/)/</>/+/-/_/,]/) == -1) {
  } else {
    messages.push("First Name can not contain special character");
  }

  if (lname.value == "" || lname.value == null) {
    messages.push("Last name is requred");
  }

  if (lname.value.search(/[0-9]/) == -1) {
  } else {
    messages.push("Last Name can not contain numeric character");
  }

  if (lname.value.search(/[!/@/#/%/^/&/*/(/)/</>/+/-/_/,]/) == -1) {
  } else {
    messages.push("Last Name can not contain special character");
  }
  if (email.value == "" || email.value == null) {
    messages.push("Email is requred");
  }

  if (password.value.search(/[0-9]/) == -1) {
    messages.push("Password needs atleast 1 numeric character");
  }

  if (password.value.search(/[a-z]/) == -1) {
    messages.push("Password needs atleast 1 lowercase character");
  }

  if (password.value.search(/[A-Z]/) == -1) {
    messages.push("Password needs atleast 1 uppercase character");
  }

  if (password.value.search(/[!/@/#/%/^/&/*/(/)/</>/+/-/_/,]/) == -1) {
    messages.push("Password needs atleast 1 special character");
  }

  if (password.value.length < 8) {
    messages.push("Password must be at least 8 characters");
  }

  if (password.value != password2.value) {
    messages.push("Password does not match");
  }

  if (messages.length > 0) {
    e.preventDefault();
    error.innerHTML = messages.join(", ");
  }
});
