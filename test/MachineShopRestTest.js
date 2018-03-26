let express = require("../util/express")();

let request = require("supertest")(express);

describe("MachineShopRestTest", () => {
    it("#GET /machine-shop/:id", (done) => {
        request.get("/machine-shop/1")
            .expect("Content-Type", /json/)
            .expect(/1/)
            .expect(200, done);
    });
});