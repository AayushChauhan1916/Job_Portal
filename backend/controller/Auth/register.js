import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import Token from "../../models/token.js";
import crypto from "crypto";
import sendEmail from "../../helpers/sendEmail.js";

const register = async (req, res) => {
  try {
    const { fullName, email, password, role, phoneNumber, profile } = req.body;

    if (!fullName || !email || !password || !role || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    const isAlreadyUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (isAlreadyUser) {
      return res.status(409).json({
        success: false,
        message: "User already exits with given credentials",
      });
    }

    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      role: role,
      phoneNumber: phoneNumber,
      email: email,
      password: hashPassword,
    });

    if (profile) {
      newUser.profile.profilePhoto.url = profile.url;
      newUser.profile.profilePhoto.public_id = profile.public_id;
    }

    const user = await newUser.save();

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
        success: true,
        message: "User register Successfully",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Email sent— please verify your account.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default register;
