import { PrismaClient } from "@prisma/client";
import app from "./app";


app.listen(3000, () => {
  console.log("App is running in port 3000");
});
