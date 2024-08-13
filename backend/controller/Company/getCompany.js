import Company from "../../models/company.js";

const getCompany = async(req,res)=>{
    try {
        const userId = req._id;

        const companies = await Company.find({createdBy:userId});

        if(!companies){
            return  res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"fetched successfully",
            companies:companies
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message||error
        })
    }
}

export default getCompany;