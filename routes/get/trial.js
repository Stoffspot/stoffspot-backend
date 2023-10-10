class ProductAnalyzer {
  static getSimilarAndAssociatedProducts(productName, productArray) {
    return new Promise((resolve, reject) => {
      if (!productArray || productArray.length === 0) {
        reject(new Error('Product array is empty.'));
      }

      const selectedProduct = productArray.find(product => product.Name === productName);

      if (!selectedProduct) {
        reject(new Error('Selected product not found.'));
      }

      const similarProducts = productArray.filter(product =>
        product.Category === selectedProduct.Category &&
        (product.Gender === selectedProduct.Gender || product.Gender === 'unisex') &&
        product._id !== selectedProduct._id
      ).map(product => ({ id: product._id, name: product.Name }));
      
      const associatedProducts = selectedProduct.store.Productlist
      .filter(id => id !== selectedProduct._id)
      .map(id => {
        const associatedProduct = productArray.find(product => product._id === id);
        if (associatedProduct && (associatedProduct.Gender === selectedProduct.Gender || associatedProduct.Gender === 'unisex')) {
          return { id: associatedProduct._id, name: associatedProduct.Name };
        }
      })
      .filter(product => product);
      

      const result = { similarProducts, associatedProducts };
      resolve(result);
    });
  }
}

module.exports = ProductAnalyzer;
