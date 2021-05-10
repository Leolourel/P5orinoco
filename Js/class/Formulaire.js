import Panier from "./Panier.js";

export default class Formulaire {


    constructor() {
        const panier = new Panier()
        this.orderContent = panier.content
    }


    display(){

     // let confirmPrice = document.getElementById('totalPrice');
     // let orderId = document.getElementById('orderId');
     //
     // confirmPrice.innerHTML = 'Montant total de votre commande : ' + this;
     // orderId.innerHTML = 'Votre identifiant de commande : ' +
     //
     // console.log(this.orderContent);

}

    //display switch case confiramtion et formulaire, boucle if pour afiicher ou non si pas present sur la bonne page 


    regex(){

        // Récupération des inputs du DOM formulaire de validation

    let firstName = document.getElementById('firstName').value;

    let lastName = document.getElementById('lastNameName').value;

    let mail = document.getElementById('email').value;

    let address = document.getElementById('adresse').value;

    let city = document.getElementById('city').value;



        }


//
// Définition des différentes Regex utilisées formulaire de validation
//     let
//     firstNameRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
//     let
//     lastNameRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
//     let
//     adresseRegex = /^[0-9a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s",.]+$/;
//     let
//     cityRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
//     let
//     emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$/;
//     let
//     zipCodeRegex = /^[0-9]{5}+$/;
}