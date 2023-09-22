import { defineDataFromPage } from './dataCard.mjs';
import { addToCart, productsOnCart } from './cart.mjs';

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
        const buyButton = productCard.querySelector("button");
        buyButton.addEventListener("click", function () {
            addToCart(title, price);
        });
    
        return productCard;
    }

    // Percorre o todo array de dados e adiciona os cards de produto ao contêiner
    productsData.forEach((productData) => {
        const card = createProductCard(productData);//cria o card com as informações do indice do array, utilizando os objetos do mesmo 
        productContainer.appendChild(card);//insere o card criado com base no indice em que o for se encontra
    });
    
    console.log(productsOnCart);
});
