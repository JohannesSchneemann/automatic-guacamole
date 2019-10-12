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
