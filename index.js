require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
require("./passport")(passport);
const cors = require('cors')
const {OAuth2Client} = require('google-auth-library');

const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json())


const verify = async (token) => {
    const client = new OAuth2Client(process.env.CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })

    console.log(ticket)
    const payload = ticket.getPayload();
    console.log(payload)
}

app.get('/', (req, res, next) => {
    res.send("hello")
})

app.get("/api/user/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

app.post("/api/google", async (req, res, next) => {
    console.log(req.body)
    await verify(req.body.token)

    res.json({
        status: 'success'
    })
})

app.get(
  "/api/users/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
//     res.redirect("/profile/");
        res.json({
            data: 'success'
        })
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