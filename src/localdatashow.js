function renderUserData() {
    const datatable = document.getElementById('datatable')

    const users = JSON.parse(localStorage.getItem('users')) || [];


    users.forEach((user, s) => {

      const userDiv = document.createElement('div');
      userDiv.innerHTML = `<p>Name: ${user.name}</p><p>Email: ${user.email}</p>
                           <button onclick="editUserData(${s})">Edit</button>
                           <button onclick="deleteUserData(${s})">Delete</button>`;
      userDataDiv.appendChild(userDiv);


      let row = document.createElement("tr")
        row.innerHTML += `
        <td>${s+1}</td>
        <td>${user.name}</td>
        <td>${user.phone_number}</td>
        <td>${user.email}</td>
        <td>${user.date_of_birth}</td>`;

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
            deleteUserData(s);        
        }
    })

    editbtn.addEventListener('click',()=>{

        const editform = document.getElementById('editform');
        editform.style.opacity="1"
        document.getElementById('closeform').addEventListener('click',closeForm)

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
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users[s].name = name.value,
                users[s].phone_number = phoneNumber.value;
                users[s].email = email.value,
                users[s].date_of_birth = dateOfBirth.value
                localStorage.setItem('users', JSON.stringify(users));
            })
            
    });
    col.appendChild(editbtn)
    col.appendChild(delbtn)
    row.appendChild(col)
    datatable.appendChild(row)
    });
  }