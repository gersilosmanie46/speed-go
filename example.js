/**
 * Fibonacci Sequence
 * 
 * This code generates the Fibonacci sequence up to a given number using recursion.
 * The code is designed to handle large numbers and utilizes memoization for efficiency.
 * 
 * Author: Codegenius
 * Date: 2022-01-01
 */

// Calculates the Fibonacci sequence up to a given number
function fibonacci(n) {
  // Check if the calculated value is already memoized
  if (fibonacci.memoize[n]) {
    return fibonacci.memoize[n];
  }

  let result;
  
  // Base cases
  if (n === 0) {
    result = 0;
  } else if (n === 1) {
    result = 1;
  } else {
    // Recursive calculation
    result = fibonacci(n - 1) + fibonacci(n - 2);
  }

  // Memoize the calculated value
  fibonacci.memoize[n] = result;
  return result;
}

// Stores the memoized values
fibonacci.memoize = [];

// Calculate and print the Fibonacci sequence up to a given number
const n = 10; // Change the value to generate a different sequence
for (let i = 0; i <= n; i++) {
  console.log(`Fibonacci(${i}) = ${fibonacci(i)}`);
}

// Output:
// Fibonacci(0) = 0
// Fibonacci(1) = 1
// Fibonacci(2) = 1
// Fibonacci(3) = 2
// Fibonacci(4) = 3
// Fibonacci(5) = 5
// Fibonacci(6) = 8
// Fibonacci(7) = 13
// Fibonacci(8) = 21
// Fibonacci(9) = 34
// Fibonacci(10) = 55