import axios from "axios";

import {
  getSeason,
  getSeasonNumber,
  getSeasonStartMonth,
} from "../../lib/utils/miscellaneous";

export default async (req, res) => {
  if (req.method === "POST") {
    var td = new Date();
        var season = getSeason(td);
        var newDate = new Date();
        var d = new Date();
        d.setDate(d.getDate());
        var item = element.attributes;
        if (item.Frequency) {
          var newDate = d;
          newDate = new Date(newDate.setDate(d.getDate())); //+ item.Frequency

          item.StartDate = newDate;
        } else {
          let n = 1;
          let m = getSeasonStartMonth(item.Season);
          var o;

          if (
            d.getFullYear() * 10 + getSeason(d) <=
            d.getFullYear() * 10 + getSeasonNumber(item.Season)
          ) {
            o = d.getFullYear();
          } else {
            o = d.getFullYear() + 1;
          }
          newDate.setDate(n);
          newDate.setMonth(m);
          newDate.setFullYear(o);
          item.StartDate = newDate;
        }
        item.Complete = false;

        const createChecklists = await axios
          .post(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/user-checklist-tasks`,
            {
              data: {
                Name: item.title,
                post: element.id,
                house: createHouse.data.id,
                StartDate: item.StartDate,
                Complete: false,
              },
            }
          )
          .then((resp) => resp.data)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });

    



      return res.status(200).json({
        message: `Created new task and closed out old task.`,
      });
  }
};
