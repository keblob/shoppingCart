let updateSubTotal = function (ele) {
    let prodPrice = parseFloat($(ele).find('.productPrice input').val());
    let prodQuant = parseFloat($(ele).find('.productQuantity input').val());

    let subTotal = prodPrice * prodQuant;
    $(ele).children('.productSubTotal').html(subTotal);

    return subTotal;
}

let sum = function (total, x) {
    return total + x;
};

let updateShoppingCart = function () {
    let totalValue = [];

    $('tbody tr').each(function (i, ele) {
        let subTotal = updateSubTotal(ele);
        console.log(subTotal);
        totalValue.push(subTotal);
    });

    let shoppingCartTotal = totalValue.reduce(sum);
    $('#shoppingCartTotal').html(shoppingCartTotal);
}

$(document).ready(function () {
    updateShoppingCart();

    $(document).on('click', '.btn.remove', function (event) {
        $(this).closest('tr').remove();
        updateShoppingCart();
    });

    let timeout;
    $(document).on('input', 'tr input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            updateShoppingCart();
        }, 1000);
    });


    $('#addGrocery').on('submit', function (event) {
        event.preventDefault();
        let productName = $(this).children('[name=productName]').val();
        console.log(productName)
        let productPrice = $(this).children('[name=productPrice]').val();
        console.log(productPrice);
        let productQuantity = $(this).children('[name=productQuantity]').val();
        console.log(productQuantity);

        $('tbody').append(
            '<tr>' +
                '<td class="productName">' + productName + '</td>' +
                '<td class="productPrice"><input type="number" value="' + productPrice + '" /></td>' +
                '<td class="productQuantity"><input type="number" value="' + productQuantity + '" /></td>' +
                '<td class="productSubTotal"></td>' +
                '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
            '</tr>');
        
        updateShoppingCart();
        $(this).children('[name=productName]').val('');
        $(this).children('[name=productPrice]').val('');
        $(this).children('[name=productQuantity]').val('');
    });
});