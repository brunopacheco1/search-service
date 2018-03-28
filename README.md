# search-service
POC for a search service.

## Installing Node modules
npm install

## Testing
npm test

### Running the API
npm start

## Running Mongo DB
docker run -p 27017:27017 --rm --name mongo -d mongo

## Build docker
docker build -t brunopacheco1/search-service .

## Run Stack
docker-compose -f stack.yml up