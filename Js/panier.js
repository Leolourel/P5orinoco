// Récupération des inputs du DOM formulaire de validation
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastNameName');
let mail = document.getElementById('email');
let adresse = document.getElementById('adresse');
let zipCode = document.getElementById('zip');
let city = document.getElementById('city');



// Définition des différentes Regex utilisées formulaire de validation
let firstNameRegex =/^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
let lastNameRegex =/^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
let adresseRegex =/^[0-9a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s",.]+$/;
let cityRegex =/^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$/;
let zipCodeRegex =/^[0-9]{5}+$/;
