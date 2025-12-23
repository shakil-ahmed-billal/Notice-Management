'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft, Upload, X, FileText, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateNotice() {
  const router = useRouter();
  const [showNoticeTypes, setShowNoticeTypes] = useState(false);
  const [selectedNoticeTypes, setSelectedNoticeTypes] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    'Policy_Document.pdf'
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const noticeTypes = [
    'Warning / Disciplinary',
    'Performance Improvement',
    'Appreciation / Recognition',
    'Attendance / Leave Issue',
    'Payroll / Compensation',
    'Contract / Role Update',
    'Advisory / Personal Reminder',
  ];

  const handlePublish = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-6">
        <Link href="/notice-board">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Create a Notice
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Please fill in the details below</h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              <span className="text-red-500">*</span> Target Department(s) or
              Individual
            </label>
            <Select defaultValue="individual">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="all">All Departments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <Input placeholder="Write the Title of Notice" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Select Employee ID
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp1">EMP001</SelectItem>
                  <SelectItem value="emp2">EMP002</SelectItem>
                  <SelectItem value="emp3">EMP003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Employee Name
              </label>
              <Input placeholder="Enter employee full name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Position
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <Select
                open={showNoticeTypes}
                onOpenChange={setShowNoticeTypes}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Notice Type" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 space-y-2">
                    {noticeTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedNoticeTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedNoticeTypes([
                                ...selectedNoticeTypes,
                                type,
                              ]);
                            } else {
                              setSelectedNoticeTypes(
                                selectedNoticeTypes.filter((t) => t !== type)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={type}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Publish Date
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Publishing Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Notice Body
            </label>
            <Textarea
              placeholder="Write the details about notice"
              className="min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">
              Upload Attachments (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-3">
                  <Upload className="w-6 h-6 text-teal-600" />
                </div>
                <p className="text-sm text-gray-600">
                  <span className="text-teal-600 font-medium">Upload</span>{' '}
                  nominee profile image or drag and drop.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Accepted File Type: jpg, png
                </p>
              </div>
            </div>

            {uploadedFile && (
              <div className="mt-3 flex items-center gap-2 bg-gray-50 p-3 rounded-lg w-fit">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{uploadedFile}</span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="outline" className="border-blue-500 text-blue-500">
            Save as Draft
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handlePublish}
          >
            <Check className="w-4 h-4 mr-2" />
            Publish Notice
          </Button>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-xl font-semibold mb-2">
              Notice Published Successfully
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              The notice has been successfully published to the Payroll -
              Receivable - 2025 Notice board and is now visible to all selected
              departments.
            </DialogDescription>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowSuccessModal(false)}
              >
                View Notice
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500"
              >
                Create Another
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => router.push('/notice-board')}
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
