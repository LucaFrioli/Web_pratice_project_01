(function () {
  // Função para excluir um banco de dados IndexedDB caso seja necesário
  function deleteIndexedDB(databaseName) {
    let request = indexedDB.deleteDatabase(databaseName);//criação de uma requisição de exclusão

    request.onsuccess = function () { //caso seja excluido com sucesso
      console.log("Banco de dados " + databaseName + " excluído com sucesso!");// Retorna uma menssagem positiva ao usuário
      criarNovoBancoDeDados();//cria um novo banco de dados 
    };

    request.onerror = function (event) {//caso não tenha sido possível excluí-lo retornará 
      console.log("Erro ao excluir o banco de dados " + databaseName + ": " + event.target.errorCode);
    };
  }

  // Função para criar um novo banco de dados "cart" com uma tabela "products"
  function criarNovoBancoDeDados() {
    const version = 1;//define em que versão a tabela se encontra 
    let request = indexedDB.open("cart", version);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;

      // Crie a tabela "products" com a chave primária "id"
      let productStore = db.createObjectStore("products", { keyPath: "title" });

      // Cria um índice na chave primária "id"
      productStore.createIndex("id", "title", { unique: true });

      console.log("Banco de dados 'cart' criado com sucesso!");
    };

    request.onsuccess = function () {
      console.log("Banco de dados 'cart' aberto com sucesso!");
    };

    request.onerror = function (event) {
      console.log("Erro ao abrir o banco de dados 'cart': " + event.target.errorCode);
    };
  }
})()

function addProduct(product) {
  const request = indexedDB.open("cart", 1); //abre uma requisição para comunicação com o banco de dados

  request.onupgradeneeded = function (event) {//averigua se a tabela existe e está atualizada
    const db = event.target.result;
    if (!db.objectStoreNames.contains("products")) {
      // Se a tabela "products" não existir, crie-o
      db.createObjectStore("products", { keyPath: "title" });
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;

    // Após garantir que o objeto de armazenamento "products" existe, adicione o produto
    const transaction = db.transaction("products", "readwrite");
    const productStore = transaction.objectStore("products");
    productStore.add(product);

    transaction.oncomplete = function () {
      console.log("Produto adicionado com sucesso ao carrinho.");
    };

    transaction.onerror = function (event) {
      console.log("Erro ao adicionar o produto ao carrinho: " + event.target.error);
      alert("Você já adicionou este Item");
    };
  };

  request.onerror = function (event) {
    console.log("Erro ao abrir o banco de dados 'cart': " + event.target.error);
  };
}


document.addEventListener(`DOMContentLoaded`, function transferToProductPage() {
  // Acesse a área na página de destino onde você deseja exibir os detalhes do produto
  const productDetails = document.querySelector(".container");
  const stringJson = sessionStorage.getItem(`product`);
  const productData = JSON.parse(stringJson);
  console.log(productData);
  // Crie elementos HTML para exibir os detalhes do produto
  const productDetailsCard = document.createElement("div");
  productDetailsCard.classList.add("product-details");

  // Preencha os detalhes do produto na página de destino
  const { title, description, price, imageSrc, quantity } = productData;
  productDetailsCard.innerHTML = `
      <div class="product-image">
        <img src="${imageSrc}" alt="Imagem do Produto">
      </div>
      <div class="product-info">
        <h2>${title}</h2>
        <p class="product-description">${description}</p>
        <p class="product-price">Preço: R$ ${price.toFixed(2)}</p>
        <p class="product-availability">${quantity}</p>
        <button class="buy">Buy</button>
      </div>
    `;

  const buyButton = productDetailsCard.querySelector("button");
  buyButton.addEventListener(`click`, function insertIntoCart() {
    addProduct(productData);
  });

  // Limpe o conteúdo existente na área de detalhes do produto e insira o novo conteúdo
  productDetails.innerHTML = "";
  productDetails.appendChild(productDetailsCard);
}
); 