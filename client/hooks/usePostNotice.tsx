"use client"

import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePostNotice = () => {
    const axiosPublic = useAxiosPublic();

    return useMutation({
        mutationFn: async (notice: any) => {
            console.log("Posting notice:", notice);
            const { data } = await axiosPublic.post(`/api/v1/notices`, notice);
            console.log("Response:", data);
            return data.data;
        },
    });
}

export default usePostNotice;