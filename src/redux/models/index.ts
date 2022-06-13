export interface ThemeState {
  selectedTheme: string;
}
export interface LoginState {
  activeLogin: any;
}
export interface Product {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  price: string;
  category: string;
  quantity?: number;
}

export interface ProductTiming {
  productId: string;
  startDate: string;
  endDate: string;
}

export interface HotDeal {
  productId: string;
}

export interface ProductState {
  products: [Product];
  productTimings: [ProductTiming];
  hotDeals: [HotDeal];
  error: string;
}

export interface CartState {
  cart: [Product];
}
