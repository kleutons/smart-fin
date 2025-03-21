export const generateYears = (): { value: number; label: string }[] => {
    const currentYear = new Date().getFullYear(); // Obtém o ano atual
    const years = [];
  
    // Adiciona os 2 anos anteriores e o ano atual
    for (let i = currentYear - 2; i <= currentYear; i++) {
      years.push({ value: i, label: i.toString() });
    }
  
    return years;
  };
  