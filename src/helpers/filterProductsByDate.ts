import {Product, ProductTiming} from '../redux';

const filterProductsByDate = (
  products: [Product],
  productTimings: [ProductTiming],
  cb?: Function
) => {
  const today = new Date();
  var pastYear = today.getFullYear() - 1;
  //ürünlerdeki tarih aralıkları eski olduğu için 1 sene önceye göre filtreledim.
  today.setFullYear(pastYear);

  const filteredProducts: Product[] | any[] = products.filter(product => {
    const productTiming = productTimings.find(
      time => time.productId === product.id
    );

    if (productTiming) {
      if (
        Number(today) - Number(new Date(productTiming.startDate)) > 0 &&
        Number(new Date(productTiming.endDate)) - Number(today) > 0
      ) {
        return product;
      }
    } else {
      return product;
    }
  });

  cb && cb(filteredProducts);
  return filteredProducts;
};

export default filterProductsByDate;
