import prisma from '@/app/libs/prismadb';
import { SafeUser } from '../types';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.favouriteIds) {
            return [];
        }

        const favoriteListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])],
                },
            }
        });

        const safeListings = favoriteListings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    } 
} 