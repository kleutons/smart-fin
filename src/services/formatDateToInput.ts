export function formatDateToInput(date: Date | string): string {
    // Garante que 'date' seja tratado como um objeto Date
    const localDate = new Date(date); 
   
    // Ajusta o deslocamento do fuso
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); 
   
    // Retorna apenas a parte da data
    return localDate.toISOString().split('T')[0]; 
}
