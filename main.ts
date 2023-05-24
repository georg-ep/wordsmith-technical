// Function that converts an Arabic number to its Roman numeral equivalent
function arabicToRoman(num: number): string {
  // Check if the number is within the acceptable range for Roman numerals (1 to 3999)
  if (num < 1 || num > 3999) {
      // If it isn't, throw an error
      throw new Error('Number must be between 1 and 3999');
  }
  
  // Define the values for each Roman numeral in descending order
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  // Define the corresponding Roman numerals for each value
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  // Initialize an empty string to store the result
  let result = '';

  // Iterate over each value/numeral pair
  for(let i = 0; i < values.length; i++) {
      // While the number is greater than or equal to the current value
      while(num >= values[i]) {
          // Subtract the value from the number
          num -= values[i];
          // Add the corresponding numeral to the result
          result += numerals[i];
      }
  }

  // Return the final result
  return result;
}

// To run this code 
// 1. npm install -g typescript
// 2. tsc main.ts | node main.js
