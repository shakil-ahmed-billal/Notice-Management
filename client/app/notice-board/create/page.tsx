"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import usePostNotice from "@/hooks/usePostNotice";
import { Check, ChevronLeft, FileText, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type NoticeFormData = {
  targetType: string;
  noticeTitle: string;
  employeeId: string;
  employeeName: string;
  position: string;
  noticeTypes: string[];
  publishDate: string;
  noticeBody: string;
};

export default function CreateNotice() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const noticeTypesList = [
    "Warning / Disciplinary",
    "Performance Improvement",
    "Appreciation / Recognition",
    "Attendance / Leave Issue",
    "Payroll / Compensation",
    "Contract / Role Update",
    "Advisory / Personal Reminder",
  ];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NoticeFormData>({
    defaultValues: {
      targetType: "individual",
      noticeTypes: [],
    },
  });

  const selectedNoticeTypes = watch("noticeTypes") || [];

const { mutate: postNotice, isPending } = usePostNotice();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert("Please upload only JPG or PNG files");
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert("Please upload only JPG or PNG files");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = (data: NoticeFormData) => {
    const formattedData = {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      title: data.noticeTitle,
      noticeBody: data.noticeBody,
      noticeType: data.noticeTypes.join(", "),
      position: data.position,
      targetType: data.targetType,
      publishDate: data.publishDate,
      publishedOn: new Date().toISOString(),
      status: "Published",
      attachment: uploadedFile ? uploadedFile.name : null,
    };

    console.log("FINAL DATA 👉", formattedData);

    postNotice(formattedData, {
    onSuccess: (response) => {
     console.log("POSTED DATA 👉", response);
    setShowSuccessModal(true);
    },
    onError: (error) => {
     console.error("POST ERROR 👉", error);
    alert("Failed to publish notice. Please try again.");
    },
});
  };

  return (
    <div className="flex-1 p-6 lg:p-8 bg-gray-50 min-h-screen" data-slot="main-content">
      <div className="mb-6">
        <Link href="/notice-board">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Create a Notice
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b bg-gray-50">
          <h2 className="text-lg font-medium">
            Please fill in the details below
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Target Department or Individual */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Target Department(s) or
                Individual
              </label>
              <Controller
                control={control}
                name="targetType"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="all">All Departments</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Notice Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Notice Title
              </label>
              <Input
                placeholder="Write the Title of Notice"
                className="w-full"
                {...register("noticeTitle", {
                  required: "Notice title is required",
                })}
              />
            </div>

            {/* Employee Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Select Employee ID
                </label>
                <Controller
                  control={control}
                  name="employeeId"
                  rules={{ required: "Employee ID is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select employee designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">EMP001</SelectItem>
                        <SelectItem value="EMP002">EMP002</SelectItem>
                        <SelectItem value="EMP003">EMP003</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Employee Name
                </label>
                <Input
                  placeholder="Enter employee full name"
                  className="w-full"
                  {...register("employeeName", {
                    required: "Employee name is required",
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Position
                </label>
                <Controller
                  control={control}
                  name="position"
                  rules={{ required: "Position is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select employee department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Notice Type and Publish Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Notice Type
                </label>
                <div className="border rounded-md p-3 bg-white space-y-2 max-h-[250px] overflow-y-auto">
                  {noticeTypesList.map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2 py-1"
                    >
                      <Checkbox
                        id={`notice-${type}`}
                        checked={selectedNoticeTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setValue("noticeTypes", [...selectedNoticeTypes, type]);
                          } else {
                            setValue("noticeTypes", selectedNoticeTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <label
                        htmlFor={`notice-${type}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedNoticeTypes.length > 0 && (
                  <div className="mt-2 text-xs text-teal-600 font-medium">
                    ✓ {selectedNoticeTypes.length} type(s) selected
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Publish Date
                </label>
                <Controller
                  control={control}
                  name="publishDate"
                  rules={{ required: "Publish date is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Publishing Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="custom">Custom Date</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Notice Body */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Notice Body
              </label>
              <Textarea
                placeholder="Write the details about notice"
                className="min-h-[180px] w-full resize-none"
                {...register("noticeBody")}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-4">
                Upload Attachments (optional)
              </label>
              <div
                className="border-2 border-dashed border-teal-300 rounded-lg p-12 cursor-pointer hover:border-teal-500 transition-colors bg-teal-50"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-3">
                    <Upload className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="text-teal-600 font-medium">Upload</span>{" "}
                    nominee profile image or drag and drop.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted File Type: jpg, png
                  </p>
                </div>
              </div>

              {uploadedFile && (
                <div className="mt-4 flex items-center gap-2 p-3 rounded-lg border bg-white">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700 flex-1">
                    {uploadedFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-6 mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              <Check className="w-4 h-4 mr-2" />
              {isPending ? "Publishing..." : "Publish Notice"}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-lg">
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <DialogTitle className="text-2xl font-semibold mb-3">
              Notice Published Successfully
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base max-w-md">
              Your notice "Holiday Schedule – November 2025" has been published
              and is now visible to all selected departments.
            </DialogDescription>
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setShowSuccessModal(false)}
              >
                View Notice
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.reload();
                }}
              >
                + Create Another
              </Button>
              <Button
                className="bg-black hover:bg-gray-800 text-white"
                onClick={() => router.push("/notice-board")}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}