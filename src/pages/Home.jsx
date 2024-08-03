import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userListFetch } from "../redux/Slices/usersListSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import moment from "moment";
import DraggableButton from "../components/Others/CheckButton";
import { useSwipeable } from "react-swipeable";
import Charts from "../components/Charts";

const Home = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.usersList);
  const { user } = useSelector((state) => state.userData);
  const [task, settask] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [taskLoading, settaskLoading] = useState(true);
  const [statusVisibility, setStatusVisibility] = useState({});
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [completedTasksPerMonth, setCompletedTasksPerMonth] = useState({});
  const [orders, setOrders] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [kpi, setKpi] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [KPI, setKPI] = useState(0);

  const requestTaskData = async () => {
    try {
      let request = await fetch("http://localhost:3005/assigned_tasks");
      let response = await request.json();

      const completedTasksPerMonth = response.reduce((acc, task) => {
        if (task.status === "completed") {
          const month = moment(task.due_date).format("MMMM");
          if (!acc[month]) acc[month] = 0;
          acc[month]++;
        }
        return acc;
      }, {});

      settask(response);
      setCompletedTasksPerMonth(completedTasksPerMonth);
    } catch (err) {
      console.error("Failed Fetching: ", err);
    } finally {
      settaskLoading(false);
    }
  };

  const requestStatisticsData = async () => {
    try {
      let ordersRequest = await fetch("http://localhost:3005/orders");
      let ordersResponse = await ordersRequest.json();
      setOrders(ordersResponse);

      let salariesRequest = await fetch("http://localhost:3005/salaries");
      let salariesResponse = await salariesRequest.json();
      setSalaries(salariesResponse);

      let kpiRequest = await fetch("http://localhost:3005/kpi");
      let kpiResponse = await kpiRequest.json();
      setKpi(kpiResponse);

      let reviewsRequest = await fetch("http://localhost:3005/reviews");
      let reviewsResponse = await reviewsRequest.json();
      setReviews(reviewsResponse);
    } catch (err) {
      console.error("Failed Fetching: ", err);
    }
  };

  const filterData = useMemo(
    () => task.filter((item) => item.status === "completed").length,
    [task]
  );

  useEffect(() => {
    dispatch(userListFetch());
    requestTaskData();
    requestStatisticsData();
  }, [dispatch]);
  console.log("orders: ", orders);

  useEffect(() => {
    const totleSum = orders.reduce((sum, item) => sum + item.total_price, 0);
    setKPI((totleSum / 100) * 2);
  }, [orders]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setSearchLoading(true);
      const timeoutId = setTimeout(() => {
        setSearchLoading(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRequest = await fetch("http://localhost:3005/orders");
        const ordersResponse = await ordersRequest.json();
        setOrders(ordersResponse);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleStatusVisibility = (taskId) => {
    setStatusVisibility((prevVisibility) => ({
      ...prevVisibility,
      [taskId]: !prevVisibility[taskId],
    }));
  };

  const handleSwipe = async (id, newStatus) => {
    if (!id) {
      console.error("Invalid task ID");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3005/assigned_tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update task with ID ${id}`);
      }

      // Update the task status locally
      const updatedTasks = task.map((t) =>
        t.task_id === id ? { ...t, status: newStatus } : t
      );
      settask(updatedTasks);
    } catch (err) {
      console.error("Failed Updating: ", err);
    }
  };

  const handleDragEnd = (taskId) => {
    setStatusVisibility((prevVisibility) => ({
      ...prevVisibility,
      [taskId]: false,
    }));
  };

  

  const handlers = useSwipeable({
    onSwipedUp: () => setSwipeDirection("up"),
    onSwipedDown: () => setSwipeDirection("down"),
    onSwiped: () => setSwipeDirection(null),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="container mx-auto w-full p-5 overflow-hidden ">
      {status === "loading" && (
        <div className="text-blue-500 font-serif fixed top-1/2 left-1/2 translate-x-[200%]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <div className="flex items-center justify-between gap-5">
            <div className="bg-base-300 relative rounded-2xl flex items-center text-right justify-between text-primary p-5 flex-1 min-h-32 border-2 border-primary border-opacity-70 shadow-sky-400 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              <div>
                <p className="text-primary font-bold">My Orders:</p>
                <p className="text-2xl">{orders.length}</p>
              </div>
              <span className="badge badge-accent font-bold absolute -top-2 -right-4">
                {moment().format("MMMM")}
              </span>
            </div>
            <div className="bg-base-300 items-center text-primary flex justify-between relative rounded-2xl p-5 flex-1 min-h-32 border-2 border-primary border-opacity-70 shadow-sky-400 shadow-md">
              <span className="badge badge-accent font-bold absolute -top-2 -right-4">
                {moment().format("MMMM")}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>

              <div className="flex flex-col text-right">
                <p className="font-bold">My fixed salary</p>
                <p className="text-2xl">${1400} </p>
                <sub className="text-xs text-accent">in month</sub>
              </div>
            </div>
            <div className="bg-base-300 items-center relative text-primary flex justify-between rounded-2xl p-5 flex-1 min-h-32 border-2 border-primary border-opacity-70 shadow-sky-400 shadow-md">
              <span className="badge badge-accent font-bold absolute -top-2 -right-4">
                {moment().format("MMMM")}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <div className="flex flex-col text-right">
                <p className="font-bold">KPI</p>
                <p className="text-2xl">${KPI}</p>
                <span className="text-xs text-accent">in month</span>
              </div>
            </div>
            <div className="bg-base-300 flex relative items-center justify-between text-primary rounded-2xl p-5 flex-1 min-h-32 border-2 border-primary border-opacity-70 shadow-sky-400 shadow-md">
              <span className="badge badge-accent font-bold absolute -top-2 -right-4">
                {moment().format("MMMM")}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <div className="flex flex-col text-right">
                <p>Bad Feedbacks:</p>
                <p className="text-2xl">{4}</p>
                <p className="text-accent text-xs">in month</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between w-full bg-base-200 p-5 rounded-lg flex-col">
              <div className="flex justify-between items-center">
                <p className="text-lg text-accent">
                  Today`s Tasks:{" "}
                  {task.length <= 0 ? (
                    <span className="text-error">{task.length}</span>
                  ) : (
                    <span className="text-success">{task.length}</span>
                  )}
                </p>
                <p className="text-lg text-accent">
                  Completed Tasks:{" "}
                  {filterData <= 0 ? (
                    <span className="text-error">{filterData}</span>
                  ) : (
                    <span className="text-success">{filterData}</span>
                  )}
                </p>
              </div>

              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                className="w-full py-4"
                {...handlers}
              >
                {task.map((item) => (
                  <SwiperSlide
                    key={item.task_id} // Use task_id as the key
                    className={`w-full relative rounded-lg shadow-l group h-96 ${
                      swipeDirection === "up"
                        ? "bg-green-500 bg-opacity-45"
                        : swipeDirection === "down"
                        ? "bg-red-500 "
                        : "bg-gradient-to-r " +
                          (item.from === "CEO"
                            ? "from-fuchsia-500 to-error shadow-red-400 shadow-xl"
                            : "from-blue-500 to-teal-500")
                    } mt-5`}
                  >
                    <div className="w-full max-w-md p-3 rounded-lg text-light">
                      <div className="text-xs w-full flex justify-between">
                        <p className={`text-md font-semibold`}>
                          From:{" "}
                          <span
                            className={`${
                              item.from === "Branch Manager"
                                ? "text-warning"
                                : item.from === "CEO"
                                ? "text-error"
                                : "text-white"
                            }`}
                          >
                            {item.from}
                          </span>
                        </p>
                        <p
                          className="text-md mt-1 font-bold"
                          onClick={() => toggleStatusVisibility(item.task_id)}
                        >
                          Status:{" "}
                          <span
                            className={
                              item.status === "completed"
                                ? "text-success"
                                : "text-error"
                            }
                          >
                            {item.status}
                          </span>
                        </p>
                      </div>
                      <p className="text-md mt-1 flex flex-col ">
                        <span className="text-sm">Task:</span>
                        <span className="bg-warning text-warning-content text-xs overflow-x-hidden overflow-y-auto h-12 rounded-lg p-1 ">
                          {item.description}
                        </span>
                      </p>
                      <div className="flex w-full mt-3 text-xs">
                        <div className="card bg-base-300 flex flex-col items-center justify-center gap-2 h-14 flex-grow place-items-center">
                          <span className="">Task Started: </span>
                          <span>{item.due_date}</span>
                        </div>
                        <div className="divider divider-horizontal">OR</div>
                        <div className="card bg-base-300 flex flex-col items-center justify-center gap-2 rounded-box h-14 flex-grow place-items-center">
                          <span
                            className={`${
                              moment()
                                .add(item.dead_line, "days")
                                .calendar()
                                .includes("Tomorrow")
                                ? "text-error animate-pulse"
                                : "text-white"
                            }`}
                          >
                            Dead Line:
                          </span>
                          <span
                            className={`${
                              moment()
                                .add(item.dead_line, "days")
                                .calendar()
                                .includes("Tomorrow")
                                ? "text-error animate-pulse"
                                : "text-white"
                            }`}
                          >
                            {moment().add(item.dead_line, "days").calendar()}
                          </span>
                        </div>
                      </div>

                      {statusVisibility[item.task_id] && (
                        <div className="bg-slate-900 w-full absolute top-0 right-0 h-full bg-opacity-55 mt-5 flex items-center justify-center">
                          <DraggableButton
                            onDragEnd={() => handleDragEnd(item.id)}
                            onSwipe={(newStatus) => {
                              if (newStatus) {
                                handleSwipe(item.id, newStatus);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className=" w-12/12 bg-base-200 mt-7">
            <div className="xz">
              <Charts completedTasksPerMonth={completedTasksPerMonth} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
