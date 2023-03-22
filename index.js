require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
require("./passport")(passport);
const cors = require('cors')

const app = express();
const PORT = process.env.PORT;
app.use(cors())


app.get('/', (req, res, next) => {
    res.send("hello")
})

app.get("/api/user/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

app.get(
  "/api/users/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect("/profile/");
  }
);

app.get("/profile", (req, res) => {
  res.send("Welcome");
});


const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
console.log(process.env.PORT)
mongoose.connect(`${process.env.DATABASE}`, connectionOptions).then(() => {
    console.log('Database Connected Successfully')
})

app.listen((PORT), () => {
    console.log(`application running on ${PORT}`)
})