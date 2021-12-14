if (process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}




require('dotenv').config();


console.log(process.env.SECRET)
console.log(process.env.API_KEY)



const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require ('express-session');
const flash = require('connect-flash');
const expressError = require('./helpers/expressError');
const methodOverride = require('method-override');
const passport =require('passport');
const LocalStrategy = require ('passport-local');
const User = require('./models/user');
const helmet = require ('helmet')

const mongoSanitize = require ('express-mongo-sanitize');

// const MongoStore = require('connect-mongo').default;
// const MongoStore = require('connect-mongo')

const authRoutes = require ('./routes/auth')
const shoesRoutes = require('./routes/shoes');
const reviewsRoutes = require('./routes/reviews');


// const dbUrl = 'mongodb://localhost:27017/epignosis';

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/epignosis';
// const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

   
const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(mongoSanitize({
    replaceWith:'_'
}))

const secret = process.env.SECRET || 'This should be a better secret!' ;

// const store =  new MongoStore ({
//     url:dbUrl,
//     secret,
//     touchAfter: 24*60*60
// });

// store.on("error", function(e){
//     console.log("SESSION STORE ERROR", e)
// })








const sessionConfig = 

{
    // store,
    name:'Lomsha',
secret,
resave:false,
saveUninitialized:true,
cookie:{
    httpOnly:true,
    // secure:true,
    expires:Date.now()+1000 * 60 * 60 * 24 * 7,
    maxAge:1000 * 60 * 60 * 24 * 7
}
}

app.use(session(sessionConfig)); 
app.use(flash());
app.use(helmet({contentSecurityPolicy: false}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.User =req.user;
  res.locals.success =  req.flash('success');
  res.locals.error =    req.flash('error');
  next();
})



app.use('/', authRoutes);
app.use('/products', shoesRoutes)
app.use('/products/:id/reviews', reviewsRoutes)



app.get('/', (req, res) => {
    res.render('home')
});



app.all('*',(req,res,next)=>{
    next(new expressError('PAGE NOT FOUND!,404'))
})

app.use((err, req, res, next)=>{
const { statusCode = 500, message='Something Went Wrong'} = err;
if(!err.message) err.message = 'Oh No, Something Went Wrong!'
res.status(statusCode).render('error', {err})
 })


 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
}) 




  
  