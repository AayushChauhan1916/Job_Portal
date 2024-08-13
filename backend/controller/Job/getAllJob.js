import Job from "../../models/Job.js";

const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = new RegExp(keyword, "i");

    const jobs = await Job.find({
      $or: [{ title: query }, { description: query }],
    }).populate({path:"company"}).sort({createdAt:-1});

    

    if (!jobs) {
      return res.status(404).json({
        success: true,
        message: "jobs not found",
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default getAllJob;
