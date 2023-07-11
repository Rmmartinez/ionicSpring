//En typescript se termina compilando y generando código js
//Si usamos interfaces, no se genera ningún código extra
//entonces la app va a pesar menos

export default interface Employee{
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    address?: string;
    salary?: number;

    //El ?: significa que el dato no es obligatorio
    //Dejo el ID con ?: para usarlo en editar/nuevo cliente,
    //lo necesito vacío para diferenciar los casos
}
