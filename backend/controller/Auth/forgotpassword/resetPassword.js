import ForgotToken from "../../../models/forgotPasswordToken.js";
import User from "../../../models/user.js";
import bcrypt from "bcryptjs";

const resetPassword = async (req, res) => {
  try {
    const { userId, token, password, confirmPassword } = req.body;

    if (!userId || !token) {
      return res.render("invalid", {
        message:
          "This action is invalid or has expired. Please try again or contact support.",
      });
    }

    if (password != confirmPassword) {
      return res.render("invalid", { message: "confirm password not matched" });
    }

    const isToken = await ForgotToken.findOne({
      userId: userId,
      token: token,
    });

    if (!isToken) {
      return res.render("invalid", {
        message: "invalid token or token expired",
      });
    } else {
      const user = await User.findById(userId);

      if (!user) {
        return res.render("invalid", { message: "invalid action" });
      }

      const salt = await bcrypt.genSalt(15);

      const hashPassword = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(userId, { password: hashPassword });

      await isToken.deleteOne();

      return res.status(200).render("forgotSuccessfully.ejs");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error, please try again later",
    });
  }
};

export default resetPassword;
