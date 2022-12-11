const express = require ('express');    // Backend
const mongoose = require ('mongoose');  // DB
const bodyParser = require('body-parser');  // Access
const dotenv = require("dotenv");   // Environmental File
const cors = require('cors');   // Connection btw Front & Backend
const app = express();  // Backend
const cookieSession = require('cookie-session');    // Cookies & Session
const passport = require('passport');
const authRoute = require('./Controller/auth');
const passportSetup = require("./Controller/passport");

app.use(cookieSession({ name:"session", keys:["edureka"], maxAge:24*60*60*1000}));

const routes = require ('./Routes/index');
const paymentRoutes = require("./Controller/payment");

dotenv.config();

const port = process.env.PORT || 5600;
const hostname = 'localhost';
const dbUrl = 'mongodb://127.0.0.1:27017/zomato';
const atlasDbUrl = 'mongodb+srv://shailendra:HdcWIDNIxNxIkC82@cluster0.uo0vhft.mongodb.net/zomato?retryWrites=true&w=majority'


const corsOptions ={
    origin:'http://localhost:4000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use ('/', routes);
app.use ("/api/payment/", paymentRoutes);
app.use("/auth", authRoute);

mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

.then( res => {
    app.listen(port, hostname, () => {
        console.log(`Server is running at ${hostname}:${port}`)
    });
})
.catch(err => console.log(err));