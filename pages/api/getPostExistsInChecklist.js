import axios from "axios";
const qs = require("qs");

export default async (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(req.body);

    /*const getHouse = axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/houses?filters[users_permissions_user][id][$eq]=${req.body.userData.id}`)
      .then((resp) => {
        const findArticleInChecklistQuery =process.env.NEXT_PUBLIC_STRAPI_API_URL+'/api/user-checklist-tasks?filters[house][id][$eq]='+resp.data.data[0].id+'&filters[post][id][$eq]='+req.body.post.id+'&filters[Complete][$eq]=false';
        const findArticleInChecklist = axios.get(findArticleInChecklistQuery)
          .then((respF) => {
            res.status(200).json(respF.data.data)
          })
          .catch((err2) => {
            console.error(err2)
          })
      })
      .catch((err) => {
        console.error(err)
      })*/

  }
};
