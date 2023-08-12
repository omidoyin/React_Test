import React, { useEffect, useState,useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DragAbleImages = ({ datalist, index, moveImage }) => {
  const ref = useRef(null)
    // const[board,setBoard]=useState([])
    // useEffect(()=>{
    //     setBoard(datalist)
    // },[])

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "div",
    item:{id:datalist.id, index},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),

    }),
  }));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'div',
    // Props to collect
    hover(item) { // item is the dragged element
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) { 
        return;
      }
      // If it is dragged around other elements, then move the image and set the state with position changes
      moveImage(dragIndex, hoverIndex);
      /*
        Update the index for dragged item directly to avoid flickering
        when the image was half dragged into the next
      */
      item.index = hoverIndex;
    },
    // didnt use the following
    // drop:(item)=>addImage(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

drag(drop(ref))


// didnt use this
  const addImage =(id)=>{
    console.log(id);
    const image = datalist?.filter(data=> id ===data.id)
    setBoard([image[0]])
    // setBoard(board=>[...board, image[0]])
  }

  return (
   
     
    <div
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
