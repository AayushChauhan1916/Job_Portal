import Application from "../../models/application.js";
import Job from "../../models/Job.js";

// for admin
const updateStatus = async (req, res) => {
  try {
    const {status} = req.body;
    const applicationId = req.params.id;

    if(!status){
        return res.status(400).json({
            success:false,
            message:"status required"
        })
    }

    const application = await Application.findById(applicationId);

    if(!application){
        return res.status(404).json({
            success:false,
            message:"application not found"
        })
    }

    // update status;

    application.status = status.toLowerCase();

    await application.save();

    return res.status(200).json({
      success: true,
      message:"status updates successfully",
      application,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default updateStatus;
