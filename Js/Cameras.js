
class Camera {


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
        console.log(this, cameraData);
    }



    display(type){
        //    afficher la camera dans le DOM
        console.log("prix :" + this.price);
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
                li.href = 'produit.html'
                li.classList.add('row');

                //création du lien vers la page produit.html
                const link = document.createElement('a');
                link.href = 'produit.html';
                link.innerText = this.name;
                div.appendChild(link);


                // const test = document.createElement("button");
                // test.innerText = 'test';
                // test.addEventListener('click', this._onTestClick.bind(this) );
                // li.appendChild(test);

                const div = document.createElement('div')
                li.appendChild(div)


                const img = document.createElement('img');
                img.src = this.imageUrl;
                img.classList.add('imgSize');
                li.appendChild(img);


                const description = document.createElement('p');
                description.innerText = this.description;
                div.appendChild(description);


                const prix = document.createElement('p');
                prix.innerText = this.price + '€';
                div.appendChild(prix);

                return li;

                break;
            case "produit" :
                //template produit
                break;
            default :
                throw 'Aucun template n\'est défini';
        }
    }

    /**
     *
     * @param {HTMLElement} container
     */
    setContainer (container){
        this.container = container;
    }

    _onTestClick (){
        console.log('clicktest');
    }
}
