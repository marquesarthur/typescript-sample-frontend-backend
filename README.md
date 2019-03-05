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

Go to the docker config folder and run

```
cd docker-config
docker build -t jabc-mysql .
```

**IMPORTANT** if there are errors in your SQL scripts, the image will fail

Once the docker image has been built, you have to start it. I'm running the command below in non daemon mode because I want to see possible errors

```
docker run -p 3306:3306 --name jabc-mysql -e MYSQL_ROOT_PASSWORD=supersecret jabc-mysql

```

**IMPORTANT** If you have problems, just list the containers running


```
docker ps --all
```

Which will output something like:

```
CONTAINER ID        IMAGE                                     COMMAND                  CREATED             STATUS                      PORTS                               NAMES
63510e083689        jabc-mysql                                "docker-entrypoint.s…"   4 hours ago         Up 4 hours                  0.0.0.0:3306->3306/tcp, 33060/tcp   jabc-mysql
51b42d1623f2        msarthur/semafor-rest:latest              "python semviz/web_a…"   3 months ago        Up 13 seconds                                                   semafor-rest
```

And then, you stop and delete the jabc-mysql container:

```
docker stop 63510e083689
docker rm 63510e083689
```

### Project

Build the project with:

```
npm run build
```

### Test

Import the project into Webstorm and run it there with Mocha

Make sure to build before running

Make sure that `database.ts` has the proper values (on mac the IP of docker is not localhost, you can obtain the correct ip running `docker-machine ip`)


Select the test of preference, and run/debug it using **mocha**


### Good luck, have fun





