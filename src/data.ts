export type Prato = { id: number; nome: string; descricao: string; porcao: string; preco: number; foto: string }
export type Restaurante = {
  id: number; titulo: string; tipo: string; destacado?: boolean; avaliacao: number
  descricao: string; capa: string; cardapio: Prato[]
}
export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
// "italiana" -> "Italiana", como nas tags do Figma
export const capitalizar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)
