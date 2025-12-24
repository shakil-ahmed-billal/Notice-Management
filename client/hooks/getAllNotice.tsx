'use client';

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

interface Params {
  limit: number;
  page: number;
  filterDepartment: string;
  filterStatus: string;
  searchTerm: string;
}

const useAllNotice = ({
  limit,
  page,
  filterDepartment,
  filterStatus,
  searchTerm,
}: Params) => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'notices',
      limit,
      page,
      filterDepartment,
      filterStatus,
      searchTerm,
    ],
    queryFn: async () => {
      const res = await axiosPublic(
        `/api/v1/notices?limit=${limit}&page=${page}&filterDepartment=${filterDepartment}&filterStatus=${filterStatus}&searchTerm=${searchTerm}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    notices: data?.data || [],
    pagination: data?.pagination || {},
    isLoading,
    isFetching,
  };
};

export default useAllNotice;
