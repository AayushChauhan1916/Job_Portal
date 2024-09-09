import Token from "../models/token.js";
import User from "../models/user.js";

const verifyEmail = async (req, res) => {
    try {
        const { id, token } = req.params;

        // Use findOne instead of find, since find returns an array.
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid link",
            });
        }

        const verifyToken = await Token.findOne({
            userId: id,
            token: token,
        });

        if (!verifyToken) {
            return res.render("invalid.ejs",{message:"link expired"})
        }

        // Update the user's verified status.
        await User.findByIdAndUpdate(id, { verified: true });

        // Delete the token document.
        await verifyToken.deleteOne();

        return res.status(200).render("verified.ejs");
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export default verifyEmail;
