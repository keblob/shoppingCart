const sum = function (total, x) {
    return total + x;
};

let updateSubTotal = function (element) {
    let prodPrice = parseFloat($(element).children('.productPrice').text());
    let prodQuant = parseFloat($(element).children('.productQuantity').text());

    let subTotal = prodPrice * prodQuant;
    $(element).children('.productSubTotal').html(subTotal);

    return subTotal;
}


$(document).ready(function () {
    let totalValue = [];

    $('tbody tr').each(function (i, element) {
        let cartSubTotals = updateSubTotal(element);
        totalValue.push(cartSubTotals);
    });

    let shoppingCartTotal = totalValue.reduce(sum);
    $('#shoppingCartTotal').html(shoppingCartTotal);
});