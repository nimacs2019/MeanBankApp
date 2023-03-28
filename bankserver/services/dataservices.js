// import db
const db= require('./db')

// import jsonwebtoken
const jwt=require('jsonwebtoken')

// login definition
const login=(acno,pswd)=>{
    return db.User.findOne({
        acno,
        pswd
    }).then((result)=>{
        console.log(result);
        if(result)
        {
            // generate code
            const token = jwt.sign({
                currentAcno:acno
            },"skey123")
            
            return{
                message:'login successfull',
                ststus:true,
                statusCode:200,
                uname:result.uname,
                token,
                currentAcno:acno

            }

        }
        else
        {
            return{
                message:'invalid',
                ststus:false,
                statusCode:404
            }
        }
    })
}

const register=(acno,pswd,uname)=>{
    // 1.search acno in db if yes
    return db.User.findOne({
        acno
    }).then((result)=>{
    // 2. if yes response already exist
    if(result)
    {
        return{
            message:'Already exist',
            ststus:false,
            statusCode:404
        }
    }
        // 3. to store new user details
    else
    {
        let newUser=new db.User({
            acno,
            pswd,
            balance:0,
            uname,
            transaction:[]
        
        })
        newUser.save()
        return{
            message:'Registered Successfully',
            ststus:true,
            statusCode:200
        }
    }
    })
}

// deposite definition
const deposite=(req,acno,pswd,amount)=>{
    var amt =Number(amount)
    return db.User.findOne({
        acno,
        pswd
    }).then((result)=>{
        if(acno!=req.currentAcno)
        {
            return{
                message:"Permission denied",
                ststus:false,
                statusCode:404
            }
        }
        console.log(result);
        if(result)
        {
            result.balance += amt
            result.transaction.push({
                amount,
                type:'credit'
            })
            result.save()
            return{
                message:`${amt} deposited successfully and new balance is ${result.balance}`,
                ststus:true,
                statusCode:200
            }

        }
        else
        {
            return{
                message:'invalid account number or password',
                ststus:false,
                statusCode:404
            }
        }
    })
}

// withdrawel definition
const withdraw=(req,acno,pswd,amount)=>{
    var amt =Number(amount)
    return db.User.findOne({
        acno,
        pswd
    }).then((result)=>{
        if(acno!=req.currentAcno)
        {
            return{
                message:"Permission denied",
                ststus:false,
                statusCode:404
            }
        }
        console.log(result);
        if(result)
        {
            // check sufficient balance
            if(result.balance>amt)
            {
                result.balance -= amt
                result.transaction.pop({
                amount,
                type:'debit'
                })
                result.save()
                return{
                    message:`${amt} withdraw successfully and new balance is ${result.balance}`,
                    ststus:true,
                    statusCode:200
                    }
                } 
            else
            {
            return{
                message:'insufficient amount',
                ststus:false,
                statusCode:404
                }
            }   

        }
        else
        {
            return{
                message:'invalid account number or password',
                ststus:false,
                statusCode:404
            }
        }
    })
}

// transaction history
const transaction=(acno)=>{
    return db.User.findOne({
        acno
    }).then((result)=>{
        if(result)
        {
            return{
                status:true,
                statusCode:200,
                transaction:result.transaction
            }
        }
        else
        {
            return{
                message:'invalid account number or password',
                ststus:false,
                statusCode:404
            }
        }
    })
}


// To delete acno from db
const deleteAcno = (acno)=>{
    return db.User.deleteOne({
        acno
    }).then((result)=>{
        if(result)
        return{
            status:true,
            statusCode:200,
            message:'Deleted Successfully'        
        }

    })
}

// export login,register

module.exports={
    login,
    register,
    deposite,
    withdraw,
    transaction,
    deleteAcno
}