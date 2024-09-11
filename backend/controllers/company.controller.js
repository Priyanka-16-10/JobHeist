import {CompUser} from "../models/company.model.js";

export const regCompany = async (req, res) => {
    try {
        const {compName} = req.body;
        if(!compName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await CompUser.findOne({name: compName});
        if(company){
            return res.status(400).json({
                message: "You can't register with same company",
                success: false
            });
        }

        company = await CompUser.create({
            name: compName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error); 
    }
}

export const  getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in user id
        const companies = await CompUser.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; //logged in user id
        const company = await CompUser.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        // cloudinary
        const updateData = {name, description, website, location};
        const company = await CompUser.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company information updated",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}