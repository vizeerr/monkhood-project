import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getFirestore,deleteDoc, collection, updateDoc,getDocs,doc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyBoWUPL_aBIRyjQkFfS12qTkulqQpngAI8",
    authDomain: "monkhood-55245.firebaseapp.com",
    projectId: "monkhood-55245",
    storageBucket: "monkhood-55245.appspot.com",
    messagingSenderId: "567445925428",
    appId: "1:567445925428:web:fa5c45ed49eae1e51ca461"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const datatable = document.getElementById("datatable");
  renderdata();

  async function renderdata() {
    datatable.innerHTML = `
      <tr>
        <th>Sno</th>
        <th>ID</th>
        <th>Name</th>
        <th>phoneNumber</th>
        <th>Email</th>
        <th>Date of Birth</th>
        <th>Profile Picture</th>
        <th>Tools</th>
      </tr>`;

    const querySnapshot = await getDocs(collection(db, "users"));
    let s = 1;
    querySnapshot.forEach((cells) => {
      const row = createTableRow(s, cells);
      datatable.appendChild(row);
      s++;
    });
  }

  function createTableRow(s, cells) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s}</td>
      <td>${cells.id}</td>
      <td>${cells.data().name}</td>
      <td>${cells.data().phone_number}</td>
      <td>${cells.data().email}</td>
      <td>${cells.data().date_of_birth}</td>
      <td><img src="${cells.data().profilePic}" alt="Profile Picture" /></td>`;

    const col = document.createElement("td");
    const delbtn = createIconButton(
      "https://img.icons8.com/material-rounded/24/ff0000/filled-trash.png",
      "Delete"
    );
    delbtn.addEventListener("click", () => deleteUserData(cells.id));

    const editbtn = createIconButton(
      "https://img.icons8.com/ios/50/edit--v1.png",
      "Edit"
    );
    editbtn.addEventListener("click", () => openEditForm(cells));

    col.appendChild(editbtn);
    col.appendChild(delbtn);
    row.appendChild(col);

    return row;
  }

  function createIconButton(iconSrc, altText) {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.width = "24";
    icon.height = "24";
    icon.style.width = "24px";
    icon.style.margin = "10px";
    icon.alt = altText;
    return icon;
  }

  async function deleteUserData(userId) {
    if (window.confirm("Delete It ?")) {
      const docRef = doc(db, "users", userId);
      try {
        await deleteDoc(docRef);
        alert("Document successfully deleted!");
        renderdata();
      } catch (error) {
        alert("Error removing document: " + error);
      }
    }
  }

  function openEditForm(cells) {
    const editform = document.getElementById("editform");
    editform.style.opacity = "1";
    editform.style.visibility = "visible";
    document.getElementById("closeform").addEventListener("click", closeForm);

    const userForm = document.getElementById("userForm");
    const name = document.getElementById("name");
    const phoneNumber = document.getElementById("phoneNumber");
    const email = document.getElementById("email");
    const dateOfBirth = document.getElementById("dateOfBirth");

    name.value = cells.data().name;
    phoneNumber.value = cells.data().phone_number;
    email.value = cells.data().email;
    dateOfBirth.value = cells.data().date_of_birth;

    userForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const docRef = doc(db, "users", cells.id);
      const updateData = {
        name: name.value,
        phone_number: phoneNumber.value,
        email: email.value,
        date_of_birth: dateOfBirth.value,
      };
      try {
        await updateDoc(docRef, updateData);
        alert("Document successfully updated!");
        editform.style.opacity = "0";
        editform.style.visibility = "hidden";
        renderdata();
      } catch (error) {
        alert("Error updating document: " + error);
      }
    });
  }

  function closeForm(e) {
    e.preventDefault();
    const editform = document.getElementById("editform");
    editform.style.opacity = "0";
    editform.style.visibility = "hidden";
  }

