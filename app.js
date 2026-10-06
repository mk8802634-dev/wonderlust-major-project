// ==========================================
// 1. LOAD ENVIRONMENT VARIABLES
// ==========================================

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


// ==========================================
// 2. IMPORT PACKAGES
// ==========================================

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("@simonsmith/ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./MODELS/user.js");


// ==========================================
// 3. IMPORT ROUTES
// ==========================================

const listingsRouter = require("./Routes/listing.js");
const reviewRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");


// ==========================================
// 4. EXPRESS APP
// ==========================================

const app = express();


// ==========================================
// 5. DATABASE URL
// ==========================================

const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl) {
    console.error("ATLASDB_URL is missing from .env");
    process.exit(1);
}


// ==========================================
// 6. VIEW ENGINE
// ==========================================

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);


// ==========================================
// 7. MIDDLEWARE
// ==========================================

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));


// ==========================================
// 8. SESSION
// ==========================================

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
        httpOnly: true,

        maxAge: 7 * 24 * 60 * 60 * 1000,

        sameSite: "lax",

        secure: process.env.NODE_ENV === "production"
    }
};

app.use(session(sessionOptions));


// ==========================================
// 9. FLASH
// ==========================================

app.use(flash());


// ==========================================
// 10. PASSPORT
// ==========================================

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new LocalStrategy(User.authenticate())
);

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


// ==========================================
// 11. GLOBAL VARIABLES
// ==========================================

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currUser = req.user;

    next();
});


// ==========================================
// 12. HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.redirect("/listings");
});


// ==========================================
// 13. APPLICATION ROUTES
// ==========================================

app.use("/listings", listingsRouter);

app.use("/listings/:id/reviews", reviewRouter);

app.use("/", userRouter);


// ==========================================
// 14. 404 ERROR
// ==========================================

app.all("/*splat", (req, res, next) => {

    next(
        new ExpressError(
            404,
            "Page not found!"
        )
    );

});


// ==========================================
// 15. GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {

    const {
        statusCode = 500,
        message = "Something went wrong!"
    } = err;

    console.error("APPLICATION ERROR:", err);

    res.status(statusCode).render("error.ejs", {
        message
    });

});


// ==========================================
// 16. DATABASE + SERVER
// ==========================================

const PORT = process.env.PORT || 8080;

async function startServer() {

    try {

        await mongoose.connect(dbUrl);

        console.log("Connected to MongoDB Atlas");

        app.listen(PORT, () => {

            console.log(
                `Server is running on port ${PORT}`
            );

        });

    } catch (err) {

        console.error(
            "MongoDB connection failed:"
        );

        console.error(err);

        process.exit(1);
    }
}

startServer();