        
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getFirestore, collection, addDoc,getDocs} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
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

const userForm = document.getElementById('userForm');

userForm.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const profilePic = document.getElementById('profilePic').files[0];
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    const storage = getStorage();
    const storageRef = ref(storage, `profile_images/${profilePic.name}`);
    const uploadTask = uploadBytesResumable(storageRef, profilePic);
        try {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=> {
            await addDoc(collection(db, "users"), {
                name:name,
                phone_number:phoneNumber,
                email:email,
                profilePic:downloadURL,
                date_of_birth:dateOfBirth
            });
          })
          alert("Form Submitted Successfully")
          saveUserData(name, phoneNumber,email,dateOfBirth);
          
        } catch (error) {
          alert('Submission Failed', error)
        }
    userForm.reset();
}) 

function saveUserData(name, phoneNumber,email,dateOfBirth) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, phoneNumber,email,dateOfBirth });
    localStorage.setItem('users', JSON.stringify(users));
  }