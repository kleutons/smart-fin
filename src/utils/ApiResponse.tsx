import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ErrorType {
    error: string;
}

type PossibleErrors = AxiosError<ErrorType> | Error | unknown;

class ApiResponse{

    // Função para mostrar mensagem de sucesso
    public success(message:string):void{
        toast.success(message);
    }

    // Função para tratar erros
    public error(err: PossibleErrors): void {

        let errorMessage:string;
        if (axios.isAxiosError(err)) {
            if (err.response) {
                errorMessage = 'Error: ' + err.response.data.error;
            } else {
                errorMessage = 'Error: ' + err.message;
            }
        } else if (err instanceof Error) {
            errorMessage = 'Erro inesperado: ' + err.message;
        } else {
            errorMessage = 'Ocorreu um erro desconhecido';
        }
        
        if (errorMessage.includes('Invalid Token')) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }

        if (errorMessage.includes('Forbidden')) {
            setTimeout(() => {
                window.location.href = "/forbidden";
            }, 500);
        }

        toast.error(errorMessage)
    }

}

export default new ApiResponse();