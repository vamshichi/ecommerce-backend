import request from "supertest";
import {app} from "../app";

describe("Order API", () => {

  it("should create order", async () => {

    const res = await request(app)
      .post("/api/orders")
      .send({
        items: [
          {
            variantId: "variant-id",
            quantity: 1
          }
        ]
      });

    expect(res.statusCode).toBe(200);

  });

});