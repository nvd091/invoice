"use strict";

const calculateDiscount = (customer, subtotal) => {
    if (customer == "reg") {
        if (subtotal >= 100 && subtotal < 250) {
            return .1;
        } else if (subtotal >= 250 && subtotal < 500) {
            return  .25;
        } else if (subtotal >= 500) {
            return .3;
        } else {
            return 0;
        }        
    }
    else if (customer == "loyal") {
        return .3;        
    }
    else if (customer == "honored") {
        if (subtotal < 500) {
            return .4;
        }
        else {
            return .5;
        }    
    }
};

$( document ).ready( () => {

    $("#calculate").click( () => {
        const customerType = $("#type").val();
        let subtotal = $("#subtotal").val();
        subtotal = parseFloat(subtotal);

        // Use Date
    function dates(value) {
        let date = new Date(value);
        return date;
      }
      const datefinal = dates($("#invoice_date").val());
  
      if (datefinal == "Invalid Date") {
        // Error Message
        alert("please enter valid date with MM/DD/YYYY format.");
        $("#clear").click();
        $("#invoice_date").focus();
        let currentdate = new Date();
        let finaldate =
          currentdate.getMonth() +
          1 +
          "/" +
          currentdate.getDate() +
          "/" +
          currentdate.getFullYear();
        $("#invoice_date").val(finaldate);
        return;
      }

        // subtotal is not a number or less then equal to 0
        if ( isNaN(subtotal) || subtotal <= 0) {
            alert("Subtotal must be a number greater than zero.");
            $("#clear").click();
            $("#subtotal").focus();
            return;
        }

        const discountPercent = calculateDiscount(customerType, subtotal);
        const discountAmount = subtotal * discountPercent;
        const invoiceTotal = subtotal - discountAmount;
        
        $("#subtotal").val( subtotal.toFixed(2) );
        $("#percent").val( (discountPercent * 100).toFixed(2) );
        $("#discount").val( discountAmount.toFixed(2) );
        $("#total").val(  invoiceTotal.toFixed(2) );

        // invoice date with val method
        const invoicedate = dates($("#invoice_date").val());
        invoicedate.setDate(invoicedate.getDate() + 30);

         // Confirm due date
    let confirmduedate =
    invoicedate.getMonth() +
    1 +
    "/" +
    invoicedate.getDate() +
    "/" +
    invoicedate.getFullYear();

  $("#due_date").val(confirmduedate);
        

        // set focus on type drop-down when done  
        $("#type").focus();

    });
    
    $("#clear").click( () => {

        $("#type").val("reg");
        $("#subtotal").val("");
        $("#invoice_date").val("");
        $("#percent").val("");
        $("#discount").val("");
        $("#total").val("");
        $("#due_date").val("");

        // set focus on type drop-down when done
        $("#type").focus();
    })

    // set focus on type drop-down on initial load
    $("#type").focus();
});

