let btnAdd = document.getElementById('btn-Add');
let listView = document.querySelector('.contacts-list');
let form = document.getElementById('form');
let btnCancel = document.getElementById('btnannuler');

// Tableau de nos données
let contacts = [];

// Definition du mode

let Editionmode = false;

// Affichage du formulaire au clic du bouton
btnAdd.addEventListener('click', (e) => {
    btnAdd.classList.toggle("d-none");
    form.classList.toggle('d-none');
});

//disparition du formulaire et affichage du bouton ajouter sur Annuler

btnCancel.addEventListener('click', (e) =>{
  btnAdd.classList.toggle("d-none");
  form.classList.toggle('d-none');
});

// Recuperer les elements du formulaire au clic du bouton Submit

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let data  = new FormData(e.target);
  //console.log(data.get('name'));

  let contact = {
    'name' : data.get('name'),
    'prenom' : data.get('prenom'),
    'pays' : data.get('pays'),
    'genre' : data.get('genre'),
    'mail' : data.get('mail'),
    'phone' : data.get('phone'),
    'datenaiss' : data.get('datenaiss'),
    'age' : (new Date().getFullYear()) - (new Date (data.get('datenaiss')).getFullYear()),
   // 'fileselected' : data.get('file-select'),
  }

  contacts.push(contact);

  AfficherListe()
});

//Afficher le contact ajouté dans la liste des contacts
function AfficherListe(){
  listView.innerHTML = ''

  for (let index=0; index < contacts.length; index++) {

    //on crée la template

    let temp = `
    <div class="contact-item">
        <div class="profile">
            <img src="/images/LeTech.JPG" alt="">
        </div>
        <div class="info flex-grow-1 ms-3 mb-2" onclick="showMore(this)">
            <h2 class="h4 contact-name">${contacts[index].name} ${contacts[index].prenom}</h2>
            <p class="m-0">${contacts[index].pays}</p>
            <p class="m-0">${contacts[index].phone}</p>
            <p class="m-0 more d-none">${contacts[index].mail}</p>
            <p class="m-0 more d-none">${contacts[index].genre}<span>(${contacts[index].age}ans)</span></p>
        </div>
        <div class="actions">
            <button class="icons">
                <i class='bx bx-edit-alt'onclick="EditContact(${index})"></i>
                <i class='bx bxs-trash' onclick="deleteContact(${index})"></i>
            </button>
        </div>
    </div>
    
    `
    listView.innerHTML += temp
    
  }
}

// On definit la fonction qui va supprimer un element de la Liste

function deleteContact(index){
  contacts.splice(index, 1);
  AfficherListe();
}

// On definit la fonction qui va éditer un element de la liste

function EditContact(index){
  let contact = contacts[index];
  Editionmode = true;
}

// on definit la fonction ShowMore qui va afficher les infos cachés au clic

function showMore(e) {
  let mores = e.getElementsByClassName('more');
  for (const m of mores) {
    m.classList.toggle('d-none')
    
  }
}

AfficherListe();