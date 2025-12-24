'use client';

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

interface Notice {
  _id: string;
  title: string;
  noticeType: string;
  position: string;
  publishedOn: string;
  status: 'Published' | 'Unpublished' | 'Draft';
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface NoticeApiResponse {
  success: boolean;
  message: string;
  data: Notice[];
  pagination: Pagination;
}


interface Params {
  limit: number;
  page: number;
  filterDepartment?: string;
  filterStatus?: string;
  searchTerm?: string;
}

const useAllNotice = ({
  limit,
  page,
  filterDepartment,
  filterStatus,
  searchTerm,
}: Params) => {
  const axiosPublic = useAxiosPublic();

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery<NoticeApiResponse>({
    queryKey: [
      'notices',
      limit,
      page,
      filterDepartment,
      filterStatus,
      searchTerm,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get<NoticeApiResponse>(
        `/api/v1/notices`,
        {
          params: {
            limit,
            page,
            filterDepartment,
            filterStatus,
            searchTerm,
          },
        }
      );
      return res.data;
    },

    // ✅ React Query v5 replacement for keepPreviousData
    placeholderData: (previousData:any) => previousData,
  });

  return {
    notices: data?.data ?? [],
    pagination: data?.pagination ?? {
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      limit,
    },
    isLoading,
    isFetching,
  };
};

export default useAllNotice;
