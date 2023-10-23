const productList = document.querySelector(`#cartContent`);//seleciona a lista que servirá de display
const productsArray = JSON.parse(localStorage.getItem('products')) || [];
function displayProducts() {
    // Percorrer array de produtos 
    productsArray.forEach((product, index) => {
        const listItem = createLi(index);//cria o item da lista que servirá como receptor das infoerações 
        const totalValue = formatTotalValue(product);//calcula e já formata o valor total inglobado no item listado
        listItem.textContent = ` ${product.title} - Quantidade: ${product.quantity} - Valor: R$ ${totalValue} `;
        const button = createButton();
        listItem.appendChild(button);
        productList.appendChild(listItem);

        button.addEventListener(`click`, () => {
            removeItem(button.parentElement);
        });

    });
}

displayProducts();

function createLi(index = 0) {
    const li = document.createElement(`li`);
    li.classList.add(`productItem`);
    li.id = `productItem${index + 1}`;
    return li
}

function createButton() {
    const btn = document.createElement(`button`);
    btn.classList.add(`exclude`);
    btn.textContent = `Remover`;
    return btn;
}

function formatTotalValue(product) {
    const total = product.quantity * product.price;
    const formatedValue = total.toFixed(2);
    return formatedValue;
}

function removeItem(productListItem) {
    // Identificar o índice do item que queremos remover.
    const productIndex = productsArray.indexOf(productListItem.dataset.product);
    // Remover o item do array.
    productsArray.splice(productIndex, 1);
    // Atualizar o local storage com o novo array de produtos.
    localStorage.setItem('products', JSON.stringify(productsArray));
    // Remover o item da lista de produtos.
    productList.removeChild(productListItem);
}
