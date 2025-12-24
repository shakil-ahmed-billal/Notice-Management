"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAllNotice from "@/hooks/getAllNotice";
import {
  Calendar,
  Edit,
  Eye,
  FileEdit,
  MoreVertical,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type NoticeStatus = "Published" | "Unpublished" | "Draft";

interface Notice {
  _id: string;
  title: string;
  noticeType: string;
  position: string;
  publishedOn: string;
  status: NoticeStatus;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

/* ================= COMPONENT ================= */

export default function NoticeBoard() {


  const [filterStatus, setFilterStatus] = useState<
  "ALL" | "Published" | "Unpublished" | "Draft">("ALL");
  const [filterDepartment, setFilterDepartment] = useState<"ALL" | string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 8;

  const {
    notices,
    pagination,
    isLoading,
    isFetching,
  }: {
    notices: Notice[];
    pagination: Pagination;
    isLoading: boolean;
    isFetching: boolean;
  } = useAllNotice({
    limit,
    page,
    filterDepartment: filterDepartment === "ALL" ? "" : filterDepartment,
    filterStatus: filterStatus === "ALL" ? "" : filterStatus,
    searchTerm,
  });

  useEffect(() => {
    setPage(1);
  }, [filterDepartment, filterStatus, searchTerm]);

  const getDepartmentColor = (dept: string): string => {
    const colors: Record<string, string> = {
      "All Department": "text-blue-600",
      Finance: "text-green-600",
      "Sales Team": "text-orange-600",
      "Web Team": "text-blue-600",
      "Database Team": "text-purple-600",
      Admin: "text-purple-600",
      Individual: "text-blue-600",
      HR: "text-red-600",
    };
    return colors[dept] || "text-gray-600";
  };


  return (
    <div className="flex-1 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Notice Management
          </h1>

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
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={filterDepartment}
              onValueChange={setFilterDepartment}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Departments</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sales">Sales Team</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Search title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Unpublished">Unpublished</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Published on
            </Button>

            <Button
              variant="ghost"
              className="text-orange-500 hover:text-orange-600"
              onClick={() => {
                setFilterStatus("ALL");
                setFilterDepartment("ALL");
                setSearchTerm("");
                setPage(1);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Notice Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Published On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : notices?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-gray-500">No notices found</p>
                </TableCell>
              </TableRow>
            ) : (
              notices?.map((notice: Notice) => (
                <TableRow key={notice._id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>{notice.noticeType}</TableCell>
                  <TableCell>
                    <span className={getDepartmentColor(notice.position)}>
                      {notice.position}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(notice.publishedOn).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        notice.status === "Published"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : notice.status === "Draft"
                          ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }
                    >
                      {notice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {notice.status !== "Draft" && (
                        <Switch checked={notice.status === "Published"} />
                      )}
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Notice</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, pagination.totalItems)} of{" "}
              {pagination.totalItems} results
            </p>

            <div className="flex justify-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ←
              </Button>

              {[...Array(pagination.totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant="outline"
                  size="icon"
                  className={
                    page === i + 1
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : ""
                  }
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}