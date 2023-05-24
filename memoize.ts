// Declare a type for function with generic parameter and return types
type Func<P extends any[], R> = (...args: P) => R;

// Declare a memoization function that takes a function as an argument
// The function and its return type are generic to handle any function
function memoize<P extends any[], R>(fn: Func<P, R>): Func<P, R> {
    // Declare a new cache as a Map
    // The keys will be the stringified arguments, and the values will be the return values
    const cache = new Map<string, R>();

    // Return a new function that takes the same arguments as the original function
    return (...args: P): R => {
        // Create a key by stringifying the arguments
        const key = JSON.stringify(args);

        // If the cache already contains the key, return the cached value
        if (cache.has(key)) {
            return cache.get(key) as R;
        } else {
            // If the cache does not contain the key, call the function to get the result
            const result = fn(...args);

            // Store the result in the cache
            cache.set(key, result);

            // Return the result
            return result;
        }
    };
}


// To run this function
// 1. npm install -g typescript
// 2. tsc memoize.ts && node memoize.js