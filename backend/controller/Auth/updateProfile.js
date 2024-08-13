import User from "../../models/user.js";

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills, resume } = req.body;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req._id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }
    if (resume) {
      user.profile.resume = resume;
      user.profile.resumeOriginalName = `${user.fullName}_resume.pdf`;
    }

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      message: "update Successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default updateProfile;
