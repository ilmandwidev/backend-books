import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";
import mustache from "mustache-express";

const app = express();

// SETUP
app.engine("mustache", mustache());
app.set("view engine", "mustache");
// Middleware for parsing request body
app.use(express.json());

app.use(cors());

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("index");
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
