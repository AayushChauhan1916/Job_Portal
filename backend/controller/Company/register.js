import Company from "../../models/company.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, location, website, description } = req.body;
    console.log(req.body);

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "companyName is required",
      });
    }

    const isCompany = await Company.findOne({ companyName: companyName });

    if (isCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const newCompany = new Company({
      companyName: companyName,
      location: location,
      description: description,
      website: website,
      createdBy: req._id,
    });

    const company = await newCompany.save();

    res.status(200).json({
      success: true,
      message: `${companyName} registered successfully`,
      company: company,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export default registerCompany;
