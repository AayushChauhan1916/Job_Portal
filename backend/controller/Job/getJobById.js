import Job from "../../models/Job.js";

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company").populate("application");
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default getJobById;
