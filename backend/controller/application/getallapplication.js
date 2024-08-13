import Application from "../../models/application.js";
import Job from "../../models/Job.js";

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req._id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return res.status(404).json({
        success: false,
        message: "No Applications",
      });
    }

    res.status(200).json({
        success: true,
        applications
      });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default getAppliedJobs;
