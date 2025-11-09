import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

/*Sir's Style of Using Middleware ... 

let basicMiddleware = (req, res, next) => {
    console.log('middleware call');
    next();
}

let authenticate = (req, res, next) => {
    if(isLogin){
        next();
    }
    res.send('you need to login')
}

app.use(express.json())  //application-level
app.use(express.urlencoded())  //application-level
app.use(express.text())  //application-level
app.use(morgan('short'));
// event-driven

app.get('/', basicMiddleware, (req, res) => {
    res.send('Hello World!')
})

app.get('/products',authenticate, (req,res)=>{
    res.send(['product1','product2'])
})

app.get('/todos',basicMiddleware,authenticate, (req,res)=>{
    res.send(['todo1','todo2'])
})


app.use('/users', userRoutes)


// to show the form
app.get('/login', (req, res) => {
    res.send('<form method=POST action=/login><input type=text name=username><input type=number name=age><input type=submit></form>')
})

// submitting the form
app.post('/login', (req, res) => {
    console.log(`the form body : `, req.body)
    res.send('data has been recieved by the server')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
*/



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); 
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

app.get("/", (req, res) => {
  res.send("Welcome to Product Management API!");
});

app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


export default app;
