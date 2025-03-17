import { UserReturnType } from "../types/UserType";

// Função para atualizar o localStorage e disparar o evento customizado
export const updateLocalStorageUser = (updatedUser: UserReturnType | null) => {
    const currentUser = localStorage.getItem('user');
    const currentParsedUser = currentUser ? JSON.parse(currentUser) : null;

    if (updatedUser && currentParsedUser && updatedUser.id === currentParsedUser.id) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Dispara um evento customizado para notificar outras partes da aplicação
        window.dispatchEvent(new Event('localStorageUpdate'));
    }
};