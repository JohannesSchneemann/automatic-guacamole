// All products (Will eventually be in database)
var items = [{
    id:123,
    title:"alternator",
    unit: 1,
    desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    img:"alternator.png",
    price:179.00
},{
    id:456,
    title:"battery",
    unit: 1,
    desc:"Quisquam, veritatis, officia. Veritatis, saepe!",
    img:"battery.png",
    price:135.00
},{
    id:789,
    title:"brake disc",
    unit: 1,
    desc:"Fugit dolorum consequatur rem molestiae, possimus dignissimos!",
    img:"brake_disk.png",
    price:30.00
},{
    id:987,
    title:"drive belt",
    unit: 1,
    desc:"Donec arcu risus diam amet sit.",
    img:"drive_belt.png",
    price:10.00
},{
    id:654,
    title:"engine oil",
    unit: 1,
    desc:"In vitae vel, wisi at, id praesent bibendum libero faucibus porta egestas, quisque praesent ipsum fermentum tempor.",
    img:"engine_oil.png",
    price:25.00
},{
    id:321,
    title:"floor mats",
    unit: 1,
    desc:"Maecenas aliquam maecenas ligula nostra, accumsan taciti.",
    img:"floor_mats.png",
    price:89.00
},{
    id:234,
    title:"light bulbs",
    unit: 1,
    desc:"Arcu habitasse elementum est, ipsum purus pede porttitor class.",
    img:"light_bulbs.png",
    price:2.00
},{
    id:567,
    title:"spark plug",
    unit: 1,
    desc:"Porttitor mollis imperdiet libero senectus pulvinar.",
    img:"spark_plug.png",
    price:8.00
},{
    id:809,
    title:"tires",
    unit: 1,
    desc:"Repellat orci erat et, sem cum, ultricies sollicitudin amet eleifend dolor nullam erat, malesuada est leo ac.",
    img:"tires.png",
    price:85.00
},{
    id:101,
    title:"windshield wipers",
    unit: 1,
    desc:"Duis montes, tellus lobortis lacus amet arcu et.",
    img:"windshield_wipers.png",
    price:12.00
}];


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

