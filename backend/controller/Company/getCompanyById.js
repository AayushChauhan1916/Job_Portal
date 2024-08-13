import Company from "../../models/company.js";

const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }

        return res.status(200).json({
            success:true,
            company:company
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message||error
        })
    }
}

export default getCompanyById;