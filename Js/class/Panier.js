 /**
 *@desc class pour parametrer la panier
 *@class
 */
export default class Panier {
// methode remove,  methode gerer les quantités, méthode prix total

    constructor() {
        // on vérifi si le localStorage contient un panier
         const basketFromStorage = JSON.parse(localStorage.getItem('basket'));
         // Si on a un panier on recupere le contenu
        if (basketFromStorage){
            this.content = basketFromStorage;
            console.log(this.content);
        }
        // Sinon on en creer un
        else {
            this.content = {};
            this._saveContentToLocaleStorage();
        }
        this.displayBasket();
    }


     // sauvegarder le contenu dans le localStorage
    _saveContentToLocaleStorage() {
        localStorage.setItem('basket',JSON.stringify(this.content));
        this.displayBasket();
    }


    /**
     * @desc fonction boutton ajout de la caméra dans le panier
     * @param {Camera} camera
     */
    add(camera) {
        // Si la camera n'existe pas dans le panier l'ajouter
        console.log(camera)
        if(this.content[camera._id] === undefined){
            this.content[camera._id] = camera;
        }
        // Si elle existe deja augmenter la quantité (todo)
        else{
            const cameraFromBasket = this.content[camera._id];
            cameraFromBasket.quantity++;
            this.content[camera._id] = cameraFromBasket;
            console.log('augmenter la quantité todo')
        }
        this._saveContentToLocaleStorage();
    }

    /**
     * @desc fonction supprimer la caméra du panier
     * @todo ajouter le bouton a la page panier une fois créer
     */
    remove(camera) {
        delete this.content[camera._id];
        this._saveContentToLocaleStorage();
    }


     /**
      * @desc Afficher le contenu du panier dans le DOM
      * @todo reussir à afficher l'img correctement dans le dom
      */

    displayBasket() {

        // Pour chaque caméras présentes dans le localStorage on l'affiches dans le DOM Panier
        for (const [_id, camera] of Object.entries(this.content)) {

                //Création de la structure HTML du tableau panier
                let tableBasket = document.getElementById('panier');
                let ligneProduit = document.createElement('tr');
                tableBasket.appendChild(ligneProduit);



                //Création des colones du tableau Panier
                let nomProduit = document.createElement('td');
                let prixProduit = document.createElement('td');
                let descriptionProduit = document.createElement('td');
                let imgProduitContainer = document.createElement('td');
                let imgProduit = document.createElement('img');
                let quantityProduit = document.createElement('td');

                //Ajout des valeurs de la caméra dans les colones du panier
                nomProduit.innerText = camera.name;
                prixProduit.innerText = camera.price/100 + " €";
                descriptionProduit.innerText =  camera.description;
                imgProduit.setAttribute("src",camera.imageUrl) ;
                quantityProduit.innerText = camera.quantity;

                //Mise en page des colones du tableau
                ligneProduit.appendChild(imgProduitContainer);
                imgProduitContainer.appendChild(imgProduit)
                ligneProduit.appendChild(nomProduit);
                ligneProduit.appendChild(descriptionProduit);
                ligneProduit.appendChild(quantityProduit);
                ligneProduit.appendChild(prixProduit);

                //Ajout des classes css
                imgProduit.classList.add('imagePanier');
                nomProduit .classList.add('borderTd');
                prixProduit.classList.add('borderTd');
                descriptionProduit.classList.add('borderTd');
                imgProduitContainer.classList.add('borderTd');
                quantityProduit .classList.add('borderTd');

                //Création du bouton gerer la quantité
                // const removeBasket = document.createElement("button");
                // removeBasket.innerText = 'Supprimer du panier';
                // removeBasket.addEventListener('click',this._removeBasket.bind(this) );
                // divTitleDescProduit.appendChild(removeBasket);


                let totalPrice = camera.price * camera.quantity / 100;
                console.log(totalPrice);
                //
                // let totalCamera = this.content.length;
                // console.log(totalCamera);

                // créer bouton gerer la quantité
                // créer bouton supprimer du panier
                // créer bouton prix total


            // console.log(camera);
        }

    }


    // totalPrice(camera) {
    //     let prixPanier = camera.quantity * camera.price / 100;
    //     console.log(prixPanier);
    // }
}
