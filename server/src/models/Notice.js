import mongoose from "mongoose";

/*
employeeId: data.employeeId,
      employeeName: data.employeeName,
      title: data.noticeTitle,
      noticeBody: data.noticeBody,
      noticeType: data.noticeTypes.join(", "),
      noticeTitle: data.noticeTitle,
      position: data.position,
      targetType: data.targetType,
      publishedOn: new Date(),
      status: "Published",
*/

const noticeSchema = new mongoose.Schema({
  employeeId: String,
  employeeName: String,
  title: String,
  noticeBody: String,
  noticeType: String,
  noticeTitle: String,
  position: String,
  targetType: String,
  publishedOn: Date,
  status: String,
});


const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;