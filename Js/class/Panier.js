 /**
 *@desc class pour parametrer la panier
 *@class
 */
export default class Panier {

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


     // sauvegarder le contenu dans le localStorage
    _saveContentToLocaleStorage() {
        console.log(this.content);
        localStorage.setItem('basket',JSON.stringify(this.content));
        this.display();
    }


    /**
     * @desc fonction boutton ajout de la caméra dans le panier
     * @param {Camera} camera
     */
    add(camera) {
        // Si la camera n'existe pas dans le panier l'ajouter
        if(this.content[camera._id] === undefined){
            this.content[camera._id] = camera;
        }
        // Si elle existe deja augmenter la quantité
        else{
            const cameraFromBasket = this.content[camera._id];
            cameraFromBasket.quantity++;
            this.content[camera._id] = cameraFromBasket;
        }
        document.location.reload();
        this._saveContentToLocaleStorage();
    }

    /**
     * @desc fonction supprimer la caméra du panier
     * @param {Camera} camera
     */
    remove(camera) {
        delete this.content[camera._id];
        this._saveContentToLocaleStorage();
    }

     /**
      *  @desc Augmenter la quantitée de la caméra dans le panier
      * @param camera
      */
    addQuantity(camera){
        const cameraFromBasket = this.content[camera._id];
        cameraFromBasket.quantity++;
        this.content[camera._id] = cameraFromBasket;
        this._saveContentToLocaleStorage();
    }

    removeQuantity(camera){
        const cameraFromBasket = this.content[camera._id];
        cameraFromBasket.quantity--;
        if(cameraFromBasket.quantity < 1 ){
            this.remove(camera)
        }
        else{
            this.content[camera._id] = cameraFromBasket;
            this._saveContentToLocaleStorage();
        }
    }

     /**
      * @desc Afficher le contenu du panier dans le DOM
      *
      */

    display() {

        let tableBasket = document.getElementById('panier');

        if(!tableBasket){
            return;
        }

        tableBasket.innerHTML = "";

        //En tete du tableau panier
        let tableHead = document.createElement('tr');
        let imageHead = document.createElement('th');
        let nameHead = document.createElement('th');
        let descHead = document.createElement('th');
        let quantityHead = document.createElement('th');
        let priceHead = document.createElement('th');
        let suppHead = document.createElement('th');



        imageHead.innerText = 'IMAGE';
        nameHead.innerText = 'NOM';
        descHead.innerText = 'DESCRIPTION';
        quantityHead.innerText = 'QUANTITE';
        priceHead.innerText = 'PRIX';
        suppHead.innerText = 'SUPPRIMER';

        tableBasket.appendChild(tableHead);
        tableHead.appendChild(imageHead);
        tableHead.appendChild(nameHead);
        tableHead.appendChild(descHead);
        tableHead.appendChild(quantityHead);
        tableHead.appendChild(priceHead);
        tableHead.appendChild(suppHead);

        //Calcul du prix total
        let totalPrice = 0;
        for (const [_id, camera] of Object.entries(this.content)) {

            totalPrice += camera.price/100 * camera.quantity;
        }

        //Pied de page du tableau
        let tableFoot = document.createElement('tfoot');
        let totalPriceFoot = document.createElement('th');
        let totalPriceContainerFoot = document.createElement('th');

        totalPriceFoot.innerText = 'PRIX TOTAL';
        totalPriceContainerFoot.innerText = totalPrice;

        totalPriceFoot.setAttribute("colspan", 4);
        totalPriceFoot.classList.add('borderTd');
        totalPriceContainerFoot.classList.add('borderTd');

        tableBasket.appendChild(tableFoot);
        tableFoot.appendChild(totalPriceFoot);
        tableFoot.appendChild(totalPriceContainerFoot);


        // Pour chaque caméras présentes dans le localStorage on l'affiches dans le DOM Panier
        for (const [_id, camera] of Object.entries(this.content)) {

                //Création de la structure HTML du tableau panier
                let lineProduct = document.createElement('tr');
                tableBasket.appendChild(lineProduct);



                //Création des colones du tableau Panier
                let nomProduit = document.createElement('td');
                let prixProduit = document.createElement('td');
                let descriptionProduit = document.createElement('td');
                let imgProduitContainer = document.createElement('td');
                let imgProduit = document.createElement('img');
                let quantityProduit = document.createElement('td');
                let removeProduit = document.createElement('td');

                //Ajout des valeurs de la caméra dans les colones du panier
                nomProduit.innerText = camera.name;
                prixProduit.innerText = camera.price/100 * camera.quantity + " €";
                descriptionProduit.innerText =  camera.description;
                imgProduit.setAttribute("src",camera.imageUrl) ;
                quantityProduit.innerText = camera.quantity;

                //Mise en page des colones du tableau
                lineProduct.appendChild(imgProduitContainer);
                imgProduitContainer.appendChild(imgProduit)
                lineProduct.appendChild(nomProduit);
                lineProduct.appendChild(descriptionProduit);
                lineProduct.appendChild(quantityProduit);
                lineProduct.appendChild(prixProduit);
                lineProduct.appendChild(removeProduit)

                //Ajout des classes css
                imgProduit.classList.add('imagePanier');
                nomProduit .classList.add('borderTd');
                prixProduit.classList.add('borderTd');
                descriptionProduit.classList.add('borderTd');
                imgProduitContainer.classList.add('borderTd');
                quantityProduit.classList.add('borderTd');
                removeProduit.classList.add('borderTd');

                // Bouton augmenter la quantité
                const buttonQuantityMoreBasket = document.createElement("button");
                buttonQuantityMoreBasket.innerText = '+';
                buttonQuantityMoreBasket.addEventListener('click', this.addQuantity.bind(this, camera));
                quantityProduit.appendChild(buttonQuantityMoreBasket);

                 //Bouton diminuer la quantité
                 const buttonQuantityLessBasket = document.createElement("button");
                 buttonQuantityLessBasket.innerText = '-';
                 buttonQuantityLessBasket.addEventListener('click', this.removeQuantity.bind(this, camera));
                 quantityProduit.appendChild(buttonQuantityLessBasket);

                //Bouton supprimer la caméra du panier
                 const buttonRemoveBasket = document.createElement("button");
                 buttonRemoveBasket.innerText = "X";
                 buttonRemoveBasket.addEventListener('click', this.remove.bind(this, camera));
                 removeProduit.appendChild(buttonRemoveBasket);


        }

    }


}
