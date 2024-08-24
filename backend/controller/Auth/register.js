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

     const url = `
Dear ${user.fullName},

Thank you for signing up with Job Genie! We’re excited to have you on board.

To complete your registration, please verify your email address by clicking the link below:

${verificationUrl}

Please note: This verification link will expire in 15 minutes.

If you did not create this account, please ignore this email.

Best regards,
The Job Genie Team

---

Need Help?
For any queries, feel free to reach out:

Email: aayushchauhan1916@gmail.com
LinkedIn: https://www.linkedin.com/in/aayush-chauhan1916/
`;

     
     

    const isSuccess = await sendEmail(
      user.email,
      "Job Genie - Email Verification",
      url
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
        "A verification link send to your mail please verify before login",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default register;
