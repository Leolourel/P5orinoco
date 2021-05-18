 /**
 *@desc class pour parametrer la panier
 *@class
 */
export default class Basket {
     /**
      * @desc
      * @constructor
      */
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


     /**
      * @desc sauvegarde le panier dans le localStorage
      * @private
      */
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

     /**
      * @desc Diminue et supprime la quantité de la caméra dans le panier
      * @param camera
      */
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
      * @desc Méthode displau pour afficher le contenu du panier dans le DOM
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

        //Personnalisation du texte des en tete de la classe panier
        imageHead.innerText = 'IMAGE';
        nameHead.innerText = 'NOM';
        descHead.innerText = 'DESCRIPTION';
        quantityHead.innerText = 'QUANTITE';
        priceHead.innerText = 'PRIX';
        suppHead.innerText = 'SUPPRIMER';

        //Création des noeuds pour les en tete du tableau
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

        //Personnalisation du texte des pieds de page du tableau
        totalPriceFoot.innerText = 'PRIX TOTAL';
        totalPriceContainerFoot.innerText = totalPrice;

        //Ajout des classes et des attribus des pieds de pages du tableau
        totalPriceFoot.setAttribute("colspan", 4);
        totalPriceFoot.classList.add('borderTd');
        totalPriceContainerFoot.classList.add('borderTd');

        //Création des noeuds des pieds de pages du tableau
        tableBasket.appendChild(tableFoot);
        tableFoot.appendChild(totalPriceFoot);
        tableFoot.appendChild(totalPriceContainerFoot);

        // Pour chaque caméras présentes dans le localStorage on l'affiches dans le DOM Panier
        for (const [_id, camera] of Object.entries(this.content)) {

                //Création de la structure HTML du tableau panier
                let lineProduct = document.createElement('tr');
                tableBasket.appendChild(lineProduct);

                //Création des colones du tableau Panier
                let nameProduct = document.createElement('td');
                let priceProduct = document.createElement('td');
                let desctProduct = document.createElement('td');
                let imgProductContainer = document.createElement('td');
                let imgProduct = document.createElement('img');
                let quantityProduct = document.createElement('td');
                let removeProduct = document.createElement('td');

                //Ajout des valeurs de la caméra dans les colones du panier
                nameProduct.innerText = camera.name;
                priceProduct.innerText = camera.price/100 * camera.quantity + " €";
                desctProduct.innerText =  camera.description;
                imgProduct.setAttribute("src",camera.imageUrl) ;
                quantityProduct.innerText = camera.quantity;

                //Mise en page des colones du tableau
                lineProduct.appendChild(imgProductContainer);
                imgProductContainer.appendChild(imgProduct);
                lineProduct.appendChild(nameProduct);
                lineProduct.appendChild(desctProduct);
                lineProduct.appendChild(quantityProduct);
                lineProduct.appendChild(priceProduct);
                lineProduct.appendChild(removeProduct)

                //Ajout des classes css
                imgProduct.classList.add('imagePanier');
                nameProduct .classList.add('borderTd');
                priceProduct.classList.add('borderTd');
                desctProduct.classList.add('borderTd');
                imgProductContainer.classList.add('borderTd');
                quantityProduct.classList.add('borderTd');
                removeProduct.classList.add('borderTd');

                // Bouton augmenter la quantité
                const buttonQuantityMoreBasket = document.createElement("button");
                buttonQuantityMoreBasket.innerText = '+';
                buttonQuantityMoreBasket.addEventListener('click', this.addQuantity.bind(this, camera));
                quantityProduct.appendChild(buttonQuantityMoreBasket);

                //Bouton diminuer la quantité
                const buttonQuantityLessBasket = document.createElement("button");
                buttonQuantityLessBasket.innerText = '-';
                buttonQuantityLessBasket.addEventListener('click', this.removeQuantity.bind(this, camera));
                quantityProduct.appendChild(buttonQuantityLessBasket);

                //Bouton supprimer la caméra du panier
                const buttonRemoveBasket = document.createElement("button");
                buttonRemoveBasket.innerText = "X";
                buttonRemoveBasket.addEventListener('click', this.remove.bind(this, camera));
                removeProduct.appendChild(buttonRemoveBasket);


        }

    }


}
