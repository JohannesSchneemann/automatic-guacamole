const ShoppingCart = {
    KEY: 'random_placeholder_to_connect_to_local_storage', /* unique id for localhost*/
    contents: [], /* selected items in shopping cart*/
    init(){},
    async sync(){},
    find(id){},
    add(id){},
    increase(id, qty=1){},
    reduce(id, qty=1){},
    remove(id){},
    empty(){},
    sort(field='title'){},
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
