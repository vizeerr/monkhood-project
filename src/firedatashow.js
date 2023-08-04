import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getFirestore, addDoc,deleteDoc, collection, updateDoc,getDocs,doc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js"


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

const datatable = document.getElementById('datatable')

const querySnapshot = await getDocs(collection(db, "users"));

    var s=1;

querySnapshot.forEach((docs) => {
        let row = document.createElement("tr")
        row.innerHTML += `
        <td>${s}</td>
        <td>${docs.id}</td>
        <td>${docs.data().name}</td>
        <td>${docs.data().phone_number}</td>
        <td>${docs.data().email}</td>
        <td>${docs.data().date_of_birth}</td>
        <td> <img src = "${docs.data().profilePic}"/></td>`
    let col = document.createElement("td");
    let delbtn = document.createElement("img");
    delbtn.src = "https://img.icons8.com/material-rounded/24/ff0000/filled-trash.png"
    delbtn.width = "24";
    delbtn.height = "24";
    delbtn.style.width = "24px"
    delbtn.style.margin = "10px"
    let editbtn = document.createElement("img");
    editbtn.src = "https://img.icons8.com/ios/50/edit--v1.png"
    editbtn.width = "24";
    editbtn.height = "24";
    editbtn.style.width = "24px"
    editbtn.style.margin = "10px"
    
    delbtn.addEventListener('click',()=>{
        if(window.confirm("Delete It ?")){
            const cellid = docs.id;
            const docRef = doc(db, "users", cellid);
            deleteDoc(docRef)
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
            
        }
    })

    editbtn.addEventListener('click',()=>{

        const editform = document.getElementById('editform');
        editform.style.opacity="1"
        document.getElementById('closeform').addEventListener('click',closeForm)
            const cellid = docs.id;
            const docRef = doc(db, "users", cellid);

            const userForm = document.getElementById('userForm');
            const name = document.getElementById('name')
            name.value = docs.data().name;
            const phoneNumber = document.getElementById('phoneNumber')
            phoneNumber.value = docs.data().phone_number;;
            const email = document.getElementById('email')
            email.value = docs.data().email;;
            const dateOfBirth = document.getElementById('dateOfBirth')
            dateOfBirth.value = docs.data().dateOfBirth;
            userForm.addEventListener('submit',async (e)=>{
                e.preventDefault();
                
                const updateData = {
                    name:name.value,
                    phone_number:phoneNumber.value,
                    email:email.value,
                    date_of_birth:dateOfBirth.value
                };
                updateDoc(docRef, updateData).then(() => {
                    alert("Document successfully updated!");
                    editform.style.opacity="0";
                })
                .catch((error) => {
                    alert("Error updating document: ", error);
                });
            })
            
    });
    col.appendChild(editbtn)
    col.appendChild(delbtn)
    row.appendChild(col)
    datatable.appendChild(row)
    s++; 
});


function closeForm(e){
    e.preventDefault()
    const editform = document.getElementById('editform')
    editform.style.opacity="0";
}