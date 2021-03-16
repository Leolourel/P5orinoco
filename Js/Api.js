// récupération des données avec la méthode fetch
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(cameras => {
        // const ul = document.getElementById('eltlist');
        cameras.forEach(camera => {
             camera = new Camera(camera);
             camera.setContainer(ul);
             camera.display('index');
             // camera.display('produit');
        })
    });

fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(cameras => {
        // const ul = document.getElementById('eltlist');
        cameras.forEach(camera => {
            camera = new Camera(camera);
            camera.setContainer(produitConst);
            camera.display('produit');
        })
    });