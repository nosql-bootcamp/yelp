# Yelp dataset

From https://www.kaggle.com/yelp-dataset/yelp-dataset

## Load the data

You should download the yelp dataset from kaggle and put the files in the data/ folder.
Then run the loaders from the loaders/ folder.


## Launching the project

To start frontend & backend separately (dev mode), run `gradlew run` in the backend folder and `yarn start` in the frontend folder. The frontend is available at `localhost:3000` and the backend at `localhost:8000`.

To ship the frontend in the backend (production), run `yarn build` in the frontend folder. Then run `gradlew run` in the backend folder : the application should be deployed on `localhost:8000`.
