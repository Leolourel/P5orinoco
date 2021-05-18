import Basket from "./Basket.js";

export default class Form {

    /**
     * @desc
     * @constructor
     */
    constructor() {
        const basket = new Basket()
        this.orderContent = Object.keys(basket.content);

        console.log(this.orderContent);

        // Events
        let formDom = document.getElementById('formValidity');
        if(formDom){
             formDom.addEventListener('submit', this._onValidForm.bind(this))
        }

    }


    /**
     * @desc
     */
    display() {

        let orderSession = sessionStorage.getItem("orderId")
        let orderId = document.getElementById('orderId');

        if(orderId){
            orderId.innerHTML = 'Votre identifiant de commande : ' + orderSession;
        }
        // todo  pas de panier ne pas afficher le formulaire sur page basket


        // // confirmPrice.innerHTML = 'Montant total de votre commande : ' + this;
        // orderId.innerHTML = 'Votre identifiant de commande : ' + orderSession;
        // //
        // // console.log(this.orderContent);

    }



    /**
     * @desc
     * @param inputField
     * @param pattern
     * @return {boolean}
     * @private
     */
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



    _createContactOrder(contact) {

        let productId = this.orderContent;

        let body = {
            contact : contact,
            products : productId
        }

        console.log(productId);



        // console.log(formulaireClient);

        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(body),   // formClient
        })
            .then(response => response.json())
            .then(function (orderNumber) {
                sessionStorage.setItem("contact", JSON.stringify(contact));
                sessionStorage.setItem('orderId', orderNumber.orderId);
                window.location.href = "confirmation.html";
                // todo clear localStorage (sessionsStorage ?)
            })
            //SI PROBLEME API
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * @desc
     * @param e
     * @private
     */
    _onValidForm(e){

            e.preventDefault()
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

            // let zipCodeRegex = /^[0-9]{5}+$/;todo rajouter une validation de la regex pour zipcode

            //Test des différents inputs du formulaire
            const emailOk = this._validateField(mail, emailRegex);
            const lastNameOk = this._validateField(lastName, lastNameRegex);
            const firstNameOk = this._validateField(firstName, firstNameRegex);
            const addressOk = this._validateField(address, addressRegex);
            const cityOk = this._validateField(city, cityRegex);



        if (emailOk && lastNameOk && firstNameOk && addressOk && cityOk && this.orderContent.length >= 1 ) { //&& this.orderContent.length >= 1
            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                email : mail.value,
                address : address.value,
                city : city.value,
            };
            this._createContactOrder(contact)
        } else {
            alert('Une erreur est survenue votre panier est peut étre vide ou le formulaire n\'a pas été correctement rempli!')
        }




    }


}