/**
 * Number and currency formatters for India context
 */

/**
 * Format number as Indian currency (₹)
 * Uses Indian numbering system (lakhs, crores)
 */
export function formatINR(amount: number, decimals: number = 0): string {
  if (!isFinite(amount)) return '₹0';

  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;

  let formatted: string;

  if (absAmount >= 10000000) {
    // Crores (₹1 Cr = ₹1,00,00,000)
    const crores = absAmount / 10000000;
    formatted = `₹${crores.toFixed(decimals)} Cr`;
  } else if (absAmount >= 100000) {
    // Lakhs (₹1 L = ₹1,00,000)
    const lakhs = absAmount / 100000;
    formatted = `₹${lakhs.toFixed(decimals)} L`;
  } else if (absAmount >= 1000) {
    // Thousands with commas
    formatted = `₹${Math.round(absAmount).toLocaleString('en-IN')}`;
  } else {
    formatted = `₹${absAmount.toFixed(decimals)}`;
  }

  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Format number as Indian numbering (2,00,000 instead of 200000)
 */
export function formatIndianNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format rate (for display in forms)
 */
export function formatRate(value: number, decimals: number = 2): string {
  return (value * 100).toFixed(decimals);
}

/**
 * Parse rate from percentage string (reverse of formatRate)
 */
export function parseRate(percentStr: string): number {
  const num = parseFloat(percentStr);
  return isNaN(num) ? 0 : num / 100;
}

/**
 * Format years (with decimal places if applicable)
 */
export function formatYears(years: number): string {
  if (years === Infinity) return '∞';
  if (years === 0) return '0 years';

  const wholeYears = Math.floor(years);
  const months = Math.round((years - wholeYears) * 12);

  if (months === 0) {
    return `${wholeYears} year${wholeYears !== 1 ? 's' : ''}`;
  }

  return `${wholeYears} year${wholeYears !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
}

/**
 * Format age (e.g., "45 years")
 */
export function formatAge(age: number): string {
  return `${Math.round(age)} years`;
}

/**
 * Format date (Indian format: DD/MM/YYYY)
 */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format date with year name
 */
export function formatDateWithYear(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('en-IN', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format large currency for display (e.g., chart tooltips)
 */
export function formatCurrency(amount: number): string {
  return formatINR(amount);
}

/**
 * Abbreviate long number for compact display (e.g., dashboard cards)
 */
export function abbreviateNumber(num: number, decimals: number = 1): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(decimals)}Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(decimals)}L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(0);
}

/**
 * Format number for input fields (remove formatting)
 */
export function parseNumber(str: string): number {
  const cleaned = str.replace(/[^\d.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format success rate as percentage
 */
export function formatSuccessRate(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`;
}

/**
 * Create a human-readable summary of an amount
 */
export function summarizeAmount(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} crore`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} lakh`;
  }
  return `₹${amount.toFixed(0)}`;
}
