import Basket from "./Basket.js";

export default class Form {

    /**
     * @desc constructor de la classe formulaire, appel de la classe panier pour renvoyer le tableau produits._id en POST
     * @constructor
     */
    constructor() {
        //Récupération du panier
        const basket = new Basket()
        this.orderContent = Object.keys(basket.content);

        // Events
        let formDom = document.getElementById('formValidity');

        //Envoi du formulaire au click du bouton valider du formulaire
        if(formDom){
             formDom.addEventListener('submit', this._onValidForm.bind(this))
        }

    }


    /**
     * @desc methode display qui affiche le recapitulatif de la commmande sur la page confirmation.html avec l'identifiant de commande et qui affiche le formulaire sur la page panier si le panier n'est pas vide
     */
    display() {
        // Contenair HTML du formulaire
        let formValidate = document.getElementById('containerForm');

        //Si il y'a au moins un produit dans le panier afficher le formulaire
        if(this.orderContent.length >= 1){
            formValidate.classList.remove('displayOnlyValidate');
        }

        let storageContact = JSON.parse(sessionStorage.getItem("contact"));

        let clientNameDisplay = document.getElementById('nameClient');
        let orderId = document.getElementById('orderId')
        let clientMailDisplay = document.getElementById('clientMail');

        let orderSession = sessionStorage.getItem("orderId");

        //Condition qui permet d'afficher la confirmation que sur la page confirmation.html et n'interfere pas avec panier.html
        if(orderId){
            orderId.innerHTML = 'Votre identifiant de commande : ' + orderSession;
            clientMailDisplay.innerText = storageContact.email;
            clientNameDisplay.innerText = storageContact.firstName + " " + storageContact.lastName;
        }

    }



    /**
     * @desc methode de validation des regex en renvoyant true ou false
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
    }


    /**
     * @desc méthode qui envoie l'objet contact et le tableau d'id produits au serveur en méthode POST pour recevoir l'id de commande
     * @param contact paramétre recupérer
     * @private
     */
    _createContactOrder(contact) {

        // récupération du tableau d'id produit
        let productId = this.orderContent;

        //Objet contact et tableau id produit envoyé au serveur
        let body = {
            contact : contact,
            products : productId
        }

        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(function (orderNumber) {
                sessionStorage.setItem("contact", JSON.stringify(contact));
                sessionStorage.setItem('orderId', orderNumber.orderId);
                window.location.href = "confirmation.html";
                localStorage.clear();
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


            // création de l'objet contact si les regex sont bien remplis et que le panier contient au moins un article
            if (emailOk && lastNameOk && firstNameOk && addressOk && cityOk && this.orderContent.length >= 1 ) {
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