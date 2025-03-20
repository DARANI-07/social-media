const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const windowSize = 10;
let windowNumbers = [];
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDU4NzUyLCJpYXQiOjE3NDI0NTg0NTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA4YzFjNDA4LThhNTktNDVjNS1iMWFlLTZhMzJiZjUyMzRiNCIsInN1YiI6IjIyYWQwMDdAZHJuZ3BpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IkRyLk4uRy5PLkluc3RpdHVlIG9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6IjA4YzFjNDA4LThhNTktNDVjNS1iMWFlLTZhMzJiZjUyMzRiNCIsImNsaWVudFNlY3JldCI6IllkYnZFWk1zVUpadVhvbUUiLCJvd25lck5hbWUiOiJEYXJhbmlkYXJhbiBTIiwib3duZXJFbWFpbCI6IjIyYWQwMDdAZHJuZ3BpdC5hYy5pbiIsInJvbGxObyI6IjcxMDcyMjI0MzAwNyJ9.pRUvTvqVo7b5Mr0L7a2PKg36DXBHeGtQavE0E__3uFM"
app.get("/numbers/:numberid", async (req, res) => {
    const { numberid } = req.params;
    let apiUrl = "";

    switch (numberid) {
        case "p":
            apiUrl = "http://20.244.56.144/test/primes";
            break;
        case "f":
            apiUrl = "http://20.244.56.144/test/fibo";
            break;
        case "e":
            apiUrl = "http://20.244.56.144/test/even";
            break;
        case "r":
            apiUrl = "http://20.244.56.144/test/rand";
            break;
        default:
            return res.status(400).json({ error: "Invalid number type." });
    }

    try {
        const response = await axios.get(apiUrl, {
            timeout: 500, 
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.data.numbers) throw new Error("Invalid response format");

        let newNumbers = response.data.numbers.filter((num) => !windowNumbers.includes(num));

        const windPrevState = [...windowNumbers];

        windowNumbers = [...windowNumbers, ...newNumbers].slice(-windowSize);

        const avg =
            windowNumbers.length > 0
                ? (windowNumbers.reduce((a, b) => a + b, 0) / windowNumbers.length).toFixed(2)
                : 0;

        res.json({
            windPrevState,
            windCurrState: windowNumbers,
            numbers: newNumbers,
            avg,
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch numbers within 500ms." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
