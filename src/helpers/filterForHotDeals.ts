import {HotDeal, Product} from '../redux';

const filterForHotDeals = (
  products: [Product],
  hotDeals: [HotDeal],
  cb: Function
) => {
  const today = new Date();
  var pastYear = today.getFullYear() - 1;
  //ürünlerdeki tarih aralıkları eski olduğu için 1 sene önceye göre filtreledim.
  today.setFullYear(pastYear);

  const filteredProducts = products.filter(product => {
    return hotDeals.some(deal => deal.productId === product.id);
  });

  cb(filteredProducts);
  return filteredProducts;
};

export default filterForHotDeals;
