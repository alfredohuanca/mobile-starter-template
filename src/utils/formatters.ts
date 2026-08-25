/**
 * Funciones puras de formateo (Fechas, Monedas, Textos).
 */

export const Formatters = {
  /**
   * Formatea un número como moneda local o extranjera.
   */
  currency(amount: number, currencyCode: 'PEN' | 'USD' | 'EUR' = 'PEN'): string {
    const symbol = currencyCode === 'PEN' ? 'S/.' : currencyCode === 'USD' ? '$' : '€';
    return `${symbol} ${amount.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  /**
   * Formatea una fecha ISO a string legible.
   */
  date(isoString: string | Date, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof isoString === 'string' ? new Date(isoString) : isoString;
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleDateString('es-PE', options ?? {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  /**
   * Trunca un texto largo añadiendo puntos suspensivos.
   */
  truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  },
};
