const fs = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' })

// Convert image to base64 string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return bitmap.toString('base64');
}

//GENERATE JWT WITH SPECIFIED ID
function generateJWT(id) {
    return jwt.sign(id, process.env.SECRET, {expiresIn: '900s'})
}
//CHECKING IF A JWT IS VALID
function checkToken(req,res, next) {
    if (typeof req.cookies.JWT !== 'undefined') {
        const token = req.cookies.JWT
        //OTHERWISE, CHECK IF THE TOKEN IS VALID
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            //IF JWT IS NOT VALID, RETURN 403
            if (err) return res.sendStatus(403)
            //OTHERWISE CALL next() TO INDICATE APP TO CONTINUE
            res.cookie('user', decoded.username)
        })
    }
    next()
}


module.exports = { base64_encode, generateJWT, checkToken}