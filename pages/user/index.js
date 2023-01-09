import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../../context/user";

import { fetchAPI } from "../../lib/api";

import Layout from "../../components/layout";

import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import MyModal from "../../components/modal";
import { Button } from "reactstrap";

import { dateFormat } from "../../lib/utils/miscellaneous";
import user from "../api/auth/user";
import axios from 'axios';
import HomeInfoQN from "../../components/homeSetupQ/HomeInfoQN";

const Home = ({
  houses,
  categories,
  userTasks,
  userCompletedTasks,
  userFutureTasks,
  cookies,
}) => {

  

  useEffect(()=> {
    getUserData();
    
  }, [])

  const [userData, setUserData] = useState();

  const getUserData = () => {
    return axios
      .get('/api/auth/user', {
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err))

  }


  const { user, email, id, checkLogin } = useContext(UserContext);

  const cardColors = [
    "#f72585ff",
    "#b5179eff",
    "#7209b7ff",
    "#560badff",
    "#480ca8ff",
    "#3a0ca3ff",
    "#3f37c9ff",
    "#4361eeff",
    "#4895efff",
    "#4cc9f0ff",
  ];

  console.warn("house",houses)

  return (
    <Layout categories={categories} userData={userData}>
      <main
        className="ttr-wrapper"
        style={{
          background: "#fAfAfA",
          paddingTop: 20,
          flexGrow: 1,
          overflow: 0,
          borderTop: "1px solid #e9ebf0",
        }}
      >
        {houses.length <= 0 ?
        <HomeInfoQN />
        : 
        <div className="container clearfix">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Dashboard</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i className="fa fa-home"></i>Home
                </a>
              </li>
              <li>Dashboard</li>
            </ul>
          </div>
          <div></div>
          <div className="row">
            <div className="col-4">
              <div
                className="cours-search-bx m-b30"
                style={{ background: "#4361EE" }}
              >
                <div className="icon-box">
                  <h3>
                    <span>{userTasks.length}</span>
                  </h3>
                </div>
                <div className="cours-search-text">
                  Open Tasks
                  <br />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div
                className="cours-search-bx m-b30"
                style={{ background: "#4CC9F0" }}
              >
                <div className="icon-box">
                  <h3>
                    <span>{userCompletedTasks.length}</span>
                  </h3>
                </div>
                <div className="cours-search-text">Completed Tasks</div>
              </div>
            </div>
            <div className="col-4">
              <div
                className="cours-search-bx m-b30"
                style={{ background: "#7209B7" }}
              >
                <div className="icon-box">
                  <h3>
                    <span>{userFutureTasks.length}</span>
                  </h3>
                </div>
                <div className="cours-search-text">
                  Future Tasks
                  <br />
                </div>
              </div>
            </div>
          </div>

          <div className="db-breadcrumb">
            <h5 className="breadcrumb-title">Open Tasks</h5>
          </div>
          <div className="row">
            {userTasks.length <= 0 && (
              <div className="col-12">
                No TASKS
                <div className="widget-card">
                  <div className="wc-item"></div>
                </div>
              </div>
            )}
            {userTasks.map((userTask) => (
              <div
                className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12"
                key={userTask.id}
              >
                <MyModal
                  trigger={
                    <div
                      className="widget-card widget-bg1"
                      style={{ background: cardColors[userTask.id % 10] }}
                    >
                      <div className="wc-item">
                        <div className="row">
                          <div className="col-sm-8">
                            <h4 className="wc-title">
                              {userTask.attributes.Name}
                            </h4>
                            <span className="wc-des">
                              Due: {dateFormat(userTask.attributes.StartDate)}
                            </span>
                          </div>
                          <div className="col-sm-4"></div>
                        </div>
                      </div>
                    </div>
                  }
                  header={userTask.attributes.Name}
                  taskid={userTask.id}
                  userid={cookies.userid}
                  userTask={userTask}
                >
                  {userTask.attributes.post.data.attributes.content}
                </MyModal>
              </div>
            ))}
          </div>

          <div className="db-breadcrumb">
            <h5 className="breadcrumb-title">Completed Tasks</h5>
          </div>
          <div className="row">
            {userCompletedTasks.length <= 0 && (
              <div className="col-12">
                No Completed Tasks
                <div className="widget-card">
                  <div className="wc-item"></div>
                </div>
              </div>
            )}
            {userCompletedTasks.map((userCompletedTask) => (
              <div
                className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12"
                key={userCompletedTask.id}
              >
                <div
                  className="widget-card widget-bg1"
                  style={{ background: cardColors[userCompletedTask.id % 10] }}
                >
                  <div className="wc-item">
                    <div className="row">
                      <div className="col-sm-12">
                        <h4 className="wc-title">
                          {userCompletedTask.attributes.Name}
                        </h4>
                        <span className="wc-des">
                          Completed on{" "}
                          {dateFormat(userCompletedTask.attributes.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="db-breadcrumb">
            <h5 className="breadcrumb-title">Future Tasks</h5>
          </div>
          <div className="row">
            {userFutureTasks.length <= 0 && (
              <div className="col-12">
                No Completed Tasks
                <div className="widget-card">
                  <div className="wc-item"></div>
                </div>
              </div>
            )}
            {userFutureTasks.map((userFutureTask) => (
              <div
                className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12"
                key={userFutureTask.id}
              >
                <div
                  className="widget-card widget-bg1"
                  style={{ background: cardColors[userFutureTask.id % 10] }}
                >
                  <div className="wc-item">
                    <div className="row">
                      <div className="col-sm-12">
                        <h4 className="wc-title">
                          {userFutureTask.attributes.Name}
                        </h4>
                        <span className="wc-des">
                          Due: {dateFormat(userFutureTask.attributes.StartDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        }

      </main>
    </Layout>
  );
};

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export async function getServerSideProps(context) {
  var cookies;

  var now = new Date();
  var quarter = Math.floor(now.getMonth() / 3);
  var firstDate = new Date(now.getFullYear(), quarter * 3, 1);
  var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);

  if (context.req.headers.cookie) {
    cookies = parseCookie(context.req.headers.cookie);
  } else {
    return {
      redirect: {
        destination: "/login",
        permanement: false,
      },
    };
  }
  const [
    userHouseRes,
    userTasksRes,
    userCompletedTasksRes,
    userFutureTasksRes,
    categoriesRes,
  ] = await Promise.all([
    fetchAPI("/houses", {
      populate: "*",
      filters: {
        users_permissions_user: {
          id: {
            $eq: cookies.userid,
          },
        },
      },
    }),
    fetchAPI("/user-checklist-tasks", {
      populate: "*",
      filters: {
        house: {
          users_permissions_user: {
            id: {
              $eq: cookies.userid,
            }
          },
        },
        $and: [
          {
            Complete: {
              $eq: false,
            },
          },
          {
            StartDate: {
              $lte: endDate,
            },
          },
        ],
      },
      sort: ["StartDate:asc"],
    }),
    fetchAPI("/user-checklist-tasks", {
      populate: "*",
      filters: {
        house: {
          users_permissions_user: {
            id: {
              $eq: cookies.userid,
            }
          },
        },
        $and: [
          {
            Complete: {
              $eq: true,
            },
          },
        ],
      },
      sort: ["updatedAt:desc"],
    }),
    fetchAPI("/user-checklist-tasks", {
      populate: "*",
      filters: {
        house: {
          users_permissions_user: {
            id: {
              $eq: cookies.userid,
            }
          },
        },
        $and: [
          {
            Complete: {
              $eq: false,
            },
          },
          {
            StartDate: {
              $gt: endDate,
            },
          },
        ],
      },
      sort: ["StartDate:asc"],
    }),
    fetchAPI("/categories", { populate: "*" }),
  ]);

  const [houses, categories, userTasks, userCompletedTasks, userFutureTasks] =
    await Promise.all([
      userHouseRes.data,
      categoriesRes.data,
      userTasksRes.data,
      userCompletedTasksRes.data,
      userFutureTasksRes.data,
    ]);

  return {
    props: {
      houses,
      categories,
      userTasks,
      userCompletedTasks,
      userFutureTasks,
      cookies,
    },
  };
}

export default Home;
