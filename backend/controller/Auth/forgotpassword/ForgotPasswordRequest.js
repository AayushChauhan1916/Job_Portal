import crypto from "crypto"; // Ensure you have this import
import sendEmail from "../../../helpers/sendEmail.js";
import ForgotToken from "../../../models/forgotPasswordToken.js";
import User from "../../../models/user.js";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Generate a password reset token
    const isToken = await ForgotToken.findOne({ userId: user._id });
    if (isToken) {
      return res.status(200).json({
        success: true,
        message: "Password reset link already sent  to your email",
      });
    } else {
      const passwordToken = await new ForgotToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const resetUrl = `https://job-portal-eight-jade.vercel.app/api/user/${user._id}/forgotpassword/${passwordToken.token}`;

      // Construct the email content
      const emailContent = `
    Dear ${user.fullName},
    
    Thank you for reaching out to Job Genie!
    
    We received a request to reset your password. Please use the link below to create a new password:
    
    ${resetUrl}
    
    This link will expire in 15 minutes. If you did not request a password reset, please ignore this email.
    
    If you encounter any issues, feel free to contact us.
    
    Best regards,
    The Job Genie Team
    
    ---
    
    Need Help?
    For any queries, feel free to reach out:
    
    Email: aayushchauhan1916@gmail.com
    LinkedIn: https://www.linkedin.com/in/aayush-chauhan1916/
    `;

      // Send the email
      const isSuccess = await sendEmail(
        user.email,
        "Forgot Password - Job Genie",
        emailContent
      );

      if (!isSuccess) {
        await passwordToken.deleteOne();
        return res.status(500).json({
          success: false,
          message: "Something went wrong, try again later",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Password reset link sent successfully to your email",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred",
    });
  }
};

export default forgotPassword;
