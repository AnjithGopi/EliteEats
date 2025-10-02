import { Model, FilterQuery, UpdateQuery } from "mongoose";

class BaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  create = async (data: Partial<T>): Promise<T> => {
    return this.model.create(data);
  };

  findAll = async (filter: FilterQuery<T> = {}): Promise<T[]> => {
    return this.model.find(filter);
  };

  findOne = async (filter: FilterQuery<T>): Promise<T | null> => {
    return this.model.findOne(filter);
  };

  findById = async (id: string): Promise<T | null> => {
    return this.model.findById(id);
  };

  updateById = async (
    id: string,
    update: UpdateQuery<T>
  ): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  };

  updateOne = async (
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> => {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  };

  deleteById = async (id: string): Promise<T | null> => {
    return this.model.findByIdAndDelete(id);
  };

  deleteOne = async (filter: FilterQuery<T>): Promise<T | null> => {
    return this.model.findOneAndDelete(filter);
  };
}

export default BaseRepository;
