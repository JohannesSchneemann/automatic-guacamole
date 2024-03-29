// User info for address
var userInfo = {
    name: "",
    addr: ["", ""],
    city: "",
    state: "",
    zip: ""
}

var cartField = {
    item: ["", "", "", ""],
    price: ["", "", "", ""]
}


// Shopping cart info and calculations
var cart = {
    cartAmt: 0,
    taxAmt: 0,
    shipAmt: 0,
    totalAmt: 0,
    calc: function(qty, price) {
        this.cartAmt += qty * price;
        this.taxAmt = this.cartAmt * 0.08 * 1.0;
        this.shipAmt = this.cartAmt * 0.03;
        this.totalAmt = this.cartAmt + this.taxAmt + this.shipAmt;
    }
}

var sumCart = {
    sumCartItem: "",
    sumCartPrice: "",
    calc: function(itemSelected, price) {
        this.sumCartItem = itemSelected;
        this.sumCartPrice = price;
    }
}

var items, iframe, partSelect, qtySelect, qty, price, unitPrice, totalPrice, physicalAddr, itemSelected, myTable, row, data, dataText, HTMLTable;
var newCell1, newCell2, newRow, tablePrice;

// Ensure Iframe element is available
document.addEventListener('DOMContentLoaded', function(){
    loadIframeContents();
    iframe.addEventListener('load', loadIframeContents);

});


// Loads iframe contents into object
function loadIframeContents(){

    // Reset values
    var submitButton = null;
    var submitFunc = null;
    var form = null;

    // Grab new page in iframe
    iframe = document.getElementById("main-frm");

    // Sets up functions and listeners for pages

    // SHOPPING CART
    if(!submitButton){

        submitButton = iframe.contentWindow.document.getElementById("cart-submit");
        submitFunc = cartSubmit;
        getProductsFromDB();
    
        
        // Populate cart details when a new unit size or product is select
        qtySelect = iframe.contentWindow.document.querySelector('[name="quantity"]');
        if(qtySelect){
            qtySelect.addEventListener('input', populateCart);
            iframe.contentWindow.document.getElementById("add-button").addEventListener('click', addItem);
            
        }
        
        // Reset quanitity to 1 when changing products
        partSelect = iframe.contentWindow.document.querySelector('[name="products"]');
        if(partSelect){
            partSelect.addEventListener('change', function(){
                qtySelect.value = 1;
                populateCart();
            });
        }
        if(HTMLTable){
           
            if(iframe.contentWindow.document.getElementById("addTable")){ iframe.contentWindow.document.getElementById("addTable").replaceWith(HTMLTable);
                                                                        }
            
            if(iframe.contentWindow.document.getElementById("cart-total")){
                iframe.contentWindow.document.getElementById("cart-total").value = "$" + cart.totalAmt.toFixed(2);
            }
        }

    }
    // USER INFO
    if(!submitButton){

        submitButton = iframe.contentWindow.document.getElementById("user-info-submit");
        submitFunc = userInfoSubmit;

        if(submitButton){
            // Pull state codes from database
            getStatesFromDB();
            // Populate user info with saved values if there is any

            iframe.contentWindow.document.querySelector('[name="fullname"]').value = userInfo.name;
            iframe.contentWindow.document.querySelector('[name="addr1"]').value = userInfo.addr[0];
            iframe.contentWindow.document.querySelector('[name="addr2"]').value = userInfo.addr[1];
            iframe.contentWindow.document.querySelector('[name="city"]').value = userInfo.city;
            iframe.contentWindow.document.querySelector('[name="zip"]').value =  userInfo.zip;
        }
    }
    // SHIPPING INFO
    if(!submitButton){
        getStatesFromDB();
        submitButton = iframe.contentWindow.document.getElementById("ship-submit");
        submitFunc = shipSubmit;
        physicalAddr = iframe.contentWindow.document.getElementById("physical-address");

        // Populate address info with physical address in user info if checkbox is checked
        if(submitButton){
            physicalAddr.addEventListener("change", usePhysicalAddr);
        }
    }
    // CHECKOUT
    if(!submitButton){

        submitButton = iframe.contentWindow.document.getElementById("checkout-submit");
        submitFunc = checkoutSubmit;

        // Populate checkout values using values already calculated in shopping cart
        if(submitButton){
           
            if(HTMLTable){
                iframe.contentWindow.document.getElementById("checkout-table-container").appendChild(HTMLTable);
            }
            
            iframe.contentWindow.document.getElementById("cart-amount").value = "$" + cart.cartAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("tax-amount").value = "$" + cart.taxAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("ship-amount").value = "$" + cart.shipAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("total-amount").value = "$" + cart.totalAmt.toFixed(2);
            
            
            
        }
    }

    // Grabs form element of iframe page and changes submit button function
    if(submitButton){
        form = iframe.contentWindow.document.querySelector("form");
        form.addEventListener('submit', submitFunc);
    }
}

