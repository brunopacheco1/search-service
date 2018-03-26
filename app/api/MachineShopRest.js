module.exports = (app) => {
    let errorHandler = (error, response) => {
        console.log(error);

        response.status(500).json({
            error : error.message
        });
    };

    let service = app.services.MachineShopService(app);
    
    app.get("/machine-shop/:id", (request, response) => {
        service.get(request.params.id).then((machineShop) => {
            response.json(machineShop);
        }).catch((error) => errorHandler(error, response));
    });

    app.post("/machine-shop", (request, response) => {
        request.assert("name", "Name is a mandatory field.").notEmpty();

        let errors = request.validationErros();

        if(errors) {
            response.status(400).json({
                errors : errors
            });

            return;
        }

        service.save(request.body).then(() => {
            response.json({
                response : "Machine shop saved!"
            });
        }).catch((error) => errorHandler(error, response));
    });
}