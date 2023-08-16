import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DragAbleImages = ({ id, img, index, title, username, moveCard }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "div",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // call the moveCard funstion with the two indices
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "div",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      onClick={() => {}}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className=" flex flex-row items-center border-2 border-gray-700 bg-black w-[100%] h-25  rounded-xl  mt-5 md:h-40 cursor-pointer"
    >
      <p className=" pr-3 pl-4 text-slate-300">{index + 1}</p>
      <div className="img_div">
        <img src={img} alt="" className=" object-cover rounded-md" />
      </div>
      <p className="w-1/2 mr-10 text-slate-300">{title}</p>
      <p className=" pr-9 text-lime-800">{username} </p>
    </div>
  );
};

export default DragAbleImages;
