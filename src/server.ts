import app from "./app";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const env = dotenv.config();
dotenvExpand.expand(env);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at Port: ${PORT}`);
});
