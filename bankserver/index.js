// import express
 const express =require('express')

//  import cors
const cors =require('cors')

//  create a serve app using express
const app=express()

// import jsonwebtoken
const jwt=require('jsonwebtoken')


// to define origin using cors
app.use(cors({
    origin:'http://localhost:4200'
}))

// set up an port number to server app
app.listen(3000,()=>{
    console.log('server started ');
})

// to create Application middleware
const appMiddleware = (req,res,next)=>{
    console.log("Application Specific Middleware");
    next()
}

// to use in entire application
app.use(appMiddleware)


// import dataservices
const dataservices=require('./services/dataservices')

// to change into json format
app.use(express.json())

// banking Request Resolving

// jwt token verication middleware
    const jwtMiddleware =(req,res,next)=>{
        console.log("routing Specific Middleware");
    // 1.get token from header in access-token
    const token =req.headers['access-token']
    // 2.verify token using verify method in jsonwebtoken
    try
    {
        const data = jwt.verify(token,"skey123")
        console.log(data);
        // assigning login user acno to currentacno in req
        req.currentAcno=data.currentAcno
        next()
    } 
    catch
    {
        res.status(422).json({
            status:false,
            message:'please login'
        })
    }
}

//1.  to resolve login request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservices.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// to resolve register request
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataservices.register(req.body.acno,req.body.pswd,req.body.uname)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// to resolve deposite request
app.post('/deposite',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.deposite(req,req.body.acno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// to resolve withdrawel request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.withdraw(req,req.body.acno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// transaction Api -resolve-router specification middleware
app.get('/transaction/:acno',jwtMiddleware,(req,res)=>{
    console.log(req.params);
    dataservices.transaction(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// Delete acno Api
app.delete("/deleteacno/:acno",jwtMiddleware,(req,res)=>{
    dataservices.deleteAcno(req.acno).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

