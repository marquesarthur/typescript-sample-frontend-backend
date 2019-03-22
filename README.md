# Reference System

## Prerequisites


1. Typescript
1. Mocha
1. MySQL 5.7 (see docker)
1. Docker
1. Gulp
1. NPM


## Setup

There's probably a better way to do this, but this is the available effort that I've put into the system, so use caution.


### Database

Create a docker container

On mack-os, make sure to run:

```
docker-machine start
docker-machine env
eval $(docker-machine env)
```

### Working localy

Just start the database container

```
docker-compose start database
```

### Test

Import the project into Webstorm and run it there with Mocha


Make sure that `database.ts` has the proper values (on mac the IP of docker is not localhost, you can obtain the correct ip running `docker-machine ip`)

```
cd backend
npm install
npm run build && npm run test
```


### Deploy

Stop any running container

```
docker ps | grep database
```
```
a7acd9a2f6e6        jabc-hr_database    "docker-entrypoint.s…"   ...
```
```
docker stop a7acd9a2f6e6
```

Finally, run the docker compose:

```
docker-compose up
```

On MacOS, the application will be hosted at `192.168.99.100:49160`

You can test it with cUrl

```
curl -X POST \
  http://192.168.99.100:49160/login \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 096d7353-c78b-41f8-a58e-790b6b0c7f98' \
  -H 'cache-control: no-cache' \
  -d '{
	"email": "arthur@email.com",
    "password": "c2VjcmV0"
}'
```

### Bundling the frontend

I copied a simple frontend from [this repo](https://github.com/ericelliott/react-hello) (I will probably write one of my own later) 

We want to generate a bundle of the frontend such that it can be served as a static file in the backend.

First, let us build the frontend:

```
cd frontend
npm install
npm run build
```

Results will be under the `build` folder

Let us copy everything under the build folder to the backend

```
cd ..
cp -R frontend/build backend/src/web
```

How are the static files from the frontend served?

In the backend, any static file is served at `src/app/App.ts`:

```
this.express.use(express.static(path.join(__dirname, '..', 'web')));
```

And then, we define the root endpoint to serve the root file of out bundle:

IMPORTANT: The gulp task that build the project copies both the typescript files and the static files to the `dist` folder.
If you use som other bundler, you may have to to that in some other way.


## TODO:

Create gulp task that does all the bundling:

1. build front end
1. copy build folder to `backend/src/web`
1. run backend build
1. run docker to generate a new image with the entire application


### Good luck, have fun



## References

1. Backend [1](https://mherman.org/blog/developing-a-restful-api-with-node-and-typescript/)
1. Docker [2](https://medium.com/@lvthillo/customize-your-mysql-database-in-docker-723ffd59d8fb)
1. Mysql [3](https://github.com/mysqljs/mysql)
1. Database issues [4](https://stackoverflow.com/questions/51046665/mocha-hangs-after-tests-have-finished)
1. Json Web Token [5](https://jwt.io/introduction/), [6](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)
1. Serving static files [7](https://appdividend.com/2018/11/24/how-to-serve-static-files-in-express/)
1. Building the docker-compose [8](https://github.com/matfin/docker-node-app) [9](https://blog.morizyun.com/javascript/docker-dockerfile-basic-nodejs.html) [10](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

