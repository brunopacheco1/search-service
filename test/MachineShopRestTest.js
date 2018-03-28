let express = require("../util/express")();

let request = require("supertest")(express);

before(done => {
    let tool = express.repositories.SchemaManagementTool(express);

    tool.clean().then(() => {
        done();
    }).catch((error) => {
        console.log("Cleaning failed: ");
        console.log(error);
        done();
    });
});

describe("MachineShopRestTest", () => {
    
    it("#GET /machine-shop/:id SUCESS", (done) => {
        request.get("/machine-shop/5ab8e7746c4ef231e056595a")
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
            .send({
                "location": {
                    "lat": -21.9448222,
                    "lng": -44.1939177
                },
                "name": "Mecânica Dragão",
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/Machine shop saved/)
            .expect(200, done);
    });
});