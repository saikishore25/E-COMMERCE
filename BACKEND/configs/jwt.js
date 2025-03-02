import jwt from "jsonwebtoken";

// console.log(process.env.JWT_SECRET_KEY)


const generateToken = (email) => {
    
    return jwt.sign(
        {email},   // payload
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1h' } 
    );

};

const verifyToken = (token) => {
    
    return jwt.verify(token, process.env.JWT_SECRET);

};

export { generateToken, verifyToken };