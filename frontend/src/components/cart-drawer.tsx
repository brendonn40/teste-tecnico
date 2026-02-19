import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from '@/components/ui/sheet';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCreateOrder } from '@/features/orders/useCreateOrder';
import { useAuth } from '@/components/providers/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';

const CheckoutSchema = z.object({
    name: z.string().min(1, 'Campo obrigatório'),
    email: z.string().min(1, 'Campo obrigatório').email('E-mail inválido'),
    address: z.string().min(1, 'Campo obrigatório'),
    payment: z.string().min(1, 'Selecione uma forma de pagamento'),
});
type CheckoutForm = z.infer<typeof CheckoutSchema>;

export function CartDrawer() {
    const items = useCartStore((s) => s.items);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const removeItem = useCartStore((s) => s.removeItem);
    const clearCart = useCartStore((s) => s.clearCart);

    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const orderTotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const { user } = useAuth();
    const { mutate: createOrder, isPending } = useCreateOrder();
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const form = useForm<CheckoutForm>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            address: user?.address ?? '',
            payment: '',
        },
    });

    function onSubmit(values: CheckoutForm) {
        createOrder(values, {
            onSuccess: () => {
                clearCart();
                setCheckoutOpen(false);
                form.reset();
                toast.success('Pedido realizado com sucesso!');
            },
            onError: () => {
                toast.error('Erro ao finalizar o pedido. Tente novamente.');
            },
        });
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button type="button" variant="outline" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {count > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                {count}
                            </span>
                        )}
                    </Button>
                </SheetTrigger>

                <SheetContent className="flex flex-col w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Carrinho
                            {count > 0 && (
                                <span className="text-sm font-normal text-muted-foreground">
                                    ({count} {count === 1 ? 'item' : 'itens'})
                                </span>
                            )}
                        </SheetTitle>
                    </SheetHeader>

                    {items.length === 0 ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
                            <ShoppingCart className="h-12 w-12 opacity-30" />
                            <p className="text-sm">Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 -mx-6 px-6">
                                <div className="flex flex-col gap-4 py-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-start">
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border bg-muted/30 p-1">
                                                <img src={item.image} alt={item.name} className="h-full object-contain" />
                                            </div>

                                            <div className="flex flex-1 flex-col gap-1 min-w-0">
                                                <p className="text-sm font-medium leading-snug line-clamp-2">{item.name}</p>
                                                <p className="text-sm text-primary font-semibold">
                                                    {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => decreaseQty(item.id)}>
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                                                    <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => increaseQty(item.id)}>
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-xs text-muted-foreground ml-1">
                                                        = {(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                    </span>
                                                </div>
                                            </div>

                                            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <Separator />

                            <SheetFooter className="flex-col gap-3 pt-2">
                                <div className="flex items-center justify-between w-full text-base font-semibold">
                                    <span>Total:&nbsp;</span>
                                    <span className="text-primary">
                                        {orderTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    className="w-full"
                                    size="lg"
                                    onClick={() => setCheckoutOpen(true)}
                                >
                                    Finalizar pedido
                                </Button>
                                <Button type="button" variant="ghost" className="w-full text-muted-foreground text-xs" onClick={clearCart}>
                                    Limpar carrinho
                                </Button>
                            </SheetFooter>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Finalizar pedido</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="seu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Endereço</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Rua, número, bairro, cidade" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="payment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Forma de pagamento</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="credit_card">Cartão de crédito</SelectItem>
                                                <SelectItem value="debit_card">Cartão de débito</SelectItem>
                                                <SelectItem value="pix">PIX</SelectItem>
                                                <SelectItem value="boleto">Boleto bancário</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="pt-2">
                                <Button type="button" variant="outline" onClick={() => setCheckoutOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" loading={isPending}>
                                    Confirmar pedido
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
