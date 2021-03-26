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
    }

    _saveContentToLocaleStorage() {
        localStorage.setItem('basket',JSON.stringify(this.content));
    }


    add(camera) {
        // Si la camera n'existe pas dans le panier l'ajouter
        if(this.content[camera._id] === undefined){
            this.content[camera._id] = camera;
        }
        // Si elle existe deja augmenter la quantité (todo)
        else{
            console.log('augmenter la quantité todo')
        }
        this._saveContentToLocaleStorage();
        console.log(this);
    }

    remove() {

            if(window.localStorage.length > 0) {
                window.localStorage.clear();
                console.log('test');
                // window.localStorage.clear();
                window.location.reload();
            }

            else {
                console.log('erreur panier encore plein');
            }
            // this._saveContentToLocaleStorage();
            console.log(this);
            console.log(localStorage);
        }


    //
    // totalPrice(camera){
    //     let prixPanier = 0;
    //     prixPanier += camera.quantity
    // }



    /**
     * @desc afficher la camera dans le dom
     * @param type
     * @return  {HTMLElement} Template
     */
    // display(basketFromStorage, camera) {          if panier.length > 0     -> display
    //     // const template = this._getTemplate(type);
    //     // this.container.appendChild(template);
    //     if (basketFromStorage !== null){
    //
    //         productsInBasket.forEach(camera => {
    //
    //                         const containerHtmlPanier = document.getElementById('panier');
    //
    //             //Container principal
    //                         const containerPanier = document.createElement('div');
    //                         containerPanier.classList.add('row');
    //                         containerHtmlPanier.appendChild(containerPanier);
    //
    //             //
    //             //             //Container Image
    //                         const containerPanierImage = document.createElement('div');
    //                         containerPanierImage.classList.add('col','border','border-dark','mh-100');
    //                         containerPanierImage.src = $[camera.imageUrl];
    //                         containerPanier.appendChild(containerPanierImage);
    //             //
    //             //             //Container reference
    //                         const containerPanierRef = document.createElement('div');
    //                         containerPanierRef.classList.add('col','border','border-dark','mh-100');
    //                         containerPanierRef.textContent = $[camera._id];
    //                         containerPanier.appendChild(containerPanierRef);
    //             //
    //             //             //Container prix
    //                         const containerPanierPrix = document.createElement('div');
    //                         containerPanierPrix.classList.add('col','border','border-dark','mh-100');
    //                         containerPanierPrix.innerText = $[camera.price/100 + ' €'];
    //                         containerPanier.appendChild(containerPanierPrix);
    //
    //
    //
    //
    //         })
    //
    //     }
    //
    // }


    // _getTemplate(type) {
    //     switch (type) {
    //         case "monpanier":
    //
    //             //Container principal
    //             const containerPanier = document.createElement('div');
    //             containerPanier.classList.add('row');
    //
    //             //Container Image
    //             const containerPanierImage = document.createElement('div');
    //             containerPanierImage.classList.add('col','border','border-dark','mh-100');
    //             containerPanierImage.src = this.imageUrl;
    //             containerPanier.appendChild(containerPanierImage);
    //
    //             //Container reference
    //             const containerPanierRef = document.createElement('div');
    //             containerPanierRef.classList.add('col','border','border-dark','mh-100');
    //             containerPanierRef.textContent = this._id;
    //             containerPanier.appendChild(containerPanierRef);
    //
    //             //Container prix
    //             const containerPanierPrix = document.createElement('div');
    //             containerPanierPrix.classList.add('col','border','border-dark','mh-100');
    //             containerPanierPrix.innerText = this.price/100 + ' €';
    //             containerPanier.appendChild(containerPanierPrix);
    //
    //             //Container quantité -> créer +boutton +/-
    //             const containerPanierQuantite = document.createElement('div');
    //             containerPanierQuantite.classList.add('col','border','border-dark','mh-100');
    //             containerPanierQuantite.innerText = this.quandity;
    //             containerPanier.appendChild(containerPanierQuantite);
    //
    //             //Container boutton supprimer  -> créer boutton supp
    //             const containerPanierSupp = document.createElement('div');
    //             containerPanierSupp.classList.add('col','border','border-dark','mh-100');
    //             containerPanier.appendChild(containerPanierSupp);
    //
    //
    //             //Container prix total
    //
    //
    //             return containerPanier;
    //
    //             break;
    //
    //         default :
    //             throw "Aucun template n'est défini";
    //     }
    //
    // }
        // /**
        //  * @desc Container template
        //  * @param {HTMLElement} container
        //  * @return {HTMLElement} container
        //  */
        // setContainer(container)
        // {
        //     this.container = container;
        //
        // }


}