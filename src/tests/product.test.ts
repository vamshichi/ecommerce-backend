import request from "supertest";
import {app} from "../app";

describe("Product API", () => {

  it("should fetch products", async () => {

    const res = await request(app)
      .get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");

  });

});