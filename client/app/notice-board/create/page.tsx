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
import { Check, ChevronLeft, FileText, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [showNoticeTypes, setShowNoticeTypes] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    "Policy_Document.pdf"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      noticeTypes: [],
    },
  });

  const selectedNoticeTypes = watch("noticeTypes");

  const onSubmit = (data: NoticeFormData) => {
    const formattedData = {
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
    };

    console.log(formattedData);
  };

  return (
    <div className="flex-1 p-6 lg:p-8">
      <Link href="/notice-board">
        <Button variant="ghost" className="mb-4 -ml-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Create a Notice
        </Button>
      </Link>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">
            Please fill in the details below
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            {/* Target Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Target Department(s)
              </label>
              <Controller
                control={control}
                name="targetType"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
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
                {...register("noticeTitle", { required: true })}
              />
            </div>

            {/* Employee Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                control={control}
                name="employeeId"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Employee ID" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMP001">EMP001</SelectItem>
                      <SelectItem value="EMP002">EMP002</SelectItem>
                      <SelectItem value="EMP003">EMP003</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <Input
                placeholder="Employee full name"
                {...register("employeeName", { required: true })}
              />

              <Controller
                control={control}
                name="position"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Notice Type (Multi Checkbox) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <div className="border rounded-md p-3 space-y-2">
                {noticeTypesList.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedNoticeTypes?.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setValue("noticeTypes", [
                            ...(selectedNoticeTypes || []),
                            type,
                          ]);
                        } else {
                          setValue(
                            "noticeTypes",
                            selectedNoticeTypes.filter((t) => t !== type)
                          );
                        }
                      }}
                    />
                    <span className="text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publish Date */}
            <Controller
              control={control}
              name="publishDate"
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Publish Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Notice Body */}
            <Textarea
              placeholder="Write the notice details"
              {...register("noticeBody")}
            />

            {/* Attachment */}
            {uploadedFile && (
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg w-fit">
                <FileText className="w-4 h-4" />
                <span>{uploadedFile}</span>
                <button onClick={() => setUploadedFile(null)}>
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              <Check className="w-4 h-4 mr-2" />
              Publish Notice
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogTitle>Notice Published Successfully</DialogTitle>
          <DialogDescription>
            Your notice has been published successfully.
          </DialogDescription>
          <Button className="mt-4" onClick={() => router.push("/notice-board")}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
