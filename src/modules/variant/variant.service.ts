import { VariantRepository } from "./variant.repository";

export class VariantService {
    private variantRepository = new VariantRepository();

    async create(data: any) {
        return await this.variantRepository.create(data);
    }

    async findByProduct(productId: string) {
        return await this.variantRepository.findByProduct(productId);
    }

};  