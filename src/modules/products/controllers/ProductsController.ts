import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

export default class ProductsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const service = new ProductService();
    const products = await service.list();
    return response.json(products);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const service = new ProductService();
    const { id } = request.params;
    const product = await service.getById({ id });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const service = new ProductService();
    const { name, price, quantity } = request.body;
    const product = await service.create({ name, price, quantity });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const service = new ProductService();
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const product = await service.update({ id, name, price, quantity });
    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const service = new ProductService();
    const { id } = request.params;
    await service.delete({ id });
    return response.json([]);
  }
}
