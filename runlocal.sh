docker run -d -p 5000:5000 --name registry registry:latest

# Build the containers
cd app
docker build -t consuela-frontend .
cd ..

cd couchdb
docker build -t consuela-db .
cd ..

cd update_db
docker build -t consuela-updatedb .
cd ..

docker image tag consuela-frontend:latest localhost:5000/consuela-frontend
docker image tag consuela-db:latest localhost:5000/consuela-db
docker image tag consuela-updatedb:latest localhost:5000/consuela-updatedb

docker push localhost:5000/consuela-frontend
docker push localhost:5000/consuela-db
docker push localhost:5000/consuela-updatedb

cd manifests
kubectl apply -f consuela-db.yml
kubectl apply -f consuela-frontend.yml
kubectl apply -f consuela-updatedb.yml