var iframe, partSelect, qtySelect, qty, price, unitPrice, totalPrice, physicalAddr, itemSelected, myTable;
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

        // Populate cart details when a new unit size or product is select
        qtySelect = iframe.contentWindow.document.querySelector('[name="quantity"]');
        if(qtySelect){
            qtySelect.addEventListener('input', populateCart);
        }

        // Reset quanitity to 1 when changing products
        partSelect = iframe.contentWindow.document.querySelector('[name="parts"]');
        if(partSelect){
            partSelect.addEventListener('change', function(){
                qtySelect.value = 1;
                populateCart();
            });
        }
        if(submitButton){
            iframe.contentWindow.document.querySelector('[name="item1"]').value = cartField.item[0];
            iframe.contentWindow.document.querySelector('[name="item2"]').value = cartField.item[1];
            iframe.contentWindow.document.querySelector('[name="item3"]').value = cartField.item[2];
            iframe.contentWindow.document.querySelector('[name="item4"]').value = cartField.item[3];
            iframe.contentWindow.document.querySelector('[name="price1"]').value = cartField.price[0];
            iframe.contentWindow.document.querySelector('[name="price2"]').value = cartField.price[1];
            iframe.contentWindow.document.querySelector('[name="price3"]').value = cartField.price[2];
            iframe.contentWindow.document.querySelector('[name="price4"]').value = cartField.price[3];
        }

    }
    // USER INFO
    if(!submitButton){

        submitButton = iframe.contentWindow.document.getElementById("user-info-submit");
        submitFunc = userInfoSubmit;

        // Populate user info with saved values if there is any
        if(submitButton){
            iframe.contentWindow.document.querySelector('[name="fullname"]').value = userInfo.name;
            iframe.contentWindow.document.querySelector('[name="addr1"]').value = userInfo.addr[0];
            iframe.contentWindow.document.querySelector('[name="addr2"]').value = userInfo.addr[1];
            iframe.contentWindow.document.querySelector('[name="city"]').value = userInfo.city;
            iframe.contentWindow.document.querySelector('[name="state"]').value = userInfo.state;
            iframe.contentWindow.document.querySelector('[name="zip"]').value =  userInfo.zip;
        }
    }
    // SHIPPING INFO
    if(!submitButton){

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
            if(iframe.contentWindow.document.querySelector('#item1').value == ""){
                itemSel = iframe.contentWindow.document.querySelector('#item1');
                unitPrice = iframe.contentWindow.document.querySelector('#price1');
            }
            else if(iframe.contentWindow.document.querySelector('#item2').value ==  ""){
                itemSel = iframe.contentWindow.document.querySelector('#item2');
                unitPrice = iframe.contentWindow.document.querySelector('#price2');
            }
            else if (iframe.contentWindow.document.querySelector('#item3').value == ""){
                itemSel = iframe.contentWindow.document.querySelector('#item3');
                unitPrice = iframe.contentWindow.document.querySelector('#price3');
            }
            else if (iframe.contentWindow.document.querySelector('#item4').value == ""){
                itemSel = iframe.contentWindow.document.querySelector('#item4');
                unitPrice = iframe.contentWindow.document.querySelector('#price4');
            }
            iframe.contentWindow.document.getElementById("cart-amount").value = "$" + cart.cartAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("tax-amount").value = "$" + cart.taxAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("ship-amount").value = "$" + cart.shipAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("total-amount").value = "$" + cart.totalAmt.toFixed(2);
            iframe.contentWindow.document.getElementById("supplyAmt").value = "$" + cartSum.cartSumAmt.toFixed(2);// Derek stuff
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
    if(iframe.contentWindow.document.querySelector('#item1').value == ""){
        itemSel = iframe.contentWindow.document.querySelector('#item1');
        tablePrice = iframe.contentWindow.document.querySelector('#price1');
    }
    else if(iframe.contentWindow.document.querySelector('#item2').value ==  ""){
        itemSel = iframe.contentWindow.document.querySelector('#item2');
        tablePrice = iframe.contentWindow.document.querySelector('#price2');
    }
    else if (iframe.contentWindow.document.querySelector('#item3').value == ""){
        itemSel = iframe.contentWindow.document.querySelector('#item3');
        tablePrice = iframe.contentWindow.document.querySelector('#price3');
    }
    else if (iframe.contentWindow.document.querySelector('#item4').value == ""){
        itemSel = iframe.contentWindow.document.querySelector('#item4');
        tablePrice = iframe.contentWindow.document.querySelector('#price4');
    }
    qty = qtySelect.value;
    qty = qty * 1.0;
    // Check object for given name and then populate fields based on product info
    for(var i=0; i<items.length; i++){
        if(items[i].title == partSelect.value){
            price = items[i].price.toFixed(2);
            itemSelected = items[i].title;
            totalPrice.value = "$" + (price * qty).toFixed(2);
            unitPrice.value = "$" + price;
            tablePrice.value = "$" + price;

            itemSel.value = itemSelected;
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
        if(items[i].title == partSelect.value){
            price = items[i].price.toFixed(2);
            totalPrice.value = "$" + (price * qty).toFixed(2);
            unitPrice.value = "$" + price;
            break;
        }
        totalPrice.value = "";
        unitPrice.value = "";
    }

}


function cartSubmit(){
    cart.calc(qty, price);
    console.log(cart);
    cartField.item[0] = iframe.contentWindow.document.querySelector('[name="item1"]').value;
    cartField.item[1] = iframe.contentWindow.document.querySelector('[name="item2"]').value;
    cartField.item[2] = iframe.contentWindow.document.querySelector('[name="item3"]').value;
    cartField.item[3] = iframe.contentWindow.document.querySelector('[name="item4"]').value;
    cartField.price[0] = iframe.contentWindow.document.querySelector('[name="price1"]').value;
    cartField.price[1] = iframe.contentWindow.document.querySelector('[name="price2"]').value;
    cartField.price[2] = iframe.contentWindow.document.querySelector('[name="price3"]').value;
    cartField.price[3] = iframe.contentWindow.document.querySelector('[name="price4"]').value;

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
    cart.cartAmt = iframe.contentWindow.document.getElementById("cart-amount").value; // Derek stuff
    cart.taxAmt = iframe.contentWindow.document.querySelector('[name="taxAmt"]').value;// Derek stuff
    cart.shipAmt = iframe.contentWindow.document.querySelector('[name="shipAmt"]').value;// Derek stuff
    cart.totalAmt = iframe.contentWindow.document.querySelector('[name="totalAmt"]').value;// Derek stuff
}

function summaryInfo(){
    iframe.contentWindow.document.querySelector('[name="supplyAmt"]').value = cart.cartAmt;// Derek stuff
    iframe.contentWindow.document.querySelector('[name="taxAmt"]').value = cart.taxAmt;// Derek stuff
    iframe.contentWindow.document.querySelector('[name="shipFee"]').value = cart.shipAmt;// Derek stuff
    iframe.contentWindow.document.querySelector('[name="totalAmt"]').value = cart.totalAmt;// Derek stuff
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
