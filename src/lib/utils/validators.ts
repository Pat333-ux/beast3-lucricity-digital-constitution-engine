export const validators = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidZipCode(zip: string): boolean {
    // Validates standard US zip codes (with specific focus on Indiana/Vigo County 478xx regions)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  },

  isPositiveNumber(value: number): boolean {
    return typeof value === "number" && !isNaN(value) && value > 0;
  },

  isValidEthereumAddress(address: string): boolean {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethRegex.test(address);
  },
};
