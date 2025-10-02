
import { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<any>;
  findAll(filter?: FilterQuery<T>): Promise<any[]>;
  findOne(filter: FilterQuery<T>): Promise<any>;
  findById(id: string): Promise<any>;
  updateById(id: string, update: UpdateQuery<T>): Promise<any>;
  updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<any>;
  deleteById(id: string): Promise<any>;
  deleteOne(filter: FilterQuery<T>): Promise<any>;
}
