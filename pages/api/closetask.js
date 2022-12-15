import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    await axios
      .post(req.body.url, req.body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        res.status(200).json({
          message: `Completed adding task and closing old.`,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "error occured" });
      });
  }
};
