function addProduct(product) {
  // Verifique se já há produtos no localStorage
  let productsArray = JSON.parse(localStorage.getItem('products')) || [];
  // Adicione o novo produto ao array
  productsArray.push(product);
  // Armazene o array atualizado no localStorage
  localStorage.setItem('products', JSON.stringify(productsArray));
}


document.addEventListener(`DOMContentLoaded`, function transferToProductPage() {
  // Acesse a área na página de destino onde você deseja exibir os detalhes do produto
  const productDetails = document.querySelector(".container");
  const stringJson = sessionStorage.getItem(`product`);
  const productData = JSON.parse(stringJson);
  // Crie elementos HTML para exibir os detalhes do produto
  const productDetailsCard = document.createElement("div");
  productDetailsCard.classList.add("product-details");

  // Preencha os detalhes do produto na página de destino
  const { title, description, price, imageSrc} = productData;
  productDetailsCard.innerHTML = `
      <div class="product-image">
        <img src="${imageSrc}" alt="Imagem do Produto">
      </div>
      <div class="product-info">
        <h2>${title}</h2>
        <p class="product-description">${description}</p>
        <p class="product-price">Preço: R$ ${price.toFixed(2)}</p>
        <select name="quantity" id="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
        <button class="buy">Buy</button>
      </div>
    `;

  const buyButton = productDetailsCard.querySelector("button");
  buyButton.addEventListener(`click`, function insertIntoCart() {
    const selectedQuantity = parseInt(document.getElementById(`quantity`).value, 10);
    productData.quantity = selectedQuantity;
    addProduct(productData);
  });

  // Limpe o conteúdo existente na área de detalhes do produto e insira o novo conteúdo
  //productDetails.innerHTML = "";
  productDetails.appendChild(productDetailsCard);
}
); 