import axios from "axios";

import {
  getSeason,
  getSeasonNumber,
  getSeasonStartMonth,
} from "../../lib/utils/miscellaneous";
const qs = require("qs");

export default async (req, res) => {
  if (req.method === "POST") {
    //Create House
    const body = req.body;

    const createHouse = await axios
      .post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/houses`, {
        headers: {
          Authorization:
          `Bearer ${process.env.NEXT_API_KEY}`,
        },
        data: {
          Name: body.user + "'s House",
          users_permissions_user: body.userid,
          HomeType: body.homeType,
          YardType: body.yardType,
          HeatingType: body.heatingType,
          CoolingType: body.coolingType,
          Zipcode: body.zipcode,
        },
      })
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


    //Query to get all checklist tasks
    const queries = [
      //homeType
      {
        filters: {
          homeType: {
            Type: {
              $eq: body.homeType,
            },
          },
          Checklist: {
            $eq: true,
          },
        },
      },
      {
        filters: {
          YardType: {
            Type: {
              $eq: body.yardType,
            },
          },
          Checklist: {
            $eq: true,
          },
        },
      },
      {
        filters: {
          HeatingType: {
            Type: {
              $eq: body.heatingType,
            },
          },
          Checklist: {
            $eq: true,
          },
        },
      },
      {
        filters: {
          CoolingType: {
            Type: {
              $eq: body.coolingType,
            },
          },
          Checklist: {
            $eq: true,
          },
        },
      },
    ];

    

    queries.forEach(async (query) => {
      console.log("q", qs.stringify(query));
      const getChecklist = await axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?${qs.stringify(query)}`, {
          params: {
            populate: "*",
          },
        })
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
      console.warn("checklist", getChecklist.data);
      getChecklist.data.forEach(async (element) => {
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
      });
    });
  }

  return res.status(200).json({
    message: `Created house and checklist.`,
  });
};
