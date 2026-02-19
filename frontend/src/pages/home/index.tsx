import useItems from '@/features/items/useItems';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

function Home() {
  const { data: items, isLoading, error } = useItems();

  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);

  function getCartQty(id: number) {
    return cartItems.find((i) => i.id === id)?.quantity ?? 0;
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex justify-between items-center mt-auto pt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[40vh] gap-3 text-muted-foreground">
        <p className="text-lg font-medium">Erro ao carregar produtos.</p>
        <p className="text-sm">Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items?.map((item) => {
          const qty = getCartQty(item.id);

          return (
            <div
              key={item.id}
              className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-center h-48 p-4 bg-muted/30 rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="flex flex-col flex-1 p-4 gap-2">
                <h2 className="font-semibold text-sm leading-snug line-clamp-2">
                  {item.name}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-1 pt-3 border-t">
                  <span className="text-base font-bold text-primary">
                    {item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                  <Badge variant={item.stock > 20 ? 'default' : 'destructive'}>
                    {item.stock > 0 ? `${item.stock} em estoque` : 'Esgotado'}
                  </Badge>
                </div>

                <div className="mt-2">
                  {qty === 0 ? (
                    <Button
                      type="button"
                      className="w-full h-9 text-xs gap-1.5"
                      onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      disabled={item.stock === 0}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {item.stock === 0 ? 'Esgotado' : 'Adicionar ao carrinho'}
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => decreaseQty(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="text-sm font-semibold tabular-nums">
                        {qty} no carrinho
                      </span>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => increaseQty(item.id)}
                        disabled={qty >= item.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
