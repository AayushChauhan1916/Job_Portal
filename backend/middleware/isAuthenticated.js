import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
           return res.status(401).json({
                success:false,
                message:"user not authenticated"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET);

        if(!decode){
           return res.status(401).json({
                success:false,
                message:"Session Expired"
            })
        }

        req._id = decode._id;
        next();
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message||error
        })
    }
}

export default isAuthenticated;