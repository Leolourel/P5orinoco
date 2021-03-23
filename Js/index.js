import Camera from "./class/Cameras.js";


/**
 * @desc récupération des données avec la méthode fetch
 * @async
 * @param {string} url
 * @type {string} template Index
 */
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

