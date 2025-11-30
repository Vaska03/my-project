import express from "express";
import mongoose from "mongoose";
import routes from './routes.js';
import cors from 'cors';



const app = express();
const port = 4000; 


  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "books-november-2025",
    });
    console.log("Successfully connected to DB!");
  } catch (err) {
    console.error("Cannot connect to DB!");
    console.error(err.message);
  };


 

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use(routes);


app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));
