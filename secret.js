const fs = require('fs');

// Function to decode the value based on the base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Lagrange Interpolation to find the constant term (c)
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [xj] = points[j];
                li *= (0 - xj) / (xi - xj);  // x = 0 for constant term
            }
        }
        constantTerm += yi * li;
    }

    return constantTerm;
}

// Main function to process the input and solve for 'c'
function findSecretConstant(filePath) {
    // Read the JSON input
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const { n, k } = data.keys;
    let points = [];

    // Decode the points from the JSON data
    for (let key in data) {
        if (key !== 'keys') {
            const base = parseInt(data[key].base);
            const value = data[key].value;
            const x = parseInt(key);  // Key as x
            const y = decodeValue(base, value);  // Decoded value as y
            points.push([x, y]);
        }
    }

    // Sort points by x values (optional, for cleaner calculations)
    points.sort((a, b) => a[0] - b[0]);

    // Find the constant term (c) using Lagrange Interpolation
    const secret = lagrangeInterpolation(points, k);
    console.log(`The constant term (c) is: ${Math.round(secret)}`);
}

// Running for the first test case
findSecretConstant('testcase1.json');

// Running for the second test case
findSecretConstant('testcase2.json');
