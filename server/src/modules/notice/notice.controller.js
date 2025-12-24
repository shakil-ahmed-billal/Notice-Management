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

export const getAllNotice = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { filterDepartment, filterStatus, searchTerm } = req.query;

    let query = {};

    if (filterDepartment && filterDepartment !== "all") {
      query.department = filterDepartment;
    }

    if (filterStatus && filterStatus !== "ALL") {
      query.status = filterStatus;
    }

    if (searchTerm) {
      query.title = { $regex: searchTerm, $options: "i" };
    }

    const totalNotices = await Notice.countDocuments(query);

    const notices = await Notice.find(query)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    // Response
    res.status(200).json({
      success: true,
      message: "Notice list fetched successfully",
      data: notices,
      pagination: {
        totalItems: totalNotices,
        totalPages: Math.ceil(totalNotices / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



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