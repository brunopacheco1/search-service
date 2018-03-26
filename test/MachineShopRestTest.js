let express = require("../util/express")();

let request = require("supertest")(express);

describe("MachineShopRestTest", () => {
    it("#GET /machine-shop/:id", (done) => {
        request.get("/machine-shop/5ab8e7746c4ef231e056595a")
            .expect("Content-Type", /json/)
            .expect(/null/)
            .expect(200, done);
    });

    it("#GET /machine-shop", (done) => {
        request.get("/machine-shop")
            .expect("Content-Type", /json/)
            .expect(/_id/)
            .expect(200, done);
    });
});