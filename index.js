// function onsignup(event) {
//   //?? it stops refreshing
//   event.preventDefault();
//   console.log(event.target.email.value);
// }

function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailId.value;
  const phonenumber = event.target.phonenumber.value;

  const obj = {
    name,
    email,
    phonenumber,
  };

  //!! we store it in crud crud
  axios
    .post(
      "https://crudcrud.com/api/936ffe16261444e89484affc5c45bbef/storage",
      obj
    )
    .then((response) => {
      showNewUserOnScreen(response.data);
      console.log(response);
    })
    .catch((err) => console.log(err));

  // // localStorage.setItem(obj.email, JSON.stringify(obj));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/936ffe16261444e89484affc5c45bbef/storage")
    .then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));

  // const localStorageObj = localStorage;
  // const localStorageKeys = Object.keys(localStorageObj);

  // for (let i = 0; i < localStorageKeys.length; i++) {
  //   const key = localStorageKeys[i];
  //   const userDetailsString = localStorageObj[key];
  //   const userDetailsObj = JSON.parse(userDetailsString);

  // }
});
function showNewUserOnScreen(user) {
  const parentNode = document.getElementById("listOfUsers");
  const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
    <button onclick=deleteUser('${user.email}')> Delete User </button>
    <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit User</button>
  </li>`;

  // Append the new content to the existing content
  parentNode.innerHTML += childHTML;
}

//Ediitng
function editUserDetails(emailId, name, phonenumber) {
  document.getElementById("email").value = emailId;
  document.getElementById("username").value = name;
  document.getElementById("phonenumber").value = phonenumber;

  deleteUser(emailId);
}

//deleting

function deleteUser(emailId) {
  // localStorage.removeItem(emailId);
  axios
    .delete(
      `https://crudcrud.com/api/936ffe16261444e89484affc5c45bbef/storage/${emailId}`
    )
    .then((response) => {
      removeUserFromScreen(emailId);
      console.log(response);
    })
    .catch((err) => console.log(err));
}

function removeUserFromScreen(emailId) {
  const parentNode = document.getElementById("listOfUsers");
  const childNodeToBeDeleted = document.getElementById(emailId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
