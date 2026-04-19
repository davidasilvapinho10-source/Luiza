export type PublicProduct = {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  cor: string;
  preco: number;
  imagemPrincipal: string;
  disponivel: boolean;
  estoque: number;
  tamanhos: string[];
};
