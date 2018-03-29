const { checkSchema } = require('express-validator/check');

module.exports = app => {
    let errorHandler = (error, response) => {

        console.log(error);

        let status = 500;

        if(error.status) {
            status = error.status;
        }

        response.status(status).json({
            error : error.message
        });
        
    };   

    let validateRequest = (request, response, callback) => {

        let errors = request.validationErrors();

        if(errors) {
            let messages = errors.map(error => error.msg);

            response.status(400).json({
                error : messages
            });
        } else {
            callback();
        }
    };

    const service = app.services.MachineShopService(app);
    const searchModel = app.model.Search;
    const crawlingModel = app.model.Crawling;
    const machineShopModel = app.model.MachineShop;
    
    app.get("/machine-shop/:id", (request, response) => {

        service.get(request.params.id).then(machineShop => {

            response.json(machineShop);

        }).catch(error => errorHandler(error, response));

    });
    
    app.get("/machine-shop", (request, response) => {

        service.list().then(resultList => {

            response.json(resultList);

        }).catch(error => errorHandler(error, response));

    });

    app.post("/machine-shop", checkSchema(machineShopModel), 
        (request, response) => validateRequest(request, response, () => {

            service.save(request.body).then(() => {

                response.json({
                    response : "Machine shop saved!"
                });

            }).catch(error => errorHandler(error, response));

        })
    );

    app.put("/machine-shop/:id", checkSchema(machineShopModel), 
        (request, response) => validateRequest(request, response, () => {

            service.update(request.params.id, request.body).then(() => {

                response.json({
                    response : "Machine shop updated!"
                });

            }).catch(error => errorHandler(error, response));

        })
    );

    app.delete("/machine-shop/:id", (request, response) => {

        service.delete(request.params.id).then(() => {

            response.json({
                response : "Machine shop deleted!"
            });

        }).catch(error => errorHandler(error, response));

    });

    

    app.post("/machine-shop/crawl", checkSchema(crawlingModel), 
        (request, response) => validateRequest(request, response, () => {

            service.crawl(request.body).then((googleApiResult) => {

                response.json(googleApiResult);

            }).catch(error => errorHandler(error, response));

        })
    );
    
    app.post("/machine-shop/search", checkSchema(searchModel), 
        (request, response) => validateRequest(request, response, () => {
        
            service.search(request.body).then(resultList => {

                response.json(resultList);

            }).catch(error => errorHandler(error, response));

        })
    );
}