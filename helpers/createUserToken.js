const jwt = require('jsonwebtoken')

const createUserToken = async (user,req,res)=>{
    const secret = 'fortalezaesporteclube'
    const token = jwt.sign({
        name:user.name,
        id:user._id
    }, secret)

    res.status(200).json({
        message:'A new token has created.',
        token:token,
        userId:user._id
    })
}

module.exports = createUserToken