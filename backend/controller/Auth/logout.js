const logout = async (req, res) => {
  try {
    res
      .cookie("token", null, {
        maxAge: 0,
      })
      .status(200)
      .json({
        success: true,
        logout: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default logout;
