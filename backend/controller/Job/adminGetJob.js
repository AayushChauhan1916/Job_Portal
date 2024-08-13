import Job from "../../models/Job.js";

const adminGetJob = async (req, res) => {
  try {
    const adminId = req._id;

    const jobs = await Job.find({ createdby: adminId }).populate({path:"company"});

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default adminGetJob;
