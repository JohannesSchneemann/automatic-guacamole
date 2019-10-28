/*  asynchronous calls to local storage -> maybe not all functions needed
*   calls to local storage are expensive, therefore calls are made
*   after data manipulation is done -> much more efficient
* */


const ShoppingCart = {
    // unique string to identify local storage
    KEY: 'random_placeholder_to_connect_to_local_storage',
    contents: [], /* selected items in shopping cart to array of objects */


    /* check localStorage and initialize the contents of ShoppingCart.contents */
    init(){
        let _contents = localStorage.getItem(ShoppingCart.KEY);
        if(_contents){
            // receives data in JSON format, and converts the text into a JavaScript object
            ShoppingCart.contents = JSON.parse(_contents);
        }else{
            //dummy test data -> when no data is in local storage, just to display something
            ShoppingCart.contents = [
                {id:1, title:'Tires', qty:4, itemPrice: 85.35},
                {id:2, title:'Battery', qty:1, itemPrice: 135.50},
                {id:3, title:'Engine Oil', qty:1, itemPrice: 25.99}
            ]; //replace with an empty array when done
            ShoppingCart.sync();
        }
    },

    // store JavaScript objects as a string
    async sync(){
        let _cart = JSON.stringify(ShoppingCart.contents);
        await localStorage.setItem(ShoppingCart.KEY, _cart);
    },

    /*  find an item in the ShoppingCart by its ID */
    find(id){
        let match = ShoppingCart.contents.filter(item=>{
            if(item.id == id)
                return true;
        });
        if(match && match[0])
            return match[0];
    },

    /*  add new item to the ShoppingCart
    *   and check if item is not already in the ShoppingCart
    *   update local storage */
    add(id){
        if(ShoppingCart.find(id)){
            ShoppingCart.increase(id, 1);
        }else{
            let arr = PRODUCTS.filter(product=>{
                if(product.id == id){
                    return true;
                }
            });
            if(arr && arr[0]){
                let obj = {
                    id: arr[0].id,
                    //title: arr[0].title,
                    qty: 1,
                    itemPrice: arr[0].price,
                    //desc: arr[0].desc,
                };
                ShoppingCart.contents.push(obj);

                ShoppingCart.sync();
            }else{
                //product id does not exist in products data
                console.error('Invalid Product');
            }
        }
    },

    /*  increase the quantity of an item in ShoppingCart
    *   and update local storage
    * */
    increase(id, qty=1){
        //loop through contents in the cart and if found add one to it
        ShoppingCart.contents = ShoppingCart.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        ShoppingCart.sync()
    },

    /*  reduce the quantity of an item in ShoppingCart
    *   and update local storage
    * */
    reduce(id, qty=1){
        //loop through contents in the cart and if found reduce by one
        ShoppingCart.contents = ShoppingCart.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        // remove item if quantity is zero
        ShoppingCart.contents.forEach(async item=>{
            if(item.id === id && item.qty === 0)
                ShoppingCart.remove(id); //await
        });
        ShoppingCart.sync()
    },

    /*  remove an item from the ShoppingCart.contents
    *   based on its ID and sync to local storage
    * */
    remove(id){
        ShoppingCart.contents = ShoppingCart.contents.filter(item=>{
            if(item.id !== id)
                return true;
        });
        ShoppingCart.sync()
    },

    /*  empty the whole ShoppingCart
    *   and update local storage
    * */
    empty(){
        ShoppingCart.contents = [];
        ShoppingCart.sync()
    },

    /*  sort for title, id, quantity, item price  etc
    *   returns a copy of the ShoppingCart.contents array
    *   with no impact on local storage; using build-in sort method
    * */
    sort(field='title'){
        let sorted = ShoppingCart.contents.sort((a,b)=>{
            if(a[field] > b[field]){
                return 1;
            }else if(a[field] < a[field]){
                return -1;
            }else{
                return 0;
            }
        });
        return sorted;
    },

    /* only needed to check status during development*/
    logContents(prefix){
        console.log(prefix, ShoppingCart.contents)
    }
};


let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', ()=>{
            //when the page is ready
            getProducts( showProducts, errorMessage );
            //get the cart items from localStorage
            ShoppingCart.init();
            //load the cart items
            showCart();
        });

function showCart(){
    let cartSection = document.getElementById('cart');
    cart.innerHTML = '';
    let s = ShoppingCart.sort('qty');
    s.forEach( item =>{
        let cartitem = document.createElement('div');
        cartitem.className = 'cart-item';


        let controls = document.createElement('div');
        controls.className = 'controls';
        cartitem.appendChild(controls);

        let plus = document.createElement('span');
        plus.textContent = '+';
        plus.setAttribute('data-id', item.id)
        controls.appendChild(plus);
        plus.addEventListener('click', incrementCart)

        let qty = document.createElement('span');
        qty.textContent = item.qty;
        controls.appendChild(qty);

        let minus = document.createElement('span');
        minus.textContent = '-';
        minus.setAttribute('data-id', item.id)
        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart)

        let price = document.createElement('div');
        price.className = 'price';
        let cost = new Intl.NumberFormat('en-US',
            {style: 'currency', currency:'USD'}).format(item.qty * item.itemPrice);
        price.textContent = cost;
        cartitem.appendChild(price);

        cartSection.appendChild(cartitem);
    })

}

function incrementCart(ev){
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute(''));
    ShoppingCart.increase(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('');
    let item = ShoppingCart.find(id);
    if(item){
        qty.textContent = item.qty;
    }else{
        document.getElementById('').removeChild(controls.parentElement);
    }
}

function decrementCart(ev){
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute(''));
    ShoppingCart.reduce(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('');
    let item = ShoppingCart.find(id);
    if(item){
        qty.textContent = item.qty;
    }else{
        document.getElementById('').removeChild(controls.parentElement);
    }
}

function getProducts(success, failure){
	//request the list of products 
	const URL = "https://github.com/JohannesSchneemann/automatic-guacamole/blob/master/products.JSON";
	fetch(URL, {
    	method: 'GET',
        mode: 'cors'
  	})
    // takes contents of products.json and turns them into string
  	.then(response=>response.json())
    .then(showProducts)
    .catch(err=>{
   		errorMessage(err.message);
   	});	
}
// this function needs work -> link to correct HTML tag
function showProducts(products){
    PRODUCTS = products;
    //take data.products and display inside <section id="products">
    let productSection = document.getElementById('products'); // change it to appropriate html tag
    productSection.innerHTML = "";
    products.forEach(product=>{
        let card = document.createElement('div');
        card.className = 'card'; //CSS

        //add the price
        let price = document.createElement('p'); //HTML tag
        let cost = new Intl.NumberFormat('en-US',
            {style:'currency', currency:'USD'}).format(product.price);
        price.textContent = cost;
        price.className = 'price'; //CSS
        card.appendChild(price);

        //add the button to the card
        let btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = 'Add Item';
        btn.setAttribute('data-id', product.id);
        btn.addEventListener('click', addItem);
        card.appendChild(btn);
        //add the card to the section
        productSection.appendChild(card);
    })
}

function addItem(ev){
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    console.log('add to cart item', id);
    ShoppingCart.add(id, 1);
    showCart();
}

function errorMessage(){
	//displays an error message to the user
	//could implement something silly
	console.error(err);
}
