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


    formValidity(){

        // Récupération des inputs du formulaire de validation

        let firstName = document.getElementById('firstName').value;

        let lastName = document.getElementById('lastNameName').value;

        let mail = document.getElementById('email').value;

        let address = document.getElementById('adresse').value;

        let city = document.getElementById('city').value;


        const validateForm = () => {

            // Définition des différentes Regex utilisées formulaire de validation

            let firstNameRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

            let lastNameRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

            let addressRegex = /^[0-9a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s",.]+$/;

            let cityRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

            let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$/;

            // let zipCodeRegex = /^[0-9]{5}+$/;

            //Test des différents inputs du formulaire
            const emailOk = validateField(mail, emailRegex);
            const lastNameOk = validateField(lastName, lastNameRegex);
            const firstNameOk = validateField(firstName, firstNameRegex);
            const addressOk = validateField(address, addressRegex);
            const cityOk = validateField(city, cityRegex);

            console.log(
                "email:",
                emailOk,
                "Name:",
                firstNameOk,
                "Lastname:",
                lastNameOk,
                "Address:",
                addressOk,
                "City:",
                cityOk
            );

            if (
                emailOk &&
                lastNameOk &&
                firstNameOk &&
                addressOk &&
                cityOk === true
            ) {
                return true;
            } else {
                return false;
            }

        };

        const validateField = (inputField, pattern) => {
            let regex = new RegExp(pattern, "g");
            let rex = regex.test(inputField.value);
            if (!rex) {
                if (inputField.classList.contains("good")) {
                    inputField.classList.remove("good");
                    inputField.classList.add("error");
                } else {
                    inputField.classList.add("error");
                }
            } else {
                if (inputField.classList.contains("error")) {
                    inputField.classList.remove("error");
                    inputField.classList.add("good");
                } else {
                    inputField.classList.add("good");
                }
            }
            return rex;
        };

        // //Test FirstName
        // if (firstNameRegex.test(firstName) == true || firstName == "") {
        //     console.log('firstname OK');
        // }else{
        //     checkMessage = 'error';
        //     console.log('error');
        // }
        //
        // //Test LastName
        // if (lastNameRegex.test(lastName) == true || lastName == "") {
        //     console.log('lastName OK');
        // }else{
        //     checkMessage = 'error';
        //     console.log('error');
        // }
        //
        // //Test address
        // if (addressRegex.test(address) == true || address == "") {
        //     console.log('address OK');
        // }else{
        //     checkMessage = 'error';
        //     console.log('error');
        // }
        //
        // //Test city
        // if (cityRegex.test(city) == true || city == "") {
        //     console.log('City OK');
        // }else{
        //     checkMessage = 'error';
        //     console.log('error');
        // }
        //
        // //Test Mail
        // if (emailRegex.test(mail) == true || mail == "") {
        //     console.log('email OK');
        // }else{
        //     checkMessage = 'error';
        //     console.log('error');
        // }


        // if tous les tests sont valides : checkmessage "" vide  et panier.length>0 -> objet contact
        // let contact = {
        //     nom: lastName,
        //     prenom: firstName,
        //     adresse: address,
        //     ville: city,
        //     email: mail,
        // };

    }




}