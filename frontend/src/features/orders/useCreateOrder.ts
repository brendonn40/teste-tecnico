import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

export interface OrderForm {
    name: string;
    email: string;
    address: string;
    payment: string;
}

export function useCreateOrder() {
    const cartItems = useCartStore.getState().items;

    return useMutation({
        mutationFn: (data: OrderForm) => {
            const payload = {
                ...data,
                items: cartItems.map((item) => ({
                    productId: String(item.id),
                    quantity: item.quantity,
                })),
            };

            return api.post("/orders", payload);
        },
    });
}
