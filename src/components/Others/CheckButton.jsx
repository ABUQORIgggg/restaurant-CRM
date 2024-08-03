import { motion } from "framer-motion";
import { useState, useRef } from "react";

const DraggableButton = ({ onDragEnd, onSwipe }) => {
  const [icon, setIcon] = useState('⬆️');
  const constraintsRef = useRef(null);

  const handleDrag = (event, info) => {
    // Update icon based on the drag position
    if (info.point.y < 320) {
      setIcon('⬆️');
    } else if (info.point.y > 320) {
      setIcon('⬇️');
    }
  };

  const handleDragEnd = (event, info) => {
    // Call onSwipe with appropriate action based on final position
    if (info.point.y < 320) {
      onSwipe('completed'); // Swipe Up
    } else if (info.point.y > 320) {
      onSwipe('denied'); // Swipe Down
    } else {
      onSwipe(null); // Reset if not swiped enough
    }
    
    // Call onDragEnd to hide button or perform any other action
    if (onDragEnd) {
      onDragEnd();
    }
  };

  return (
    <div ref={constraintsRef} className="relative w-full h-full overflow-hidden">
      <motion.div
        drag="y"
        dragConstraints={constraintsRef}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className={`draggable-button bg-${icon === '⬇️' ? 'red-500' : 'green-500'} text-white p-4 rounded-full cursor-pointer`}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {icon}
      </motion.div>
    </div>
  );
};

export default DraggableButton;
