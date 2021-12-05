const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

function login(req,res){
    const {name,password} = req.body;
    if(password === process.env.PASSWORD){
        const token = jwt.sign({name},process.env.JWT_SECRETE,{expiresIn:'1d'},)
        return res.json({token,name})
    }else{
        res.status(400).json({
            error : 'Incorrect Password'
        })
    }
}

const requireSignin = expressJWT({
    secret:process.env.JWT_SECRETE,
    algorithms: ['sha1', 'RS256', 'HS256'],
})

module.exports ={ login,requireSignin};