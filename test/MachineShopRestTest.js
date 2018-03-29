const express = require("../util/express")();
const request = require("supertest")(express);


before(done => {
    const tool = express.repositories.SchemaManagementTool(express);

    tool.runSteps().then(() => {
        done();
    }).catch((error) => {
        console.log("Cleaning failed: ");
        console.log(error);
        done();
    });
});

describe("MachineShopRestTest", () => {
    let machineShopTest = {
        "location": "-21.9448222,-44.1939177",
        "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
        "name" : "Oficina Mecânica Dragrão",
        "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
    };

    let searchRequest = {
        "location": "-21.9448222,-44.1939177",
        "maxDistance" : 0,
        "minDistance" : 0
    };

    it("#GET /machine-shop/:id null result", (done) => {
        request.get(`/machine-shop/${machineShopTest._id}`)
            .expect("Content-Type", /json/)
            .expect(/null/)
            .expect(200, done);
    });

    it("#GET /machine-shop empty result", (done) => {
        request.get("/machine-shop")
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });

    it("#POST /machine-shop null name", (done) => {
        request.post("/machine-shop")
            .send({
                "location": "-21.9448222,-44.1939177",
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/name is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop null _id", (done) => {
        request.post("/machine-shop")
            .send({
                "location": "-21.9448222,-44.1939177",
                "name" : "Oficina Mecânica Dragrão",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/_id is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop null vicinity", (done) => {
        request.post("/machine-shop")
            .send({
                "location": "-21.9448222,-44.1939177",
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "name" : "Oficina Mecânica Dragrão"
            })
            .expect("Content-Type", /json/)
            .expect(/vicinity is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop null location", (done) => {
        request.post("/machine-shop")
            .send({
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "name" : "Oficina Mecânica Dragrão",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/location is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop mandatory fields fulfilled", (done) => {
        request.post("/machine-shop")
            .send(machineShopTest)
            .expect("Content-Type", /json/)
            .expect(/Machine shop saved/)
            .expect(200, done);
    });

    it("#PUT /machine-shop null name", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send({
                "location": "-21.9448222,-44.1939177",
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/name is a mandatory field/)
            .expect(400, done);
    });

    it("#PUT /machine-shop null _id", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send({
                "location": "-21.9448222,-44.1939177",
                "name" : "Oficina Mecânica Dragrão",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/_id is a mandatory field/)
            .expect(400, done);
    });

    it("#PUT /machine-shop null vicinity", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send({
                "location": "-21.9448222,-44.1939177",
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "name" : "Oficina Mecânica Dragrão"
            })
            .expect("Content-Type", /json/)
            .expect(/vicinity is a mandatory field/)
            .expect(400, done);
    });

    it("#PUT /machine-shop null location", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send({
                "_id": "30b55671ea603f0541a37465bf5dc65fa4b3b973",
                "name" : "Oficina Mecânica Dragrão",
                "vicinity": "348, R. Santos Dumont, 236, Bom Jardim de Minas - MG, 37310-000"
            })
            .expect("Content-Type", /json/)
            .expect(/location is a mandatory field/)
            .expect(400, done);
    });

    it("#PUT /machine-shop mandatory fields fulfilled", (done) => {
        request.put(`/machine-shop/${machineShopTest._id}`)
            .send(machineShopTest)
            .expect("Content-Type", /json/)
            .expect(/Machine shop updated/)
            .expect(200, done);
    });

    it("#POST /machine-shop/search expected result by location", (done) => {
        request.post("/machine-shop/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/30b55671ea603f0541a37465bf5dc65fa4b3b973/)
            .expect(200, done);
    });

    it("#POST /machine-shop/search expected result by text", (done) => {
        searchRequest.query = "Oficina";

        request.post("/machine-shop/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/30b55671ea603f0541a37465bf5dc65fa4b3b973/)
            .expect(200, done);
    });

    it("#POST /machine-shop/search not expected result by location", (done) => {
        searchRequest.location = "-21.9448222,0";

        request.post("/machine-shop/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });
    
    it("#POST /machine-shop/search not expected result by text", (done) => {
        searchRequest.lat = -21.9448222;
        searchRequest.query = "Teste";
        
        request.post("/machine-shop/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });

    it("#POST /machine-shop/search null location", (done) => {
        request.post("/machine-shop/search")
            .send({
                "maxDistance" : 0,
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/location is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search null maxDistance", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/maxDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search null minDistance", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/minDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search invalid location", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "asdasdasd",
                "maxDistance" : "asdasdsa",
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/maxDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search invalid maxDistance", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : "asdasdsa",
                "minDistance" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/maxDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search invalid minDistance", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 0,
                "minDistance" : "asdasdasd"
            })
            .expect("Content-Type", /json/)
            .expect(/minDistance is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search invalid query", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 1,
                "minDistance" : 0,
                "query" : "23"
            })
            .expect("Content-Type", /json/)
            .expect(/Query should be at least 3 chars long/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search invalid limit", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 1,
                "minDistance" : 0,
                "limit" : "asd"
            })
            .expect("Content-Type", /json/)
            .expect(/limit should be int/)
            .expect(400, done);
    });

    it("#POST /machine-shop/search invalid start", (done) => {
        request.post("/machine-shop/search")
            .send({
                "location": "-21.9448222,-44.1939177",
                "maxDistance" : 1,
                "minDistance" : 0,
                "start" : "asd"
            })
            .expect("Content-Type", /json/)
            .expect(/start should be int/)
            .expect(400, done);
    });

    it("#DELETE /machine-shop successfull deletion", (done) => {        
        request.delete(`/machine-shop/${machineShopTest._id}`)
            .expect("Content-Type", /json/)
            .expect(/Machine shop deleted/)
            .expect(200, done);
    });

    it("#POST /machine-shop/search empty result after deletion", (done) => {        
        request.post("/machine-shop/search")
            .send(searchRequest)
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });

    it("#GET /machine-shop empty result after deletion", (done) => {
        request.get("/machine-shop")
            .expect("Content-Type", /json/)
            .expect(/\[\]/)
            .expect(200, done);
    });

    it("#POST /machine-shop/crawl null location", (done) => {
        request.post("/machine-shop/crawl")
            .send({
                "radius" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/location is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/crawl null radius", (done) => {
        request.post("/machine-shop/crawl")
            .send({
                "location" : "-21.9448222,-44.1939177"
            })
            .expect("Content-Type", /json/)
            .expect(/radius is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/crawl invalid location", (done) => {
        request.post("/machine-shop/crawl")
            .send({
                "location" : "asdfadfs",
                "radius" : 0
            })
            .expect("Content-Type", /json/)
            .expect(/location is a mandatory field/)
            .expect(400, done);
    });

    it("#POST /machine-shop/crawl invalid radius", (done) => {
        request.post("/machine-shop/crawl")
            .send({
                "location" : "-21.9448222,-44.1939177",
                "radius" :  "asdfadfs"
            })
            .expect("Content-Type", /json/)
            .expect(/radius is a mandatory field/)
            .expect(400, done);
    });
});