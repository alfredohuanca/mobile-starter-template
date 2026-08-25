/**
 * Validadores puros reutilizables.
 */

export const Validators = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  },

  hasMinLength(value: string, minLength: number): boolean {
    return value.trim().length >= minLength;
  },

  isNumeric(value: string): boolean {
    return /^\d+$/.test(value.trim());
  },
};
