import User from "../../models/user.js";
import bcrypt from "bcryptjs";


const register = async(req,res) => {
    try{
        const {fullName,email,password,role,phoneNumber,profile} = req.body;
        

        if(!fullName || !email || !password || !role || !phoneNumber){
            return res.status(400).json({message: "Please fill all the fields",success:false});
        }

        const isAlreadyUser = await User.findOne({
            "$or":[
                {email:email},
                {phoneNumber:phoneNumber}
            ]
        })

        if(isAlreadyUser){
            return res.status(409).json({
                success:false,
                message:"User already exits with given credentials"
            })
        }

        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({fullName:fullName,role:role,phoneNumber:phoneNumber,email:email,password:hashPassword})

        
        if(profile){
            newUser.profile.profilePhoto.url = profile.url;
            newUser.profile.profilePhoto.public_id = profile.public_id;
        }

        await newUser.save();

        res.status(200).json({
            success:true,
            message:"User Register Successfully"
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message||error
        })
    }
}


export default register;