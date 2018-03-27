let main = require("./util/express")();

const config = main.profile;

main.listen(config.port, () => {
    console.log(`Server environment: ${config.profile}`);
    console.log(`Server port: ${config.port}`);
    console.log(`MongoDB address: ${config.database.host}:${config.database.port}`);
})