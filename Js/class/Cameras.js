import Basket from './Basket.js';


export default class Camera {



    /**
     * @desc Recupere les données de la caméra
     * @constructor
     * @param {Object} cameraData
     * @param {string} cameraData._id
     * @param {number} cameraData.price
     * @param {Array} cameraData.lenses
     * @param {object} cameraData.imageUrl
     * @param {string} cameraData.name
     */
    constructor(cameraData) {
        this._id = undefined;
        this.description = undefined;
        this.imageUrl = undefined;
        this.name = undefined;
        this.price = undefined;
        this.lenses = [];
        this.quantity = 1;
        Object.assign(this, cameraData);
        this.container = undefined;
    }


    /**
     * @desc afficher la camera dans le dom
     * @param type
     * @return  {HTMLElement} Template
     */
    display(type){
        const template = this._getTemplate(type);
        this.container.appendChild(template);
    }

    /**
     * @desc template index.html et produit.html via le dom
     * @param type
     * @returns {HTMLTemplateElementElement} index, produit
     * @private
     */
    _getTemplate(type){
        switch(type){
            case "index": //template index

                //Création des éléments
                const li = document.createElement('li');
                const link = document.createElement('a');
                const divImg = document.createElement('div');
                const div = document.createElement('div')
                const divPrice = document.createElement('div');
                const img = document.createElement('img');
                const title = document.createElement('h2');
                const description = document.createElement('p');
                const price = document.createElement('p');
                li.id = this._id;
                img.src = this.imageUrl;

                //Ajout des Attributs
                li.setAttribute('id','containerpoduit');
                link.setAttribute('href',`produits.html?id=${this._id}`);
                link.setAttribute('id', 'containerLink');
                div.setAttribute('id','divProduit');
                divPrice.setAttribute('id','divPrix');
                title.setAttribute('id','titreProduit');
                description.setAttribute('id','paraProduit');
                price.setAttribute('id', 'prix');

                //Ajout des class
                link.classList.add('row','text-decoration-none','containerproduit');
                divImg.classList.add('col-4');
                div.classList.add('containerdesc','col-6');
                divPrice.classList.add('col-2');
                img.classList.add('imgSize');

                //Personnalisation du text
                title.innerText = this.name;
                description.innerText = this.description;
                price.innerText = this.price/100 + ' €';

                //Création des noeud
                li.appendChild(link);
                link.appendChild(divImg);
                link.appendChild(div);
                link.appendChild(divPrice);
                divImg.appendChild(img);
                div.appendChild(title);
                div.appendChild(description);
                divPrice.appendChild(price);

                return li;

                break;

            case "product" : //template produit

                //Récupération des éléments
                const divContainer = document.getElementById('divContainer');
                const divImageProduct = document.getElementById('divImageProduit');
                const divTitleDescProduct = document.getElementById('divTitleDescProduit');
                const select = document.getElementById('lensesOption');

                //Création des éléments
                const imgProduct = document.createElement('img');
                const titleProduct = document.createElement('h2');
                const descriptionProduct = document.createElement('p');
                const priceProduct = document.createElement('p');
                imgProduct.src = this.imageUrl;

                //Ajout des class
                divContainer.classList.add('row');
                divImageProduct.classList.add('col');+
                divTitleDescProduct.classList.add('col');
                imgProduct.classList.add('img-fluid');

                //Personnalisation du text
                titleProduct.textContent = this.name;
                descriptionProduct.innerText = this.description;
                priceProduct.innerText = this.price/100 + ' €';

                //Création des noeud
                divContainer.appendChild(divImageProduct);
                divContainer.appendChild(divTitleDescProduct);
                divImageProduct.appendChild(imgProduct);
                divTitleDescProduct.appendChild(titleProduct);
                divTitleDescProduct.appendChild(descriptionProduct);
                divTitleDescProduct.appendChild(priceProduct);

                // création de l'option lentille
                for( let i = 0; i < this.lenses.length; i++) {
                    const option = document.createElement("option");
                    option.setAttribute("value", this.lenses[i]);
                    option.textContent = this.lenses[i];
                    select.appendChild(option);
                };


                //Interaction avec le panier
                const basket = new Basket();

                //Création du boutton ajout au panier
                const addBasket = document.createElement("button");
                addBasket.innerText = 'Ajouter au panier';
                addBasket.addEventListener('click', basket.add.bind(basket, this));
                divTitleDescProduct.appendChild(addBasket);

                return divContainer;

                break;

            default :
                throw 'Aucun template n\'est défini';
        }
    }

    /**
     * @desc Container template
     * @param {HTMLElement} container
     * @return {HTMLElement} container
     */
    setContainer(container ){
        this.container = container;

    }

}
