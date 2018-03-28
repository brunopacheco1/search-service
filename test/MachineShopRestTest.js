const express = require("../util/express")();
const request = require("supertest")(express);

let cleanDatabase = done => {
    const tool = express.repositories.SchemaManagementTool(express);

    tool.clean().then(() => {
        done();
    }).catch((error) => {
        console.log("Cleaning failed: ");
        console.log(error);
        done();
    });
};

before(cleanDatabase);

after(cleanDatabase);

describe("MachineShopRestTest", () => {
    machineShopTest = {
        "location": {
            "lat": -21.9448222,
            "lng": -44.1939177
        },
        "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
        "name" : "Mecânica Dragrão",
        "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
    };

    it("#GET /machine-shop/:id SUCESS", (done) => {
        request.get(`/machine-shop/${machineShopTest._id}`)
            .expect("Content-Type", /json/)
            .expect(/null/)
            .expect(200, done);
    });

    it("#GET /machine-shop SUCESS", (done) => {
        request.get("/machine-shop")
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });

    it("#POST /machine-shop FAIL", (done) => {
        request.post("/machine-shop")
            .send({
                "name" : ""
            })
            .expect("Content-Type", /json/)
            .expect(/Name is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop SUCESS", (done) => {
        request.post("/machine-shop")
            .send(machineShopTest)
            .expect("Content-Type", /json/)
            .expect(/Machine shop saved/)
            .expect(200, done);
    });

    it("#PUT /machine-shop FAIL", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send({
                "name" : ""
            })
            .expect("Content-Type", /json/)
            .expect(/Name is a mandatory field/)
            .expect(400, done);
    });

    it("#PUT /machine-shop SUCESS", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send(machineShopTest)
            .expect("Content-Type", /json/)
            .expect(/Machine shop updated/)
            .expect(200, done);
    });

    it("#DELETE /machine-shop SUCESS", (done) => {        
        request.delete(`/machine-shop/${machineShopTest._id}`)
            .expect("Content-Type", /json/)
            .expect(/Machine shop deleted/)
            .expect(200, done);
    });
});