import Camera from "./class/Cameras.js";

const productId = window.location.search.substr(4);

fetch("http://localhost:3000/api/cameras/" + productId)
    .then(response => response.json())
    .then(camera => {
        const produitConst = document.getElementById('produitlist');
        camera = new Camera(camera);
        camera.setContainer(produitConst);
        camera.display('produit');

        console.log(camera)
    });

console.log(productId);