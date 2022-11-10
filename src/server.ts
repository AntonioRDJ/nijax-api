import app from "./app";
import { Config } from "./config";

app.listen(Config.PORT, () => {
  console.log(`Server running at Port: ${Config.PORT}`);
});
