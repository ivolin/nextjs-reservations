import axios from "axios";
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const UseFavorite = ({
    listingId,
    currentUser,
} : IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId);
    }, [listingId, currentUser]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>,
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error: any) {
            toast.error('Something went wrong');
        }
    }, [
        currentUser,
        hasFavorited,
        router,
        loginModal,
        listingId
    ]);

    return { 
        toggleFavorite,
        hasFavorited,
    }
}

export default UseFavorite;