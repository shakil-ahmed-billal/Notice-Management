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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  Edit,
  MoreVertical,
  Plus,
  FileEdit,
  CalendarIcon,
} from 'lucide-react';
import Link from 'next/link';
import useAllNotice from '@/hooks/getAllNotice';

interface Notice {
  id: string;
  title: string;
  noticeType: string;
  department: string;
  publishedOn: string;
  status: 'Published' | 'Unpublished' | 'Draft';
}


// const allNotice = [
//   {
//     id: 1,
//     title: 'Office closed on Friday for maintenance.',
//     noticeType: 'General / Company-Wide',
//     department: 'All Department',
//     publishedOn: '15-Jun-2025',
//     status: 'Published',
//   },
//   {
//     id: 2,
//     title: 'Eid al-Fitr holiday schedule.',
//     noticeType: 'Holiday & Event',
//     department: 'Finance',
//     publishedOn: '15-Jun-2025',
//     status: 'Published',
//   },
//   {
//     id: 3,
//     title: 'Updated code of conduct policy',
//     noticeType: 'HR & Policy Update',
//     department: 'Sales Team',
//     publishedOn: '15-Jun-2025',
//     status: 'Published',
//   },
//   {
//     id: 4,
//     title: 'Payroll for October will be processed on 28th',
//     noticeType: 'Finance & Payroll',
//     department: 'Web Team',
//     publishedOn: '15-Jun-2025',
//     status: 'Published',
//   },
//   {
//     id: 5,
//     title: 'System update scheduled for 30 Oct (9:00-11:00 PM)',
//     noticeType: 'IT / System Maintenance',
//     department: 'Database Team',
//     publishedOn: '15-Jun-2025',
//     status: 'Published',
//   },
//   {
//     id: 6,
//     title: 'Design team sprint review moved to Tuesday.',
//     noticeType: 'Department / Team',
//     department: 'Admin',
//     publishedOn: '15-Jun-2025',
//     status: 'Published',
//   },
//   {
//     id: 7,
//     title: 'Unauthorized absence recorded on 18 Oct 2025',
//     noticeType: 'Warning / Disciplinary',
//     department: 'Individual',
//     publishedOn: '15-Jun-2025',
//     status: 'Unpublished',
//   },
//   {
//     id: 8,
//     title: 'Office closed today due to severe weather',
//     noticeType: 'Emergency / Urgent',
//     department: 'HR',
//     publishedOn: '15-Jun-2025',
//     status: 'Draft',
//   },
// ];

export default function NoticeBoard() {
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allNotice } = useAllNotice();

console.log("all data",allNotice)
  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      'All Department': 'text-blue-600',
      Finance: 'text-green-600',
      'Sales Team': 'text-orange-600',
      'Web Team': 'text-blue-600',
      'Database Team': 'text-purple-600',
      Admin: 'text-purple-600',
      Individual: 'text-blue-600',
      HR: 'text-red-600',
    };
    return colors[dept] || 'text-gray-600';
  };

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Notice Management
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <FileEdit className="w-4 h-4 mr-2" />
              All Draft Notice
            </Button>
            <Link href="/notice-board/create">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Notice
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="text-green-600 font-medium">
            Active Notices: 8
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-orange-500 font-medium">
            Draft Notice: 04
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-600">Filter by:</span>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Departments or individuals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sales">Sales Team</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Employee Id or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Published on
            </Button>

            <Button
              variant="ghost"
              className="text-orange-500 hover:text-orange-600"
              onClick={() => {
                setFilterDepartment('');
                setFilterStatus('');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Notice Type</TableHead>
              <TableHead className="font-semibold">
                Departments/Individual
              </TableHead>
              <TableHead className="font-semibold">Published On</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allNotice?.map((notice: Notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{notice.title}</TableCell>
                <TableCell className="text-gray-600">
                  {notice.noticeType}
                </TableCell>
                <TableCell>
                  <span className={getDepartmentColor(notice.department)}>
                    {notice.department}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">
                  {notice.publishedOn}
                </TableCell>
                <TableCell>
                  {notice.status === 'Published' && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Published
                    </Badge>
                  )}
                  {notice.status === 'Unpublished' && (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      Unpublished
                    </Badge>
                  )}
                  {notice.status === 'Draft' && (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      Draft
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {notice.status !== 'Draft' && (
                      <Switch
                        checked={notice.status === 'Published'}
                        className="data-[state=checked]:bg-green-500"
                      />
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t">
          <div className="flex justify-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              ←
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-orange-500 text-white hover:bg-orange-600"
            >
              1
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              4
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              5
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