function populateCart() {
    
    unitPrice = iframe.contentWindow.document.querySelector('#unit-price');
    totalPrice = iframe.contentWindow.document.querySelector('#total-price');

    qty = qtySelect.value;
    qty = qty * 1.0;
    // Check object for given name and then populate fields based on product info
    for(var i=0; i<items.length; i++){
        if(i == partSelect.value){
            price = items[i]['price'];
            itemSelected = items[i]['desc'];
            totalPrice.value = "$" + (price * qty).toFixed(2);
            unitPrice.value = "$" + price + ".00";
            //tablePrice.value = "$" + price;

            //itemSel.value = itemSelected;
            break;
        }
        totalPrice.value = "";
        unitPrice.value = "";
    }
    

}

function populateSummary() {

    totalPrice = iframe.contentWindow.document.querySelector('#total-price');
    qty = qtySelect.value;
    qty = qty * 1.0;
    // Check object for given name and then populate fields based on product info
    for(var i=0; i<items.length; i++){
        if(i == partSelect.value){
            price = items[i]['price'];
            totalPrice.value = "$" + (price * qty).toFixed(2);
            unitPrice.value = "$" + price;
            break;
        }
        totalPrice.value = "";
        unitPrice.value = "";
    }

}


function addItem(){
    cart.calc(qty, price);
    console.log(cart);
    
    partSelect.value = "";
    qtySelect.value = "1";
    
    iframe.contentWindow.document.getElementById("cart-total").value = "$" + cart.totalAmt.toFixed(2);
    
    row = iframe.contentWindow.document.createElement("tr");
    iframe.contentWindow.document.getElementById("addTable").appendChild(row);
    
    data = iframe.contentWindow.document.createElement("td");
    dataText = iframe.contentWindow.document.createTextNode(itemSelected);
    data.appendChild(dataText);
    row.appendChild(data);
    
    
    data = iframe.contentWindow.document.createElement("td");
    dataText = iframe.contentWindow.document.createTextNode("$" + price);
    data.appendChild(dataText);
    row.appendChild(data);
   
    
    data = iframe.contentWindow.document.createElement("td");
    dataText = iframe.contentWindow.document.createTextNode(qty);
    data.appendChild(dataText);
    row.appendChild(data);
   
    
    HTMLTable = iframe.contentWindow.document.getElementById("addTable").cloneNode(true);  
}

function deleteRow(r){
	var row = r.parentNode.parentNode.rowIndex;
	document.getElementById("addTable").deleteRow(r);
}


function cartSubmit(){

}

function userInfoSubmit(){

    // Save user info in object
    userInfo.name = iframe.contentWindow.document.querySelector('[name="fullname"]').value;
    userInfo.addr[0] = iframe.contentWindow.document.querySelector('[name="addr1"]').value;
    userInfo.addr[1] = iframe.contentWindow.document.querySelector('[name="addr2"]').value;
    userInfo.city = iframe.contentWindow.document.querySelector('[name="city"]').value;
    userInfo.state = iframe.contentWindow.document.querySelector('[name="state"]').value;
    userInfo.zip = iframe.contentWindow.document.querySelector('[name="zip"]').value;

}


