import axios from "axios";

export default async (req, res) => {
  /*const resp = await axios
      .post(
        process.env.NEXTPUBLIC_API_URL + "/api/auth/local/register",
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return res.status(200).json({
          message: `Check your email (${req.body.email}) and follow the instructions to confirm your account.`,
        });
      })
      .catch((error) => {
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: "Internal server error" });
        } else {
          const messages = error.response.data.error.message;
          return res.status(403).json({ message: messages });
        }
      });*/

  const createUser = async () => {
    const resp = await axios.post(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/auth/local/register",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await resp;
    return data;
  };

  const createHouse = async (userData) => {
    const values = {
      data: {
        Name: userData.username + "'s House",
        users_permissions_user: [userData.id],
      },
      
        
    };
    const resp = await axios.post(
      process.env.n8n_URL + "/7f3a969d-c05f-46aa-908e-07749f595d1b",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await resp;
    return data;
  };

  if (req.method === "POST" || req.method === "OPTIONS") {
    createUser()
      .then((userResponse) => {
        createHouse(userResponse.data.user).then((houseResponse) => {
          
        });

        return res.status(200).json({
          message: `Check your email (${req.body.email}) and follow the instructions to confirm your account.`,
        });
      })
      .catch((error) => {
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: "Internal server error" });
        } else {
          const messages = error.response.data.error.message;
          return res.status(403).json({ message: messages });
        }
      });
  }
};
