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

        const verificationUrl = `
        https://job-portal-eight-jade.vercel.app/api/user/verification/${user._id}/${emailToken.token}`;

        const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 10px;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007BFF;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
        .footer a {
            color: #007BFF;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello ${user.fullName},</h2>
        <p>Thank you for signing up with Job Genie! We’re excited to have you on board.</p>
        <p>To complete your registration, please verify your email address by clicking the link below:</p>
        <p><a href="${verificationUrl}" class="button">Verify Your Email</a></p>
        <p>Please note: This verification link will expire in 15 minutes.</p>
        <p>If you did not create this account, please ignore this email.</p>
        <p>Best regards,<br>The Job Genie Team</p>
        <div class="footer">
            <p>Need Help? For any queries, feel free to reach out:</p>
            <p>Email: <a href="mailto:aayushchauhan1916@gmail.com">aayushchauhan1916@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/aayush-chauhan1916/">https://www.linkedin.com/in/aayush-chauhan1916/</a></p>
        </div>
    </div>
</body>
</html>
`;


        
        

        const isSuccess = await sendEmail(
          user.email,
          "Job Genie - Email Verification",
          emailContent 
        );
        if (!isSuccess) {
          await emailToken.deleteOne();
          return res.status(500).json({
            success: false,
            message: "something went wrong, try again later",
          });
        }
      }
      return res.status(200).json({
        success: false,
        isSend: true,
        message: "Please verify your email via the link.",
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
