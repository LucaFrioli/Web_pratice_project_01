//import { defineDataFromPage } from './dataCard.mjs';
//import { addToCart, productsOnCart } from './cart.mjs';

document.addEventListener(`DOMContentLoaded`, function () {//quando a página carregar os card serão inseridos
    const productContainer = document.querySelector(`div#productContainer`);//eles serão inseridos neste elemento

    // Array de dados dos produtos para personalização dos cards, definidos por páginas
    const productsData = defineDataFromPage();
    const limit = 25;//define o tamanho máximo para formatação de descrição

    // Função para criar um card de produto com base nos dados
    function createProductCard(productData) {
        const productCard = document.createElement("div");//cria a div que receberá os produtos
        productCard.classList.add("productCard");//adiciona a classe de estilização fazendo assim ela se transformar em um card
        const { title, description, price, imageSrc } = productData //extrai via desestruturação os atributos do objeto e os atribui as variaveis com seus respectivos nomes



        function formatDescription(description) { //formata a descrição nãopermitindo ela passar dos caracteres limites, evitando assim quebrar o card
            const checkLimit = description.length > limit;
            const defineComplement = checkLimit ? `...` : ``;
            const formatedDescription = description.substring(0, limit) + defineComplement;
            return formatedDescription;
        }

        // insere o conteúdo do card muito importante para estilizar ou adicionar mais conteúdo nele
        productCard.innerHTML = `
        <h3 class="productTitle">${title}</h3>
        <img src="${imageSrc}" alt="${title}" class="responsive-img">
        <div class="infoAndBuy">
            <h6 class="productPrice">R$ ${price.toFixed(2)}</h6>
            <p class="productDescription">${formatDescription(description)}</p>
            <button>Buy</button>
        </div>
        `;//a tag <a> que se localiza a cima está apenas com um link de demonstração

        //seleciona o botão do card referente e adiciona um evento de click
        const buyButton = productCard.querySelector("button");
        buyButton.addEventListener("click", function () {
            //transforma o objeto em um JSON
            sessionStorage.removeItem(`product`);//limpa qualquer json salvo na sessão
            const productJSON = JSON.stringify(productData);//transforma o objeto em um JSON 
            sessionStorage.setItem(`product`, productJSON);//salva o objeto no cache da sessão
            window.location.href = "./details.html"//redireciona para apágina 
        });

        return productCard;
    }

    // Percorre o todo array de dados e adiciona os cards de produto ao contêiner
    productsData.forEach((productData) => {
        const card = createProductCard(productData);//cria o card com as informações do indice do array, utilizando os objetos do mesmo 
        productContainer.appendChild(card);//insere o card criado com base no indice em que o for se encontra
    });

});


const indexCardsData = [
    {//link só está sendo declarado caso venha a ser necessário
        title: `Kit barba macia Don Alcides`,
        description: `Kit com balçamo e shampooo don alcides`,
        price: 95.85,
        imageSrc: `./assets/img/products/balm-e-shampoo-para-barba-don-alcides.jpg`,
        quantity: `#`
    },
    {
        title: `Pomada para cabelo Haskell`,
        description: `Pomada fixadora para cabelo, nivel de fixação média`,
        price: 25.35,
        imageSrc: `./assets/img/products/pomadaParaCabelo.jpeg`,
        quantity: `#`
    },
    {
        title: `Kit sabonete para barba importado`,
        description: `Kit com sabonete japonês para barba e espandor com cabo de bétula`,
        price: 127.95,
        imageSrc: `./assets/img/products/kit_sabonete_para_Barbear_com_espanador.jpg`,
        quantity: `#`
    },
];

const productsCardsData = [
    {
        title: `Balsamo vinotage`,
        description: `Balsamo pós-barba 170ml pós barba`,
        price: 32.50,
        imageSrc: `./assets/img/products/Balsamo-Pos-Barba-170ml.jpg`,
        quantity: `#`
    },
    {
        title: `Blender Big Barber`,
        description: `Blender para ajudar o crescimento da barba`,
        price: 70.85,
        imageSrc: `./assets/img/products/blender_para_barba.jpg`,
        quantity: `#`
    },
    {
        title: `Creme Eficácia`,
        description: `Creme Anti-rugas masculino`,
        price: 44.55,
        imageSrc: `./assets/img/products/creme-anti-sinais-masculino.jpg`,
        quantity: `#`
    },
    {
        title: `Kit para barbear Natura`,
        description: `Kit com espuma de barbear e gel pós barba natura`,
        price: 74.50,
        imageSrc: `./assets/img/products/kit_para_barbear.jpeg`,
        quantity: `#`
    },
    {
        title: `Navalha artesanal`,
        description: `Navalha adornada em ouro artesanal temperadaem aço alto carbono`,
        price: 265.75,
        imageSrc: `./assets/img/products/navalha_para_barbear.jpg`,
        quantity: `#`
    },
    {
        title: `Navalhete tipo mordedor`,
        description: `Navalhete tipo mordedor artezanal com cabo de acácia`,
        price: 158.70,
        imageSrc: `./assets/img/products/navalhete.jpg`,
        quantity: `#`
    },
];

function defineDataFromPage() {//define quais cards terão conforme a página em que o usuário se encontra
    const path = window.location.pathname;
    if (path.includes(`index`)) {
        return indexCardsData;
    }
    if (path.includes(`products`)) {
        return productsCardsData;
    }
}
