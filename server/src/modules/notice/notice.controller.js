import Notice from "../../models/Notice.js";

const noticeCreate = async(req, res) => {
    
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }else{
        try{
            const notice = await Notice(req.body);
            notice.save();
            res.status(201).send({
                success: true,
                message: "Notice created successfully",
                data: notice
            });
        }catch(error){
            res.status(500).send({
                success: false,
                message: error.message
            });
        }
    }
};

const getAllNotice = async(req, res) => {

    console.log("name")
    try{
        const notices = await Notice.find();
        res.status(200).send({
            success: true,
            message: "Notices fetched successfully",
            data: notices
        });

    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getNoticeById = async (req, res) => {
    try{
        const notice = await Notice.findById(req.params.id);
        res.status(200).send({
            success: true,
            data: notice
        });

    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const updateNotice = async (req, res) => {
    try{
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({
            success: true,
            message: "Notice updated successfully",
            data: notice
        });

    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const noticeController = {
    noticeCreate,
    getAllNotice,
    getNoticeById,
    updateNotice
}