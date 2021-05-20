import Camera from "./class/Cameras.js";


/**
 * @desc récupération des données avec la méthode fetch
 * @async
 * @param {string} url
 * @type {string} template produit
 */
const productId = window.location.search.substr(4);

fetch("http://localhost:3000/api/cameras/" + productId)
    .then(response => response.json())
    .then(camera => {
        const productConst = document.getElementById('produitlist');
        camera = new Camera(camera);
        camera.setContainer(productConst);
        camera.display('product');
    })
    .catch(function (error){
        console.log(error)

    });

//.catch(error)


