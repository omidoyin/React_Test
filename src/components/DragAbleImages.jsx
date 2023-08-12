import React, { useEffect, useState,useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DragAbleImages = ({ datalist, index, moveImage }) => {
  const ref = useRef(null)
    
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "div",
    item:{id:datalist.id, index},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),

    }),
  }));
   
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "div",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
  const dragIndex = item.index;
  const hoverIndex = index;
  
  if (dragIndex === hoverIndex) {
              return;
  }
  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
       return;
  }
  
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
  }
  
  moveImage(dragIndex, hoverIndex);
  
  item.index = hoverIndex;
  
  }
  });

drag(drop(ref))

  return (
   
     
    <div
    onClick={()=>{console.log(index);}}
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className=" flex flex-row items-center border-2 border-gray-700 bg-black w-[90%] h-25  rounded-xl  mt-5 md:h-40 cursor-pointer"
    >
      <p className=" pr-3 pl-4 text-slate-300">{index}</p>
      <div className="img_div">
        <img src={datalist.photo} alt="" className=" object-cover rounded-md" />
      </div>
      <p className="w-1/2 mr-10 text-slate-300">{datalist.title}</p>
      <p className=" pr-9 text-lime-800">{datalist.username} </p>
    </div>
  );
};

export default DragAbleImages;
