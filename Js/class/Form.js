import Basket from "./Basket.js";

export default class Form {


    constructor() {
        const basket = new Basket()
        this.orderContent = basket.content;


        console.log(Object.keys(this.orderContent));



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


    _onValidForm(e){
        // e.preventDefault();
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

            if (emailOk && lastNameOk && firstNameOk && addressOk && cityOk === true) {
                        return true;
                    } else {
                        return false;
                    }
        };

        console.log(testFormOk());


        // Création de l'objet contact si le formulaire est valide et le panier est rempli
        // todo : && panier.lenght >= 1
        function createContactOrder() {

            if (testFormOk() === true){
                   let contact = {
                       firstName: firstName.value,
                       lastName: lastName.value,
                       mail : mail.value,
                       address : address.value,
                       city : city.value,
                   }


                let formulaireClient = JSON.stringify({
                    contact,
                    // Object.keys(this.orderContent) tableau _id ??
                });

                fetch('http://localhost:3000/api/cameras/order', {
                    method: 'POST',
                    headers: {
                        'content-type': "application/json"
                    },
                    mode: "cors",
                    body: formulaireClient
                })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (r) {
                        sessionStorage.setItem("contact", JSON.stringify(r.contact));
                        window.location.assign("confirmation.html?order_id=" + r.order_id);
                    })
                    //SI PROBLEME API
                    .catch(function (err) {
                        console.log("fetch Error");
                    });
                   console.log(contact);
                } else {
                    alert('Une erreur est survenue votre panier est peut étre vide ou le formulaire n\'a pas été correctement rempli!')
            };
        }

        createContactOrder();


    }




}