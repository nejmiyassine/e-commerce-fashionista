export const calculateSubTotal = (cartItems) =>
    cartItems
        .reduce((previousValue, currentValue) => {
            return (
                parseFloat(previousValue) +
                parseFloat(currentValue.quantity) *
                    parseFloat(currentValue.product.price)
            );
        }, 0)
        .toFixed(2);
