import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const DragAbleImages = ({ datalist }) => {
    const[board,setBoard]=useState([])
    useEffect(()=>{
        setBoard(datalist)
    },[])
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "div",
    item:{id:datalist.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'div',
    // Props to collect
    drop:(item)=>addImage(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))
  const addImage =(id)=>{
    console.log(id);
    const image = board?.filter(data=> id ===data.id)
    setBoard([image[0]])
    // setBoard(board=>[...board, image[0]])
  }

  return (
   
     
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className=" flex flex-row items-center border-2 border-gray-700 bg-black w-[90%] h-25  rounded-xl  mt-5 md:h-40 cursor-pointer"
    >
      <p className=" pr-3 pl-4 text-slate-300">{board.id}</p>
      <div className="img_div">
        <img src={board.photo} alt="" className=" object-cover rounded-md" />
      </div>
      <p className="w-1/2 mr-10 text-slate-300">{board.title}</p>
      <p className=" pr-9 text-lime-800">{board.username} </p>
    </div>
  );
};

export default DragAbleImages;
