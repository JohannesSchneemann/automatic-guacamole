/* asynchronous calls to local storage -> maybe not all functions needed*/

const ShoppingCart = {
    KEY: 'random_placeholder_to_connect_to_local_storage', /* unique id for localhost*/
    contents: [], /* selected items in shopping cart*/


    /* check localStorage and initialize the contents of ShoppingCart.contents */
    init(){
        let _contents = localStorage.getItem(ShoppingCart.KEY);
        if(_contents){
            ShoppingCart.contents = JSON.parse(_contents);
        }else{
            //dummy test data
            ShoppingCart.contents = [
                {id:1, title:'Tires', qty:4, itemPrice: 85.35},
                {id:2, title:'Battery', qty:1, itemPrice: 135.50},
                {id:3, title:'Engine Oil', qty:1, itemPrice: 25.99}
            ];
            ShoppingCart.sync();
        }
    },

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
    *   update local storage*/
    add(id){
        if(ShoppingCart.find(id)){
            ShoppingCart.increase(id, 1);
        }else{
            let arr = products.filter(product=>{
                if(product.id == id){
                    return true;
                }
            });
            if(arr && arr[0]){
                let obj = {
                    id: arr[0].id,
                    title: arr[0].title,
                    qty: 1,
                    itemPrice: arr[0].price
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
        ShoppingCart.contents = ShoppingCart.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        ShoppingCart.contents.forEach(async item=>{
            if(item.id === id && item.qty === 0)
                await ShoppingCart.remove(id);
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

    /*  sort for title, id, quantity etc
    *   returns a copy of the ShoppingCart.contents array
    *   with no impact on local storage
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


let Products = [];

document.addEventListener('DOMContentLoaded', ()=>{
            //when the page is ready
            getProducts( showProducts, errorMessage );
            //get the cart items from localStorage
            CART.init();
            //load the cart items
            showCart();
        });

function showCart(){

}

function incrementCart(){
	
}

function decrementCart(){
	
}

function getProducts(){
	
}

function showProducts(){
	
}

function addItem(){
	
}

function errorMessage(){
	//displays an error message to the user
	//could implement something silly
	console.error(err);
}
