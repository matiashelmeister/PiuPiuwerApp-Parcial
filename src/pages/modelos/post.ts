import { Usuario } from "./usuario";

export interface Post {
    usuario: Usuario;
    conteudo: string;
    favoritado: boolean;
    data: string;
}