export const productsOnCart = [];

export function addToCart(title, price){
    let product = {
        title : title,
        price : price
    }

     productsOnCart.push(product);
     return productsOnCart; 
}

