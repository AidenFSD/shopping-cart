// 'add-cart' from all the buttons
let carts = document.querySelectorAll('.add-cart');

// All the products list on the web, and store them to an array-products:

let products = [
  {
    id: 1,
    name: 'Peanut Butter',
    tag: 'peanutbutter',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 2,
    name: 'Lemon Chocolate',
    tag: 'lemonchocolate',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 3,
    name: 'Dulce de Leche',
    tag: 'dulcedeleche',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 4,
    name: 'Raspberry',
    tag: 'raspberry',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 5,
    name: 'Green Grape',
    tag: 'greengrape',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 6,
    name: 'Cheese',
    tag: 'cheese',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 7,
    name: 'Red Velvet',
    tag: 'redvelvet',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 8,
    name: 'White Chocolate',
    tag: 'whitechocolate',
    price: 3.5,
    quantity: 1,
  },

  {
    id: 9,
    name: 'Strawberry',
    tag: 'strawberry',
    price: 3.5,
    quantity: 1,
  },
];

// whenver I click the order button, I want some action:
// so I need to loop all of them:
var productsInCart = [];

let cartIcon = document.getElementById('cart-icon');
cartIcon.addEventListener('click', () => {
  console.log("cartIcon");
  let myModal = new bootstrap.Modal(
    document.getElementById('cartModal'),
    {}
  );
  let rows = "";

  for(let i = 0 ; i < productsInCart.length ; i++){
    let index = productsInCart[i];
    rows = rows + row(i,products[index]);
  }
  rows += total();

  table("#cartModalBody",rows);
  
  myModal.show(); 
  
}); 

let table = (parent,rows) => {
  $(parent)
   .html(`<table class="table">
          <thead>
            <tr>
              <th scope="col">Remove</th>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">quantity</th>
              <th scope="col">subtotal</th>
            </tr>
          </thead>
          <tbody  id="table-body">
          </tbody>
      </table>
   `);
   $("#table-body").html(rows);
};
let row = (index,product) => {
  let id = "cartQty" + productsInCart[index];
  let subtotalId = "cartSubtotal" + productsInCart[index];
  let input = '<input id="' + id + '" type="number" min="0" value="' + product.quantity + '" step="1" onchange="changeQty(' + index + ')">'; 
  return '<tr><th scope="row" onclick="removeRow('+ index + ')">' + 'X' + '</th>'
          +  '<td>' + product.id + '</td>'
          +  '<td>' + product.name + '</td>'
          +  '<td>' + product.price + '</td>'
          +  '<td>' + input + '</td>'
          +  '<td id="' + subtotalId + '">' + (product.price * product.quantity) + '</td>'
          + '</tr>';
}

let total = () => {
  let total = productsInCart.reduce(getSum,0);
  
  return '<tr><td colspan="5">Total</td><td id="cartTotal">' + Number(total).toFixed(2) + ' </td></tr>';
}

function getSum(total,currentValue){
  let product = products[currentValue];
  console.log(product);
  total = total + product.price * product.quantity; 
  return total;
}

function changeQty(index){
  console.log('changeQty');
  let product = products[productsInCart[index]];
  product.quantity = $('#cartQty' + productsInCart[index]).val(); 
  let subtotalId = "#cartSubtotal" + productsInCart[index];
  let subtotal = (product.quantity * product.price).toFixed(2);
  $(subtotalId).text(subtotal);

  let total = productsInCart.reduce(getSum,0);
  $('#cartTotal').text(Number(total).toFixed(2));
}

function removeRow(index){
  console.log('removeRow');
  productsInCart.splice(index,1);
  console.log(productsInCart);

  let rows = "";
  
  for(let i = 0 ; i < productsInCart.length ; i++){
    let index = productsInCart[i];
    rows = rows + row(i,products[index]);
  }
  rows += total();

  table("#cartModalBody",rows);
  $('#cart-totalPropducts').text(productsInCart.length);
}


for (let i = 0; i < carts.length; i++) {
  // I want to grab my cart
  carts[i].addEventListener('click', () => {
    // console.log('added to shopping cart');
    // each time I click, I record this number
    cartNumbers(i);
    //totalCost(products[i]);
  });
}

function cartNumbers(index) {
  // console.log('The product clicked is', product);
  let isExists = false;

  for(let i = 0 ; i <productsInCart.length ; i++){
    if(productsInCart[i] == index){
      isExists = true;
    }
  }
  if(isExists == false){
    productsInCart.push(index);
    console.log(document.getElementById('cart-totalPropducts'));
    $('#cart-totalPropducts').text(productsInCart.length);
  }
  console.log(productsInCart);
}
