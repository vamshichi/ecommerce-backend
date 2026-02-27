import { CategoryRepository } from "./category.repository";

export class CategoryService {
    private categoryRepository = new CategoryRepository();

    async create(data: { name: string, parentId?: string }) {
        return await this.categoryRepository.create(data);
    }

    async findAll() {
        return await this.categoryRepository.findAll();
    }

    async findTree() {
        return await this.categoryRepository.findTree();
    }

};