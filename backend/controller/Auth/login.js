import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../../models/token.js";
import crypto from "crypto";
import sendEmail from "../../helpers/sendEmail.js";

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        success: false,
        message: "Role does not matched",
      });
    }

    if (!user.verified) {
      const token = await Token.findOne({ userId: user._id });
      if (!token) {
        const emailToken = await new Token({
          userId: user?._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `https://job-portal-eight-jade.vercel.app/api/user/verification/${user._id}/${emailToken.token}`;

        const isSuccess = await sendEmail(user.email,"Job Genie - Email Verification", url);
        if(!isSuccess){
          await emailToken.deleteOne();
          return res.status(500).json({
            success:false,
            message: "something went wrong, try again later",
          });
        }
      }
      return res.status(200).json({
        success: false,
        isSend:true,
        message: "A verification mail send to your mail",
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const userData = await User.findOne({ email: email }).select("-password");

    res
      .cookie("token", token, cookieOption)
      .status(200)
      .json({
        success: true,
        token: token,
        user: userData,
        message: `welcome back, ${user.fullName}`,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default login;
