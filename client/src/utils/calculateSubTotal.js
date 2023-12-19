export const calculateSubTotal = (cartItems) => {
    if (cartItems !== undefined || cartItems.length)
        return cartItems
            .reduce((previousValue, currentValue) => {
                return (
                    parseFloat(previousValue) +
                    parseFloat(currentValue.quantity) *
                        parseFloat(currentValue.product.discount_price)
                );
            }, 0)
            .toFixed(2);

    return 0;
};
