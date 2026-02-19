import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

function useItems() {
    const fetchData = async (): Promise<Item[]> => {
        const { data } = await api.get<Item[]>('/items');
        return data;
    };

    return useQuery({
        queryKey: ['items'],
        queryFn: fetchData,
        placeholderData: keepPreviousData,
    });
}

export default useItems;
