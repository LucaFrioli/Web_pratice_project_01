const productList = document.querySelector(`#cartContent`);
const totalDisplay = document.querySelector(`span#totalFinal`);
const productsArray = JSON.parse(localStorage.getItem('products')) || [];

function displayProducts() {
    productList.innerHTML = '';

    productsArray.forEach((product, index) => {
        const listItem = createLi(index);
        const totalValue = formatTotalValue(product);
        listItem.innerHTML = ` ${product.title} - Quantidade: ${product.quantity} - Valor: R$ <span class="totalItem"> ${totalValue} </span> `;
        const button = createButton();
        listItem.appendChild(button);
        productList.appendChild(listItem);

        button.addEventListener(`click`, () => {
            removeItem(listItem, product);
        });
    });

    displayTotalF();
}

if (productsArray.length === 0) {
    console.log(`O carrinho está vazio`);
} else {
    displayProducts();
}

function createLi(index = 0) {
    const li = document.createElement(`li`);
    li.classList.add(`productItem`);
    li.id = `productItem${index + 1}`;
    return li;
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

function removeItem(productListItem, product) {
    const productIndex = productsArray.indexOf(product);

    if (productIndex !== -1) {
        productsArray.splice(productIndex, 1);
        localStorage.setItem('products', JSON.stringify(productsArray));
        productList.removeChild(productListItem);
        displayTotalF();
    }
}

function displayTotalF() {
    const total = totalOfTotals();
    totalDisplay.textContent = ` ${total.toFixed(2)}`;
}

function totalOfTotals() {
    const allTotals = productList.querySelectorAll(`span.totalItem`);
    let total = 0;

    allTotals.forEach((totalSpan) => {
        total += Number(totalSpan.textContent);
    });

    return total;
}
