const express = require("express");
require("dotenv").config();
const db = require("./config/database");

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;


async function startServer() {
    try {
        db.connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
