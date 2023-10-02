import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  response.status(200).send("<h1>Home</h1>");
});
app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connect DB");
    // Jalankan server express

    app.listen(process.env.PORT || PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
