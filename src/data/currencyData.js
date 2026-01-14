// Currency mapping by country
export const currencyByCountry = {
  Kenya: {
    code: "KES",
    symbol: "KSh",
    name: "Kenyan Shilling",
  },
  USA: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  },
  UK: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
  },
  India: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
  },
  Australia: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
  },
  "South Africa": {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
  },
};

// Get currency for a specific country
export const getCurrencyForCountry = (country) => {
  return currencyByCountry[country] || currencyByCountry["USA"]; // Default to USD
};

// Format price with currency
export const formatPrice = (minPrice, maxPrice, country) => {
  const currency = getCurrencyForCountry(country);
  
  if (minPrice && maxPrice) {
    return `${currency.symbol}${minPrice.toLocaleString()} - ${currency.symbol}${maxPrice.toLocaleString()}`;
  } else if (minPrice) {
    return `${currency.symbol}${minPrice.toLocaleString()}`;
  }
  
  return "Price on request";
};

// Parse price range from string (for existing data)
export const parsePriceRange = (priceString) => {
  if (!priceString) return null;
  
  // Extract numbers from string like "KSh 2,000 - 5,000" or "$80 - $200"
  const numbers = priceString.match(/[\d,]+/g);
  
  if (numbers && numbers.length >= 2) {
    return {
      min: parseInt(numbers[0].replace(/,/g, "")),
      max: parseInt(numbers[1].replace(/,/g, "")),
    };
  }
  
  return null;
};

// Get currency symbol from price string
export const extractCurrencyFromPrice = (priceString) => {
  if (!priceString) return "$";
  
  // Match common currency symbols
  const symbolMatch = priceString.match(/^([A-Z]{1,3}|[₹$£€¥₦R])/);
  return symbolMatch ? symbolMatch[1] : "$";
};
