import EmptyState from "../components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";

import ClientOnly from "@/app/components/ClientOnly";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
         )
    }

    const properties = await getListings({
        userId: currentUser.id
    });

    if (!properties) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have no properties"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={properties}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;