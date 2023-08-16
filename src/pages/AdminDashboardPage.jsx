import React, { useCallback, useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import DragAbleImages from "../components/DragAbleImages";

import update from "immutability-helper";
const url =
  " https://www.figma.com/file/veiESwD61KJBa7BpEHtbdl/react-task-2?node-id=1086%3A15525";

const AdminDashboardPage = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  let sdk = new MkdSDK();
  let limit = 10;
  let payload = {};
  useEffect(() => {
    const fetch = async () => {
      const videoList = await sdk.apiPaginate(payload, page, limit);

      setTotalCount(videoList.total / limit);
      setData(videoList.list);
    };
    fetch();
  }, [page]);

  const togglePage = (newpage) => {
    if (newpage >= 1 && newpage <= totalCount) {
      setPage(newpage);
    } else {
      setPage(1);
    }
  };

  const renderCard = useCallback((card, index) => {
    return (
      <DragAbleImages
        key={card.id}
        index={index}
        id={card.id}
        img={card.photo}
        title={card.title}
        username={card.username}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full  p-9 bg-black relative container">
        <h2 className=" text-3xl p-6 flex justify-start absolute left-0 top-0 z-10 text-gray-300">
          Dashboard
        </h2>
        <div className=" flex flex-row items-center justify-between  border-gray-700 bg-black w-[76%] h-fit  rounded-xl  mt-20 md:h-fit ">
          <p className=" pl-10 text-slate-300">#</p>
          <p className=" mr-10 text-slate-300">Title</p>
          <p className=" pr-9 mr-20 text-slate-300">Author</p>
        </div>
        {<div>{data.map((card, i) => renderCard(card, i))}</div>}

        <div className=" flex space-x-4 mt-7">
          <button
            className="border-2 p-3 bg-black-600 rounded-lg text-gray-200"
            onClick={() => {
              togglePage(page - 1);
            }}
          >
            prev
          </button>
          <button
            className="border-2 p-3 bg-black-600 rounded-lg text-gray-200"
            onClick={() => {
              togglePage(page + 1);
            }}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
