const User = require('../models/User')
const bcrypt = require('bcrypt')
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
        
        const userExists = await User.findOne({email:email})
        if(userExists){
            res.status(422).json({
                message:'This email aready exists!'
            })
            return
        }
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt)
        
        const user = new User({
            name,
            email,
            password:passwordHash
        })
        
        try {
            const newUser = await user.save()
            res.status(201).json({
                message:'usuário cadastrado com sucesso!',
                newUser
            })
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

module.exports=userController