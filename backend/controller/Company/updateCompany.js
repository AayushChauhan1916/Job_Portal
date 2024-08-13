import Company from "../../models/company.js";

const updateCompany = async (req, res) => {
  try {
    const { companyName, location, website, description, logo } = req.body;
    const companyId = req.params.id;

    const isCompany = await Company.findById(companyId);

    if (!isCompany) {
      return res.status(404).json({
        success: false,
        message: "company with given name not found",
      });
    }

    const updateData = { companyName, location, website, description };
    if (logo) {
      updateData.logo = logo;
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "company updated succesfully",
      company: company,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default updateCompany;
