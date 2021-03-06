"use strict";
function getItemsList() {
    //debugger;
    console.log("Invoked getItemsList()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/items/list";    		// API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatItemsList(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}
function formatItemsList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.ItemID + "<td><td>" + item.Name + "<tr><td>";
    }
    document.getElementById("ItemsTable").innerHTML = dataHTML;
}

function getItems() {
    console.log("Invoked getUser()");     //console.log your BFF for debugging client side
    const ItemIDnum = document.getElementById("ItemIDnum").value;  //get the UserId from the HTML element with id=ItemIDnum
    //debugger;				  //debugger statement to allow you to step through the code in console dev F12
    const url = "/items/get/";       // API method on webserver
    fetch(url + ItemIDnum, {                // ItemIDnum as a path parameter
        method: "GET",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            document.getElementById("DisplayOneUser").innerHTML = response.ItemID + " " + response.Name + " £" + response.Price;
            document.getElementById("DisplayOneUser").innerHTML = itemsHTML;
        }
    });
}

function AddItems() {
    //debugger;
    console.log("Invoked ItemsAdd() ");
    let url = "/items/add";
    let formData = new FormData(document.getElementById('ItemForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            alert("Item was added to database.");
        }
    });
}
function deleteItems() {
    console.log("Invoked deleteItems()");     //console.log your BFF for debugging client side
    const ItemID = document.getElementById("Item").value;  //get the UserId from the HTML element with id=UserID
    //debugger;				  //debugger statement to allow you to step through the code in console dev F12
    const url = "/items/delete/";       // API method on webserver
    fetch(url + ItemID, {                // ItemID as a path parameter
        method: "DELETE",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {                                   //something here
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            alert(JSON.stringify(response), "has been deleted");
        }
    });

}
function BasketsAdd(){

    console.log("Invoked addWish()");
    const url = "/checkout/add/";
    fetch(url + ItemID,{
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            alert("Item was added to database.");
        }
    });
}

function BasketsDelete(){
    console.log("Invoked addWish()");
    const url = "checkout/delete/";
    fetch(url + ItemID, {                // ItemID as a path parameter
        method: "DELETE",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {                                   //something here
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            alert(JSON.stringify(response),"has been deleted");
        }
    });

}





