import {create} from 'zustand';

interface RentModalStore {
    isOpen: boolean;
    onOpen: () => {};
    onClose: () => {};
}

const useRentModal = create<RentModalStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useRentModal;