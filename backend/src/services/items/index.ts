const baseUrl = "https://fakestoreapi.com";

export async function _getItems() {
  const response = await fetch(`${baseUrl}/products`);
  const raw: any[] = await response.json();

  return raw.map((item) => ({
    id: item.id,
    name: item.title,
    description: item.description,
    price: item.price,
    stock: Math.floor(Math.random() * 96) + 5, // simulado: entre 5 e 100
    image: item.image,
  }));
}




