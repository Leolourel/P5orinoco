// récupération des données avec la méthode fetch
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(cameras => {
        const ul = document.getElementById('eltlist');
        cameras.forEach(camera => {
             camera = new Camera(camera);
             camera.setContainer(ul);
             camera.display('index');
        })
    });

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

    _getTemplate (type){
        switch (type){
            case "index": //template index
                const li = document.createElement('li');
                li.id = this._id;
                const link = document.createElement('a');
                link.href = 'produit.html';
                link.innerText = this.name;
                li.appendChild(link);
                const test = document.createElement("button");
                test.innerText = 'test';
                test.addEventListener('click', this._onTestClick.bind(this) );
                li.appendChild(test);
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
