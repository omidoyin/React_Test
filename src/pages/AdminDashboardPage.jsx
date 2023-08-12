import React, { useEffect, useState } from "react";
import update from "immutability-helper";
import MkdSDK from "../utils/MkdSDK";
import DragAbleImages from "../components/DragAbleImages";
const url =
  " https://www.figma.com/file/veiESwD61KJBa7BpEHtbdl/react-task-2?node-id=1086%3A15525";

const AdminDashboardPage = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = data[dragIndex];
    /*
      - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
      - remove the previous reference of dragged element (i.e., [dragIndex, 1])
      - here we are using this update helper method from immutability-helper package
    */
    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };

  let sdk = new MkdSDK();
  let limit = 10;
  let payload = {};
  useEffect(() => {
    const fetch = async () => {
      const videoList = await sdk.apiPaginate(payload, page, limit);

      setTotalCount(videoList.total / limit);
      setData(videoList.list);
      // console.log(videoList);

      const newdata = await sdk.check("admin");
      console.log(newdata);
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

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full  p-5 bg-black relative">
        <h2 className=" text-3xl p-3 flex justify-start absolute left-0 top-0 z-10 text-gray-300">
          Dashboard
        </h2>
        <div className=" flex flex-row justify-between items-center  w-[90%]  rounded-xl  mt-20 text-gray-600">
          <p>#</p>
          <p>Title</p>
          <p className=" pr-20">Author</p>
        </div>
        {data?.map((datalist, i) => (
          // <div
          //   className=" flex flex-row items-center border-2 border-gray-700 bg-black w-[90%] h-25  rounded-xl  mt-5 md:h-40"
          //   key={datalist.id}
          // >

          //   <p className=" pr-3 pl-4 text-slate-300">{datalist.id}</p>
          //   <div className="img_div">
          //     <img
          //       src={datalist.photo}
          //       alt=""
          //       className=" object-cover rounded-md"
          //     />
          //   </div>
          //   <p className="w-1/2 mr-10 text-slate-300">{datalist.title}</p>
          //   <p className=" pr-9 text-lime-800">{datalist.username} </p>
          // </div>
          <DragAbleImages
            key={datalist.id}
            datalist={datalist}
            index={i}
            moveImage={moveImage}
          />
        ))}
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
