// utils.js

/**
 * Formata um número como preço em Real Brasileiro (BRL) com 2 casas decimais.
 * @param {number} price - O preço a ser formatado.
 * @returns {string} - O preço formatado em BRL.
 */
export function FormatPriceToBRL(price:number) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
