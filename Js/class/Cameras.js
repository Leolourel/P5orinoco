
export default class Camera {


    /**
     * @desc Recupere les données de la caméra
     * @param {Object} cameraData
     * @param {string} cameraData._id
     * @param {number} cameraData.price
     * @param {Array} cameraData.lenses
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
     *
     * @param type
     */
    display(type){
        //    afficher la camera dans le DOM
        const template = this._getTemplate(type);
        this.container.appendChild(template);
    }

    /**
     * @desc template index.html et produit.html via le dom
     * @param type
     * @returns {HTMLLIElement}
     * @private
     */
    _getTemplate (type){
        switch (type){
            case "index": //template index

                //création du li
                const li = document.createElement('li');
                li.id = this._id;
                li.setAttribute('id','containerpoduit');


                //création du lien
                const link = document.createElement('a');
                link.setAttribute('href',`produits.html?id=${this._id}`);
                link.setAttribute('id', 'containerLink')
                link.classList.add('row','text-decoration-none','containerproduit');
                li.appendChild(link);

                // const test = document.createElement("button");
                // test.innerText = 'test';
                // test.addEventListener('click', this._onTestClick.bind(this) );
                // li.appendChild(test);

                //création de la div container image
                const divImg = document.createElement('div');
                divImg.classList.add('col-4');
                link.appendChild(divImg);


                //création de la div description
                const div = document.createElement('div')
                div.classList.add('containerdesc','col-6');
                div.setAttribute('id','divProduit');
                link.appendChild(div)


                //création de la div container prix
                const divPrix = document.createElement('div');
                divPrix.classList.add('col-2');
                link.appendChild(divPrix);
                divPrix.setAttribute('id','divPrix');


                //création du container de l'img
                const img = document.createElement('img');
                img.src = this.imageUrl;
                img.classList.add('imgSize');
                divImg.appendChild(img);

                //création du h2
                const title = document.createElement('h2');
                title.innerText = this.name;
                div.appendChild(title);
                title.setAttribute('id','titreProduit');

                //création du paragraphe description
                const description = document.createElement('p');
                description.innerText = this.description;
                div.appendChild(description);
                description.setAttribute('id','paraProduit');

                //création du paragraphe prix
                const prix = document.createElement('p');
                prix.innerText = this.price/100 + ' €';
                divPrix.appendChild(prix);
                prix.setAttribute('id', 'prix')

                return li;

                break;

            case "produit" :
                //template produit

                const divContainer = document.getElementById('divContainer');
                divContainer.classList.add('row','border','border-black');

                const divImageProduit = document.getElementById('divImageProduit');
                divImageProduit.classList.add('col','border','border-black');
                divContainer.appendChild(divImageProduit);

                const divTitleDescProduit = document.getElementById('divTitleDescProduit');
                divTitleDescProduit.classList.add('col','border','border-black');
                divContainer.appendChild(divTitleDescProduit);


                //création du container de l'img
                const imgproduit = document.createElement('img');
                imgproduit.src = this.imageUrl;
                imgproduit.classList.add('imgSize',);
                divImageProduit.appendChild(imgproduit);


                // //création du h2
                const titleproduit = document.createElement('h2');
                titleproduit.textContent = this.name;
                divTitleDescProduit.appendChild(titleproduit);


                // //création du paragraphe description
                const descriptionproduit = document.createElement('p');
                descriptionproduit.innerText = this.description;
                divTitleDescProduit.appendChild(descriptionproduit);


                // //création du paragraphe prix
                const prixproduit = document.createElement('p');
                prixproduit.innerText = this.price/100 + ' €';
                divTitleDescProduit.appendChild(prixproduit);

                return divContainer;

                break;

            default :
                throw 'Aucun template n\'est défini';
        }
    }

    /**
     *
     * @param {HTMLElement} container
     */
    setContainer (container ){
        this.container = container;

    }



    /**
     *
     * @param contenairproduit
     */
    // setContenairProduit (contenairproduit){
    //     this.contenairproduit = contenairproduit;
    // }

    // _onTestClick (){
    //     console.log('clicktest');
    // }
}
