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
        <p>Thank you for reaching out to Job Genie!</p>
        <p>We received a request to reset your password. Please use the link below to create a new password:</p>
        <p><a href="${resetUrl}" class="button">Reset Your Password</a></p>
        <p>This link will expire in 15 minutes. If you did not request a password reset, please ignore this email.</p>
        <p>If you encounter any issues, feel free to contact us.</p>
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
