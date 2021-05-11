import Basket from "./Basket.js";

export default class Form {


    constructor() {
        const basket = new Basket()
        this.orderContent = basket.content


        // Events

        let formDom = document.getElementById('formValidity');

        formDom.addEventListener('submit', this._onValidForm.bind(this))
    }


    display() {

        // let confirmPrice = document.getElementById('totalPrice');
        // let orderId = document.getElementById('orderId');
        //
        // confirmPrice.innerHTML = 'Montant total de votre commande : ' + this;
        // orderId.innerHTML = 'Votre identifiant de commande : ' +
        //
        // console.log(this.orderContent);

    }

    //display switch case confiramtion et formulaire, boucle if pour afiicher ou non si pas present sur la bonne page 



    _validateField(inputField, pattern) {
        if(!inputField){
            throw inputField + ' n\'est pas défini'
        }
        let regex = new RegExp(pattern, "g");
        let rex = regex.test(inputField.value);
        if (!rex) {
            if (inputField.classList.contains("good")) {
                inputField.classList.remove("good");
                inputField.classList.add("error");
                console.log('error');
            } else {
                inputField.classList.add("error");
                console.log('error');

            }
        } else {
            if (inputField.classList.contains("error")) {
                inputField.classList.remove("error");
                inputField.classList.add("good");
                console.log('good');

            } else {
                inputField.classList.add("good");
                console.log('good');

            }
        }
        return rex;
    }

    // _validateFieldIsOk() {
    //     if (
    //         emailOk &&
    //         lastNameOk &&
    //         firstNameOk &&
    //         addressOk &&
    //         cityOk === true
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     };
    // }

    _onValidForm(e){
        e.preventDefault();
        console.log('test');
        // Récupération des inputs du formulaire de validation

        let firstName = document.getElementById('firstName');

        let lastName = document.getElementById('lastName');

        let mail = document.getElementById('email');

        let address = document.getElementById('adresse');

        let city = document.getElementById('city');


        // Définition des différentes Regex utilisées formulaire de validation

        let firstNameRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

        let lastNameRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

        let addressRegex = /^[0-9a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s",.]+$/;

        let cityRegex = /^[a-zA-Z-\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        // let zipCodeRegex = /^[0-9]{5}+$/;

        //Test des différents inputs du formulaire
        const emailOk = this._validateField(mail, emailRegex);
        const lastNameOk = this._validateField(lastName, lastNameRegex);
        const firstNameOk = this._validateField(firstName, firstNameRegex);
        const addressOk = this._validateField(address, addressRegex);
        const cityOk = this._validateField(city, cityRegex);


        // Fonction validation de tous les inputs
        function testFormOk() {
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

        console.log(testFormOk());



        // let testFormOk = this._validateFieldIsOk();
        // console.log(testFormOk);

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


        // if tous les tests sont valides  et panier.length>0 -> objet contact
        // let contact = {
        //     nom: lastName,
        //     prenom: firstName,
        //     adresse: address,
        //     ville: city,
        //     email: mail,
        // };

    }




}