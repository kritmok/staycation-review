//set up server and database
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//require plugin for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//require session and flash
const session = require("express-session");
const flash = require("connect-flash");

//install patch and put method for html form
const methodOverride = require("method-override");

//parse the data
app.use(express.urlencoded({ extended: true }));

//require routes
const userRoutes = require('./routes/users');
const hotelRoutes = require("./routes/hotels");
const reviewRoutes = require("./routes/reviews");

app.use(methodOverride("_method"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://krit:krit@cluster0.inazs.mongodb.net/StaycationreviewDB?retryWrites=true&w=majority");
  console.log("connected to DB");
}

//set up view engine
const ejs = require("ejs");
app.set("view engine", "ejs");

//config session
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// the middleware 
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash('error');
  next();
});


//use routes
app.use('/', userRoutes);
app.use("/hotels", hotelRoutes);
app.use("/hotels/:id/reviews", reviewRoutes);


//setup public
app.use(express.static("public"));

//set up routes for CRUD
app.get("/", (req, res) => {
  res.render("home");
});

//set up port
app.listen(process.env.PORT || 3000, () => {
  console.log("connected to port 3000");
});
