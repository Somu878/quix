import express from "express";

const app = express();
const PORT = process.env.PORT || "8000";
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ respose: "Server is up🔥🔥🔥" });
});

app.listen(PORT, () => {
  console.log("Server is up🔥🔥🔥");
});
