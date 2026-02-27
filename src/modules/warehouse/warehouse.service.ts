import { WarehouseRepository } from "./warehouse.repository";

export class WarehouseService {
    private warehouseRepository = new WarehouseRepository();

    async create(data: any) {
        return await this.warehouseRepository.create(data);
    }

    async findAll() {
        return await this.warehouseRepository.findAll();
    }

};