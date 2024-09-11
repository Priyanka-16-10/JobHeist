import { Job } from "../models/job.model.js"
import { CompUser } from "../models/company.model.js";

export const jobPost = async (req, res) => {
    try {
        const {title, description, requirement, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirement || !salary || !location  || !jobType || !experience || !position || !companyId){
            return res.status(404).json({
                message: "Something is missing",
                success: false
            });
        }
        const job = await Job.create({
            title, 
            description, 
            requirement: requirement.split(","), 
            salary: Number(salary), 
            location, 
            jobType, 
            experienceLevel: experience, 
            position, 
            company: companyId,
            createdBy: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);   
    }
}

// for Students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company",
            model: "CompUser"
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// for Students
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log();
    }
}

// jobs have been created by admin
export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy: adminId});
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
} 