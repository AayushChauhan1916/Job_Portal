import Application from "../../models/application.js";
import Job from "../../models/Job.js";

const applyJob = async (req, res) => {
  try {
    const userId = req._id;
    const jobId = req.params.id;
   

    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "Job Id is Required",
      });
    }

    const isAlreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });


    if (isAlreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // check is job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }

    const newApplication = new Application({job:jobId,applicant:userId});

    const application = await newApplication.save();

    // push application in job application section
    job.application.push(application);

    await job.save();


    return res.status(200).json({
        success: true,
        message: "job applied successfully",
        application
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default applyJob;
