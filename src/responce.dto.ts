export class ResponseApi<T> {
    statut : 'succès' | 'erreur';
    message: string;
    data?:T;

    constructor(statut: 'succès' | 'erreur', message: string, data?: T){
        this.statut = statut;
        this.message = message;
        this.data = data;
    }
}