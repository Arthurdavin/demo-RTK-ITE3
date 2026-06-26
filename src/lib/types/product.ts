export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export type ProductForm = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export type ProductFormValues = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;
