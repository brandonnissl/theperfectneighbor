import axios from "axios";

import {
  getSeason,
  getSeasonNumber,
  getSeasonStartMonth,
} from "../../lib/utils/miscellaneous";

export default async (req, res) => {
  if (req.method === "POST") {
    var item = req.body.userTask.attributes;
    
    var td = new Date();
    var season = getSeason(td);

    let dataSplit = item.StartDate.split("-");
    var newDate = new Date();
    var d = new Date();
    d.setDate(d.getDate());

    if (item.Frequency) {
      var dayofmonth = dataSplit[2];
      var year = dataSplit[0];
      var month = dataSplit[1];
      newDate.setDate(dayofmonth);
      newDate.setMonth(month);
      newDate.setYear(year);

      newDate = new Date(newDate.setDate(newDate.getDate() + item.Frequency));

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
      if ((o = dataSplit[0])) {
        o = parseInt(o) + 1;
      }

      newDate.setDate(n);
      newDate.setMonth(m);
      newDate.setFullYear(o);
      item.StartDate = newDate;
    }

    const createChecklists = await axios
      .post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/user-checklist-tasks`, {
        data: {
          Name: item.Name,
          post: item.post.data.id,
          house: item.house.data.id,
          StartDate: item.StartDate,
          Complete: false,
        },
      })
      .then((resp) => resp.data);
    const userCompletedTask = await axios
      .put(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/user-checklist-tasks/${req.body.userTask.id}`, {
        data: {
          Complete: true,
        },
      })
      .then((resp) => resp.data);

      return res.status(200).json({
        message: `Created new task and closed out old task.`,
      });
  }
};
