export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product == null) { return; }
    if(this.cartItems.length > 0 && product){
      for(let item of this.cartItems){
        if( item.product.id === product.id){
          item.count++;
          this.onProductUpdate(item);
          return;
        }
      }
    }
    const newItem = { product, count: 1,}; 
    this.cartItems.push(newItem);
    this.onProductUpdate(newItem);
  }

  updateProductCount(productId, amount) {
    let elem = this.cartItems?.findIndex(item => item.product.id === productId);
    let cartItem = this.cartItems[elem]

    cartItem.count += amount;

    if (this.cartItems.length == 1 && cartItem.count < 1) {
      this.cartItems = [];
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.map(item => item.count).reduce(this.getReducer(),0);
  }
  
  getTotalPrice() {
    return this.cartItems.map(item => item.product.price * item.count).reduce(this.getReducer(),0);
  }

  getReducer(){
    return (previousValue, currentValue) => previousValue + currentValue;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

