import Company from "../../models/company.js";
import Job from "../../models/Job.js";


const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      companyId,
    } = req.body;

    console.log(req.body)
    const userId = req._id;
    

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experienceLevel ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newJob = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLevel,
      company:companyId,
      createdby: userId,
    });

    const job = await newJob.save();

    res.status(200).json({
        success: true,
        message: "Job created successfully",
        job:job
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default postJob;
