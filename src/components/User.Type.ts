export type CardPageType = {
  item: cards;
};

export type cards = {
  id: number;
  name: string;
  image: string;
  sale_price: number;
};
export type TopCategoriesType = {
  slug: string;
  title: string;
};

export type Products = {
  id: number;
  name: string;
  large_images: string[];
  sale_price: number;
};
export type CarouselType = {
  image_mobile_web: string;
}[];

export type Product = cards[];

export type TopMenuType = {
  total: number;
  products: Product;
};
