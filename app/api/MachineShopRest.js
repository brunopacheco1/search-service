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

    let validateRequest = request => {

        request.assert("name", "Name is a mandatory field.").notEmpty();

        let errors = request.validationErrors();

        if(errors) {
            let messages = errors.map(error => error.msg);

            return {
                status : 400,
                message : messages
            };
        }

    };

    let service = app.services.MachineShopService(app);
    
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

    app.post("/machine-shop", (request, response) => {

        let validation = validateRequest(request);

        if(validation) {

            response.status(validation.status).json({
                error : validation.message
            });

            return;
        }

        service.save(request.body).then(() => {

            response.json({
                response : "Machine shop saved!"
            });

        }).catch(error => errorHandler(error, response));

    });

    app.put("/machine-shop/:id", (request, response) => {

        let validation = validateRequest(request);

        if(validation) {

            response.status(validation.status).json({
                error : validation.message
            });

            return;
        }

        service.update(request.params.id, request.body).then(() => {

            response.json({
                response : "Machine shop updated!"
            });

        }).catch(error => errorHandler(error, response));

    });

    app.delete("/machine-shop/:id", (request, response) => {

        service.delete(request.params.id).then(() => {

            response.json({
                response : "Machine shop deleted!"
            });

        }).catch(error => errorHandler(error, response));

    });

    

    app.post("/machine-shop/crawl", (request, response) => {

        service.crawl(request.body).then((googleApiResult) => {

            response.json(googleApiResult);

        }).catch(error => errorHandler(error, response));

    });
    
    app.post("/machine-shop/nearby", (request, response) => {

        service.geoQuery(request.body).then(resultList => {

            response.json(resultList);

        }).catch(error => errorHandler(error, response));

    });
}