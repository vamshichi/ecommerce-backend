import { AddressRepository } from "./address.repository";

export class AddressService {

  private repo = new AddressRepository();

  async createAddress(userId: string, data: any) {
    return this.repo.create({
      ...data,
      userId
    });
  }

  async getUserAddresses(userId: string) {
    return this.repo.findByUser(userId);
  }

  async deleteAddress(userId: string, addressId: string) {
    return this.repo.delete(addressId, userId);
  }

}