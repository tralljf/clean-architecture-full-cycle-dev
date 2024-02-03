import dotenv from "dotenv";
import { app } from "./express";

dotenv.config();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
