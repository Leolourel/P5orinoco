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
        }
        // Sinon on en creer un
        else {
            this.content = {};
            this._saveContentToLocaleStorage();
        }
        this.display();
    }


     // sauvegarder le contenu dans le localStorage
    _saveContentToLocaleStorage() {
        localStorage.setItem('basket',JSON.stringify(this.content));
        this.display();
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


     //Afficher le contenu du panier dans le DOM
    display() {

        for (const [_id, camera] of Object.entries(this.content)) {

                let tableBasket = document.getElementById('panier');
                let ligneProduit = document.createElement('tr');
                tableBasket.appendChild(ligneProduit);
                //
                let nomProduit = document.createElement('th');
                let prixProduit = document.createElement('th');
                let descriptionProduit = document.createElement('th');

                nomProduit.innerText = JSON.stringify(this.content[name]);
                // prixProduit.innerText = this.content[price];
                descriptionProduit.innerText = this.content[camera.description];

                ligneProduit.appendChild(nomProduit);
                ligneProduit.appendChild(descriptionProduit);
                ligneProduit.appendChild(descriptionProduit);

            console.log(camera);
        }

    }

}