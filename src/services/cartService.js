const getStoredCart = () => {
  const cart = localStorage.getItem('user_cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem('user_cart', JSON.stringify(cart));
};

export const cartService = {
  getCart: () => getStoredCart(),

  addToCart: (product, quantity = 1) => {
    const cart = getStoredCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: typeof product.price === "string"
          ? Number(product.price.replace(/\./g, ""))
          : Number(product.price),
        img_urls: product.img_urls,
        quantity: quantity
      });
    }
    saveCart(cart);
    return cart;
  },

  removeFromCart: (productId) => {
    const cart = getStoredCart().filter(item => item.id !== productId);
    saveCart(cart);
    return cart;
  },

  updateQuantity: (productId, quantity) => {
    const cart = getStoredCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      saveCart(cart);
    }
    return cart;
  },

  clearCart: () => {
    localStorage.removeItem('user_cart');
    return [];
  },

  getTotalPrice: () => {
    const cart = getStoredCart();
    return cart.reduce((total, item) => {
      const price = Number(String(item.price).replace(/\./g, ""));
      return total + (price * item.quantity);
    }, 0);
  },

  getCartCount: () => {
    const cart = getStoredCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};
