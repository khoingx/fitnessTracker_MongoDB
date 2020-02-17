const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

var seeder = require('mongoose-seeder'),
    data = require('./seeders/seed');
 
seeder.seed(data).then(function(dbData) {
    // The database objects are stored in dbData
    console.log(dbData);
}).catch(function(err) {
    // handle error
    console.log("error inserting data to db");
});

const PORT = process.env.PORT || 3000;

const User = require("./models/index.js");
const workout = require("./models/workout.js");

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// /api/workouts
// Get last workouts
app.get("/api/workouts", (req,res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Post workouts
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
    .then(({id}) => db.Workout)
});

// /api/workouts/id
// put 

// /api/workouts/range
// get workout in range
app.get("/api/workouts", (req,res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.post("/submit", ({body}, res) => {
//   User.create(body)
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
