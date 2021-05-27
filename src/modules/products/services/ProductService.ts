import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
}

class ProductService {
  public async create({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name || '');
    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }

  public async list(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    return productsRepository.find();
  }

  public async getById({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({ id: id });
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }

  public async update({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name || '');

    if (productExists && productExists.id !== id) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    await productsRepository.save(product);

    return product;
  }

  public async delete({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({ id: id });
    if (!product) {
      throw new AppError('Product not found');
    }
    await productsRepository.remove(product);
  }
}

export default ProductService;
