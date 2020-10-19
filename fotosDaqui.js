function geolocationPhoto() {
    // 1. Obter a localização geográfica a partir do navegador
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getImage(latitude, longitude)
    }

    function error() {
        console.log('Unable to retrieve your location')
        const latitude = -27.1556 // bombinhas-SC
        const longitude = -48.4883
        getImage(latitude, longitude)

    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser')
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

geolocationPhoto()

// URL de fonte de imagens
function constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}


function getImage(latitude, longitude) {

    const perPage = 5
    const safeSearch = 1
    const palavraBusca = 'por-do-sol'

    // 2. Construir a URL de consulta
    let minhaUrlConsulta = `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=dbd6d00ac98959addd56ff2a94ec7e18&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=${safeSearch}&per_page=${perPage}&lat=${latitude}&lon=${longitude}&text=${palavraBusca}`

    // 3 . Usar o fetch para enviar a solicitação ao Flickr
    fetch(minhaUrlConsulta)
        .then(responseObject => responseObject.json())
        // 4 . Processar os dados de resposta em um objeto
        .then(hydratedBody => {

            let proximaImagem = document.getElementById('proxima')
            let anteriorImagem = document.getElementById('anterior')
            let linkParaImagem = document.getElementById('link')
                // 5 . Usar os valores do objeto de resposta para construir uma URL de fonte de imagens
            let indice = 0
            let imageUrl = constructImageURL(hydratedBody.photos.photo[indice]);

            // 6 . Exibir a primeira imagem na página
            let img = document.getElementById('img')
            img.style.backgroundImage = `url(${imageUrl})`
            linkParaImagem.setAttribute("href", imageUrl)

            // 7 . Em resposta a algum evento (por exemplo, um clique ou um setInterval), exibir a próxima imagem da coleção
            proximaImagem.addEventListener("click", function() {

                if (indice < hydratedBody.photos.photo.length - 1) {
                    console.log(imageUrl)
                    indice++
                } else {
                    indice = 0
                }

                imageUrl = constructImageURL(hydratedBody.photos.photo[indice]);
                let newImg = document.getElementById('img')
                newImg.style.backgroundImage = `url(${imageUrl})`
                linkParaImagem.setAttribute("href", imageUrl)
            })
            anteriorImagem.addEventListener("click", function() {
                if (indice < hydratedBody.photos.photo.length && indice > 0) {
                    console.log(imageUrl)

                    indice--
                } else {
                    indice = 0
                }

                imageUrl = constructImageURL(hydratedBody.photos.photo[indice]);
                let newImg = document.getElementById('img')
                newImg.style.backgroundImage = `url(${imageUrl})`
                linkParaImagem.setAttribute("href", imageUrl)
            })
        })
}