function usePhysicalAddr(){
    if(physicalAddr.checked){
        // Change address to the one in user info if checked
        iframe.contentWindow.document.querySelector('[name="addr1"]').value = userInfo.addr[0];
        iframe.contentWindow.document.querySelector('[name="addr2"]').value = userInfo.addr[1];
        iframe.contentWindow.document.querySelector('[name="city"]').value = userInfo.city;
        iframe.contentWindow.document.querySelector('[name="state"]').value = userInfo.state;
        iframe.contentWindow.document.querySelector('[name="zip"]').value =  userInfo.zip;
    }
    else{
        // If unchecking the box, reset all values to empty
        iframe.contentWindow.document.querySelector('[name="addr1"]').value = "";
        iframe.contentWindow.document.querySelector('[name="addr2"]').value = "";
        iframe.contentWindow.document.querySelector('[name="city"]').value = "";
        iframe.contentWindow.document.querySelector('[name="state"]').value = "";
        iframe.contentWindow.document.querySelector('[name="zip"]').value =  "";
    }
}

function shipSubmit(){

}

function checkoutSubmit(){
  window.parent.window.alert("Your order has been successfully submitted.");
    
//    cart.cartAmt = iframe.contentWindow.document.getElementById("cart-amount").value; // Derek stuff
//    cart.taxAmt = iframe.contentWindow.document.querySelector('[name="taxAmt"]').value;// Derek stuff
//    cart.shipAmt = iframe.contentWindow.document.querySelector('[name="shipAmt"]').value;// Derek stuff
//    cart.totalAmt = iframe.contentWindow.document.querySelector('[name="totalAmt"]').value;// Derek stuff
}

function row() {
     myTable = iframe.contentWindow.document.getElementById("addTable");
        // insert new row.
        newRow = myTable.insertRow(1);
        newCell1 = newRow.insertCell(0);
        newCell2 = newRow.insertCell(1);
        newCell1.innerHTML = "Placement";
        newCell2.innerHTML = "Sudo Placement";
}

function getStatesFromDB(){
	var STATES = 50;
     if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var stateArr = JSON.parse(this.responseText);
                    for(var i=0;i<STATES;i++){
                        var stateOpt = document.createElement("OPTION");
                        stateOpt.innerHTML = stateArr[i]['code'];                       iframe.contentWindow.document.getElementById("stateDropDown").appendChild(stateOpt);
                        iframe.contentWindow.document.querySelector('[name="state"]').value = userInfo.state;
                    }
                }
            };

            xmlhttp.open("GET","getStates.php",true);
            xmlhttp.send();
}

function getProductsFromDB(){
	var PRODUCTS = 10;
     if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var productArr = JSON.parse(this.responseText);
                    for(var i=0;i<PRODUCTS;i++){
                        var productOpt = document.createElement("OPTION");
                        productOpt.value = i;
                        productOpt.innerHTML = productArr[i]['desc'];
						iframe.contentWindow.document.getElementById("productDropDown").appendChild(productOpt); 
                        iframe.contentWindow.document.querySelector('[name="products"]').value = cart.products;
                    }
                    items = productArr;
                }
            };

            xmlhttp.open("GET","getProducts.php",true);
            xmlhttp.send();
}


function getUserNameFromDB(){
	var USERS = 3;
     if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var unameArr = JSON.parse(this.responseText);
                    for(var i=0;i<USERS;i++){
                        var unamerOpt = document.createElement("OPTION");
                        unameOpt.value = i;
                        unameOpt.innerHTML = unameArr[i]['usrname'];
						iframe.contentWindow.document.getElementById("username").appendChild(unameOpt); 
                        //iframe.contentWindow.document.querySelector('[name="products"]').value = cart.products;
                    }
                    items = unameArr;
                }
            };

            xmlhttp.open("GET","get_userCredentials.php",true);
            xmlhttp.send();
}

function getPasswordsFromDB(){
	var PASSWORDS = 3;
     if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var passwordArr = JSON.parse(this.responseText);
                    for(var i=0;i<PASSWORDS;i++){
                        var pwdOpt = document.createElement("OPTION");
                        pwdOpt.value = i;
                        pwdOpt.innerHTML = pwdArr[i]['pword'];
						iframe.contentWindow.document.getElementById("password").appendChild(pwdOpt); 
                        //iframe.contentWindow.document.querySelector('[name="products"]').value = cart.products;
                    }
                    items = passwordArr;
                }
            };

            xmlhttp.open("GET","get_userCredentials.php",true);
            xmlhttp.send();
}