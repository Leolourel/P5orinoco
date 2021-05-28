 /**
 *@desc class pour parametrer la panier
 *@class
 */
export default class Basket {
     /**
      * @desc
      * @constructor
      * @this key Basket localStorage
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
        alert('la caméra est ajoutée à votre panier');
        document.location.reload();
        this._saveContentToLocaleStorage();
    }

    /**
     * @desc fonction supprimer la caméra du panier
     * @param {Camera} camera
     * @todo modifier le plan de test avec l'ajout de la boucle if reload la page si plus de caméra dans le panier
     */
    remove(camera) {
        delete this.content[camera._id];
        if(Object.keys(this.content).length === 0) {
            document.location.reload();
        }
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
        let infoBasket = document.getElementById('infoBasket');
        let formValidate = document.getElementById('containerForm');

        if(!tableBasket){
            return;
        }


        tableBasket.innerHTML = "";

        if(Object.keys(this.content).length === 0) {
            infoBasket.classList.remove('displayOnlyNoBasket');
        }

        if(Object.keys(this.content).length >= 1){
            tableBasket.classList.remove('displayOnlyValidate');
            infoBasket.classList.add('displayOnlyNoBasket');
        }

         //Si il y'a au moins un produit dans le panier afficher le formulaire
         if(Object.keys(this.content).length >= 1){
             formValidate.classList.remove('displayOnlyValidate');
         }

        //En tete du tableau panier
        let tableHead = document.createElement('thead');
        let tableHeadTr = document.createElement('tr');
        let imageHead = document.createElement('th');
        let nameHead = document.createElement('th');
        let descHead = document.createElement('th');
        let quantityHead = document.createElement('th');
        let priceHead = document.createElement('th');
        let suppHead = document.createElement('th');


        //Ajout des classes
        tableHead.classList.add('table-light');
        priceHead.classList.add('px-3');
        quantityHead.classList.add('px-3');
        nameHead.classList.add('px-4');


        //Personnalisation du texte des en tete de la classe panier
        imageHead.innerText = 'IMAGE';
        nameHead.innerText = 'NOM';
        descHead.innerText = 'DESCRIPTION';
        quantityHead.innerText = ' QUANTITÉ ';
        priceHead.innerText = ' PRIX ';
        suppHead.innerText = 'SUPPRIMER';

        //Création des noeuds pour les en tete du tableau
        tableBasket.appendChild(tableHead);
        tableHead.appendChild(tableHeadTr);
        tableHeadTr.appendChild(imageHead);
        tableHeadTr.appendChild(nameHead);
        tableHeadTr.appendChild(descHead);
        tableHeadTr.appendChild(quantityHead);
        tableHeadTr.appendChild(priceHead);
        tableHeadTr.appendChild(suppHead);


        let tableBody = document.createElement('tbody');
        tableBasket.appendChild(tableBody);
        // Pour chaque caméras présentes dans le localStorage on l'affiches dans le DOM Panier
        for (const [_id, camera] of Object.entries(this.content)) {

                //Création de la structure HTML du tableau panier
                let lineProduct = document.createElement('tr');
                tableBody.appendChild(lineProduct);

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
                quantityProduct.innerText = camera.quantity + " ";

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
                lineProduct.classList.add('align-middle','text-center');

                // Bouton augmenter la quantité
                const buttonQuantityMoreBasket = document.createElement("button");
                buttonQuantityMoreBasket.innerText = '+';
                buttonQuantityMoreBasket.classList.add('btn','btn-outline-secondary','text-center');
                buttonQuantityMoreBasket.addEventListener('click', this.addQuantity.bind(this, camera));
                quantityProduct.appendChild(buttonQuantityMoreBasket);

                //Bouton diminuer la quantité
                const buttonQuantityLessBasket = document.createElement("button");
                buttonQuantityLessBasket.innerText = '-';
                buttonQuantityLessBasket.classList.add('btn','btn-outline-secondary','text-center');
                buttonQuantityLessBasket.addEventListener('click', this.removeQuantity.bind(this, camera));
                quantityProduct.appendChild(buttonQuantityLessBasket);

                //Bouton supprimer la caméra du panier
                const buttonRemoveBasket = document.createElement("button");
                buttonRemoveBasket.innerText = "X";
                buttonRemoveBasket.classList.add('btn','btn-outline-secondary','text-center');
                buttonRemoveBasket.addEventListener('click', this.remove.bind(this, camera));
                removeProduct.appendChild(buttonRemoveBasket);


        }

         //Calcul du prix total
         let totalPrice = 0;

         for (const [_id, camera] of Object.entries(this.content)) {
             totalPrice += camera.price/100 * camera.quantity;
         }

         //Pied de page du tableau
         let tableFoot = document.createElement('tfoot');
         let tableFootTr = document.createElement('tr');
         let totalPriceFoot = document.createElement('td');
         let totalPriceContainerFoot = document.createElement('td');

         //Personnalisation du texte des pieds de page du tableau
         totalPriceFoot.innerText = 'PRIX TOTAL';
         totalPriceContainerFoot.innerText = totalPrice + " €";

         //Ajout des classes et des attribus des pieds de pages du tableau
         totalPriceFoot.setAttribute("colspan", 4);
         totalPriceFoot.classList.add('borderTd');
         totalPriceContainerFoot.classList.add('borderTd');

         //Création des noeuds des pieds de pages du tableau
         tableBasket.appendChild(tableFoot);
         tableFoot.appendChild(tableFootTr)
         tableFootTr.appendChild(totalPriceFoot);
         tableFootTr.appendChild(totalPriceContainerFoot);

    }


}
