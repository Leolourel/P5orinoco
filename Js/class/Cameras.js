import Panier from './Panier.js';

const panier = new Panier();

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
                const divPrix = document.createElement('div');
                const img = document.createElement('img');
                const title = document.createElement('h2');
                const description = document.createElement('p');
                const prix = document.createElement('p');
                li.id = this._id;
                img.src = this.imageUrl;

                //Ajout des Attributs
                li.setAttribute('id','containerpoduit');
                link.setAttribute('href',`produits.html?id=${this._id}`);
                link.setAttribute('id', 'containerLink');
                div.setAttribute('id','divProduit');
                divPrix.setAttribute('id','divPrix');
                title.setAttribute('id','titreProduit');
                description.setAttribute('id','paraProduit');
                prix.setAttribute('id', 'prix');

                //Ajout des class
                link.classList.add('row','text-decoration-none','containerproduit');
                divImg.classList.add('col-4');
                div.classList.add('containerdesc','col-6');
                divPrix.classList.add('col-2');
                img.classList.add('imgSize');

                //Personnalisation du text
                title.innerText = this.name;
                description.innerText = this.description;
                prix.innerText = this.price/100 + ' €';

                //Création des noeud
                li.appendChild(link);
                link.appendChild(divImg);
                link.appendChild(div);
                link.appendChild(divPrix);
                divImg.appendChild(img);
                div.appendChild(title);
                div.appendChild(description);
                divPrix.appendChild(prix);

                return li;

                break;

            case "produit" : //template produit

                //Récupération des éléments
                const divContainer = document.getElementById('divContainer');
                const divImageProduit = document.getElementById('divImageProduit');
                const divTitleDescProduit = document.getElementById('divTitleDescProduit');
                const select = document.getElementById('lensesOption');

                //Création des éléments
                const imgproduit = document.createElement('img');
                const titleproduit = document.createElement('h2');
                const descriptionproduit = document.createElement('p');
                const prixproduit = document.createElement('p');
                imgproduit.src = this.imageUrl;

                //Ajout des class
                divContainer.classList.add('row');
                divImageProduit.classList.add('col');+
                divTitleDescProduit.classList.add('col');
                imgproduit.classList.add('img-fluid');

                //Personnalisation du text
                titleproduit.textContent = this.name;
                descriptionproduit.innerText = this.description;
                prixproduit.innerText = this.price/100 + ' €';

                //Création des noeud
                divContainer.appendChild(divImageProduit);
                divContainer.appendChild(divTitleDescProduit);
                divImageProduit.appendChild(imgproduit);
                divTitleDescProduit.appendChild(titleproduit);
                divTitleDescProduit.appendChild(descriptionproduit);
                divTitleDescProduit.appendChild(prixproduit);

                // création de l'option lentille
                for( let i = 0; i < this.lenses.length; i++) {
                    const option = document.createElement("option");
                    option.setAttribute("value", this.lenses[i]);
                    option.textContent = this.lenses[i];
                    select.appendChild(option);
                };

                //Création du boutton ajout au panier
                const addPanier = document.createElement("button");
                addPanier.innerText = 'Ajouter au panier';
                addPanier.addEventListener('click', this._addBasket.bind(this) );
                divTitleDescProduit.appendChild(addPanier);

                //Création du bouton supprimer du panier (ajouter a la page panier) test
                const removeBasket = document.createElement("button");
                removeBasket.innerText = 'Supprimer du panier';
                removeBasket.addEventListener('click',this._removeBasket.bind(this) );
                divTitleDescProduit.appendChild(removeBasket);

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

    // const panier = new Panier();

    /**
     @desc bouton d'ajout au panier produit
     @function
     @class Panier
     */
    _addBasket(){
        // const panier = new Panier();
        panier.add(this);
    }

    _removeBasket(){
        panier.remove(this);
    }
}
