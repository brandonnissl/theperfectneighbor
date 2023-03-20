import axios from "axios";
const qs = require("qs");

export default async (req, res) => {
  if (req.method === "GET") {
    const { userId, postId } = req.query;
    const getHouseUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/houses?filters[users_permissions_user][id][$eq]=${userId}`;
    const getHouse = await axios.get(getHouseUrl);
    try {
      if ((await getHouse).status === 200) {
        const findArticleInChecklistQuery =
          process.env.NEXT_PUBLIC_STRAPI_API_URL +
          "/api/user-checklist-tasks?filters[house][id][$eq]=" +
          getHouse.data.data[0].id +
          "&filters[post][id][$eq]=" +
          postId +
          "&filters[Complete][$eq]=false&populate=*";
        console.warn(findArticleInChecklistQuery);
        const findArticleInChecklist = await axios.get(
          findArticleInChecklistQuery
        );

        res.status(200).json(findArticleInChecklist.data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
