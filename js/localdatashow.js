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

  
  async function renderUserData() {
    const datatable = document.getElementById('datatable');
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
      
      
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((cells) => {
          const formData = {
            keys:cells.id,
            name: cells.data().name,
            phoneNumber: cells.data().phone_number,
            email: cells.data().email,
            profilePic: cells.data().profilePic,
            dateOfBirth: cells.data().date_of_birth
          };
          users.push(formData)
        })
      localStorage.setItem("users", JSON.stringify(users));

      
      users.forEach((user, s) => {
        
        const row = createTableRow(user, s);
        datatable.appendChild(row);
      });
  }
  
  function createTableRow(user, s) {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${s + 1}</td>
      <td>${user.keys}</td>
      <td>${user.name}</td>
      <td>${user.phoneNumber}</td>
      <td>${user.email}</td>
      <td>${user.dateOfBirth}</td>
      <td><img src="${user.profilePic}" alt="Profile Picture" /></td>`;
    const col = document.createElement('td');
    const delbtn = createIconButton('https://img.icons8.com/material-rounded/24/ff0000/filled-trash.png', 'Delete');
    const editbtn = createIconButton('https://img.icons8.com/ios/50/edit--v1.png', 'Edit');

    delbtn.addEventListener('click', () => deleteUserData(s,user.keys));
    editbtn.addEventListener('click', () => openEditForm(s,user));

    col.appendChild(editbtn);
    col.appendChild(delbtn);
    row.appendChild(col);

    return row;
  }

  function createIconButton(iconSrc, altText) {
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.width = '24';
    icon.height = '24';
    icon.style.width = '24px';
    icon.style.margin = '10px';
    icon.alt = altText;
    return icon;
  }

  async function deleteUserData(index,delId) {
    if (window.confirm("Delete It ?")) {
      const docRef = doc(db, "users", delId);
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users));
      try {
        await deleteDoc(docRef);
        alert("Document successfully deleted!");
        renderUserData();
      } catch (error) {
        alert("Error removing document: " + error);
      }
    }
  }

  function openEditForm(index,user) {
    const editform = document.getElementById('editform');
    editform.style.visibility = 'visible';
    editform.style.opacity = '1';
    document.getElementById('closeform').addEventListener('click', closeForm);

    const userForm = document.getElementById('userForm');
    const name = document.getElementById('name');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const dateOfBirth = document.getElementById('dateOfBirth');

    name.value = user.name;
    phoneNumber.value = user.phoneNumber;
    email.value = user.email;
    dateOfBirth.value = user.dateOfBirth;

    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const users = JSON.parse(localStorage.getItem('users')) || [];
        users[index].name= name.value
        users[index].phoneNumber= phoneNumber.value
        users[index].email= email.value
        users[index].dateOfBirth= dateOfBirth.value
      const docRef = doc(db, "users", user.keys);
      const updateData = {
        name: name.value,
        phone_number: phoneNumber.value,
        email: email.value,
        date_of_birth: dateOfBirth.value,
      };
      try {
        await updateDoc(docRef, updateData);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Document successfully updated!');
        editform.style.opacity = '0';
        editform.style.visibility = 'hidden';

        renderUserData();
      } catch (error) {
        alert("Error updating document: " + error);
      }

      
    });
  }

  function closeForm(e) {
    e.preventDefault();
    const editform = document.getElementById('editform');
    editform.style.opacity = '0';
    editform.style.visibility = 'hidden';
  }
  renderUserData();


