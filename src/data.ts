export type Prato = { id: number; nome: string; descricao: string; porcao: string; preco: number; foto: string }
export type Restaurante = {
  id: number; titulo: string; tipo: string; destaque?: boolean; avaliacao: number
  descricao: string; capa: string; cardapio: Prato[]
}
const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`
const pratos = (fotos: string[], base: string): Prato[] =>
  fotos.map((f, i) => ({
    id: i + 1, nome: `${base} ${i + 1}`, foto: img(f), porcao: 'de 2 a 3 pessoas', preco: 60.9 + i * 10,
    descricao: 'A clássica receita da casa, preparada com ingredientes frescos, selecionados e muito sabor. Acompanha molho especial e finalização artesanal.'
  }))
const f = ['photo-1546069901-ba9599a7e63c', 'photo-1565299624946-b28f40a0ae38', 'photo-1567620905732-2d1ec7ab7445', 'photo-1540189549336-e6e99c3679fe', 'photo-1473093295043-cdd812d0e601', 'photo-1504674900247-0877df9cc836']
export const restaurantes: Restaurante[] = [
  { id: 1, titulo: 'Hioki Sushi', tipo: 'Japonesa', destaque: true, avaliacao: 4.9, capa: img(f[0]),
    descricao: 'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis e pratos quentes.', cardapio: pratos(f, 'Combo Hioki') },
  { id: 2, titulo: 'La Dolce Vita Trattoria', tipo: 'Italiana', avaliacao: 4.6, capa: img(f[1]),
    descricao: 'A La Dolce Vita Trattoria traz o sabor autêntico da Itália direto para a sua mesa, com massas artesanais.', cardapio: pratos(f.slice().reverse(), 'Massa Dolce') },
  { id: 3, titulo: 'Bella Napoli', tipo: 'Italiana', avaliacao: 4.7, capa: img(f[2]),
    descricao: 'Pizzas de massa fina assadas em forno a lenha, com ingredientes importados e receitas tradicionais.', cardapio: pratos(f, 'Pizza Napoli') },
  { id: 4, titulo: 'Sakura Express', tipo: 'Japonesa', avaliacao: 4.4, capa: img(f[3]),
    descricao: 'Culinária japonesa rápida e saborosa, com combinados variados e opções vegetarianas.', cardapio: pratos(f, 'Combinado Sakura') },
  { id: 5, titulo: 'Pasta & Co.', tipo: 'Italiana', avaliacao: 4.5, capa: img(f[4]),
    descricao: 'Massas frescas feitas todos os dias, com molhos caseiros e muito queijo.', cardapio: pratos(f, 'Spaghetti') },
  { id: 6, titulo: 'Tokyo Grill', tipo: 'Japonesa', avaliacao: 4.8, capa: img(f[5]),
    descricao: 'Yakisoba, teppanyaki e grelhados no estilo japonês, preparados na hora.', cardapio: pratos(f, 'Teppan') }
]
export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
