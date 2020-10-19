# Fotos Daqui
Para esta avaliação, você irá criar uma aplicação web para exibir fotos que foram tiradas próximas da localização geográfica do usuário.

## Visão Geral
Seu app irá usar a API de geolocalização para determinar a localização do usuário (latitude e longitude), e em seguida irá usar a API do Flickr para obter uma lista de fotos que foram tiradas perto deste local.

Exiba a primeira foto na página, junto com um link para a página dela no Flickr. Forneça algum modo de avançar as fotos.

## Requisitos
Seu programa seguirá estes passos gerais:

Obter a localização geográfica a partir do navegador
Construir a URL de consulta
Usar o fetch para enviar a solicitação ao Flickr
Processar os dados de resposta em um objeto
Usar os valores do objeto de resposta para construir uma URL de fonte de imagens
Exibir a primeira imagem na página
Em resposta a algum evento (por exemplo, um clique ou um setInterval), exibir a próxima imagem da coleção
## Obter a localização
Se a API de geolocalização estiver indisponível ou se o usuário se recusar a fornecer sua localização, use uma latitude e longitude hard-code de sua escolha (escolha um local bacana!)

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API (em inglês)
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation (em inglês)

## Construir a URL de consulta
Exemplo de URL de consulta (que não deve conter espaços nem quebras de linha):
https://flickr.com/services/rest/?api_key=993fake589fake6cdfakefcb&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=-25.4284&lon=-49.2733&text=cachorros

Use sua api_key pessoal em vez da chave falsa deste exemplo. Aqui estão as instruções para obter uma chave de api do Flickr (em inglês, leia com atenção!). O formulário da aplicação pergunta o motivo, e você pode dizer que está usando a API para um projeto escolar.

O Flickr exige que cada solicitação de busca de foto inclua um valor text, que é o termo da busca. Portanto, o exemplo acima buscará por fotos de "cachorros". Seu aplicativo pode usar qualquer termo de busca hard-code que você quiser.

Defina os valores de lat e lon como a latitude e a longitude que você obteve com a API de geolocalização.

Defina o contador per_page como no máximo 5 para que assim nossas avaliações não sobrecarreguem os servidores de API do Flickr e para que seus usuários não precisem esperar muito para ver a foto.

Defina o safe_search como 1 para evitar imagens potencialmente sensíveis. (Você irá mostrar seu site para sua avó, certo?)

## CORS Proxy
A API do Flickr é um pouco antiga, então ela lida com solicitações cross-origin de uma forma antiquada que a API fetch não suporta. Portanto, para poder usar o fetch com a API do Flickr, você precisará rotear suas solicitações através de um servidor proxy que irá adicionar os cabeçalhos apropriados para satisfazer o sistema de segurança do navegador conhecido como CORS (Cross-Origin Resource Sharing, ou Compartilhamento de Recursos de Origem Cruzada). Em outras palavras, em vez de enviar suas solicitações diretamente para o Flickr, seu programa irá enviá-las para outro servidor que irá atuar como "tradutor" entre as solicitações fetch do seu programa e a antiga API do Flickr.

Para passar suas solicitações pelo proxy, adicione o domínio https://shrouded-mountain-15003.herokuapp.com/, ao início da URL da API do Flickr. Exemplo: https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=993c9d05898cfd6cd16b4fcb18401be0&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=-25.4284&lon=-49.2733&text=cachorros

(Este proxy de nome esquisito é uma instância personalizada do Randy para o proxy CORS-Anywhere.)

## Enviar as solicitações para o Flickr e processar os dados resposta
Use o fetch para enviar a solicitação ao Flickr. Os dados de resposta são uma longa string que precisará ser "reidratada" em um objeto antes de ser útil para o programa. Veja "Aula: Introdução ao Fetch".

Documentação da API de busca do Flickr (em inglês)

## Construir uma URL de fonte de imagens
O objeto de resposta contém um array que contém propriedades para um número de fotos, mas na verdade não contém as URLs das fotos. Em vez disso, cada objeto de foto do array contém alguns valores que podem ser montados para formar uma URL. Consulte a documentação da API do Flickr "Photo Source URLs" para mais detalhes.

Exemplo de objeto de resposta:

{
    "photos": {
        "page": 1,
        "pages": 208,
        "perpage": 2,
        "total": "624",
        "photo": [
            {
                "id": "32549725528",
                "owner": "36432048@N08",
                "secret": "ed3d4317ea",
                "server": "4829",
                "farm": 5,
                "title": "",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            }, {
                "id": "32549725168",
                "owner": "36432048@N08",
                "secret": "065f06a238",
                "server": "4916",
                "farm": 5,
                "title": "",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            }
        ]
    },
    "stat": "ok"
}
O seu código que constrói a URL da fonte de imagens da primeira imagem no array poderá ser algo assim:

function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}
const imageUrl = constructImageURL(response.photos.photo[0]);

## Exibir a primeira imagem
Adicione um elemento de imagem à página usando a URL acima como src attribute. O navegador então fará o fetch e exibirá a foto.

## Exibir a próxima imagem
Forneça um modo para que o usuário veja a próxima foto. Você pode usar um botão escrito "Próxima", um setTimeout que avança para a próxima foto depois de um certo tempo, ou algum outro método da sua escolha. Certifique-se de exibir instruções para o usuário na página.

Depois que a última foto do array for exibida, avançar mais uma vez deve exibir a primeira foto.

## Envio
Faça o push do código para o seu repositório GitLab e implemente-o via GitLab pages. No Canvas, por favor, envie a url do seu Repo Gitlab e, nos comentários, a url do seu Gitlab Pages (por exemplo https://nomedeusuario.gitlab.io/photos-from-here/). No GitLab, adicione ka-br-<sua-turma>-correcoes como membro do seu projeto com a permissão "Reporter".