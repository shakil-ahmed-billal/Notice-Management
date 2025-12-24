"use client"

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const useAllNotice = () => {

    const axiosPublic = useAxiosPublic();

    const { data, refetch, isLoading , isPending} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/api/v1/notices`);
            return data.data
        }
    })
    return { data, refetch, isLoading , isPending};
}

export default useAllNotice