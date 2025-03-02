import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    
    try{
        const token = req.cookies.authToken || req.header("Authorization")?.split(" ")[1];
        // console.log("Token in Verify Token: "token)

        if(!token) {
            
            return res.status(401).json({ "message": "Unauthorized: No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            
            if(err){
                
                return res.status(403).json({ "message": "Forbidden: Invalid token" });
            }
            req.user = decoded; // Attach user data to request
            next(); // Proceed to the next middleware/controller
        });
    } 
    
    catch(error){

        return res.status(500).json({ "message": "Internal Server Error, Token Verification Failed" });
    }
    
};

export default verifyToken;
