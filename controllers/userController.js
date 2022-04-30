const User = require('../models/User')

class userController {
    static async index (req,res){
        const users = await User.find()
        res.status(200).json(users)
    }
    
    static async store (req,res){
        const { name, email, password, confirmPassword } = req.body
        // validations
        let emptyFelds = []
        if(!name){emptyFelds.push('name')}
        if(!email){emptyFelds.push('email')}
        if(!password){emptyFelds.push('password')}
        if(!confirmPassword){emptyFelds.push('confirmPassword')}
        if(emptyFelds.length!=0){
            
            res.status(422).json({
                message:"those fields can't be empty",
                emptyFelds:emptyFelds
            })
            return
        }
        if(password !=confirmPassword){
            res.status(422).json({
                message:"password and confirmPassword does not match!",
            })
            return
        }

        res.json({
            name:name,
            email:email,
            password:password,
            confirmPassword: confirmPassword
        });
    }
}

module.exports=userController