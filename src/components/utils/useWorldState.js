import { useState, useEffect } from "react";

const data = {
  mario: 1,
  blastoise: 2,
  crono: 3,
  gandalf: 1,
  shrek: 2,
  genie: 3,
  waldo: 1,
  rick: 2,
  ed: 3,
};

const useWorldState = () => {
  const [target, setTarget] = useState({
    xPosition: 0,
    yPosition: 0,
  });
  const [modal, setModal] = useState({
    active: false,
    xPosition: 0,
    yPosition: 0,
    heightExceeded: false,
    widthExceeded: false,
  });
  const [feedback, setFeedBack] = useState({
    wrongAnswer: false,
    correctAnswer: { status: false, name: "" },
  });
  const [marker, setMarker] = useState({
    one: { status: "hidden", xPosition: 0, yPosition: 0 },
    two: { status: "hidden", xPosition: 0, yPosition: 0 },
    three: { status: "hidden", xPosition: 0, yPosition: 0 },
  });

  useEffect(() => {
    // Remove feedback popup after timeout
    const timeout = setTimeout(() => {
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: false, name: "" },
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [feedback]);

  const handleImgClick = (e) => {
    if (modal.active) {
      resetModalState();
      return;
    }

    let height = e.target.clientHeight;
    let width = e.target.clientWidth;
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    let xExceeded = false;
    let yExceeded = false;
    let xTargetPos = x;
    let yTargetPos = y;

    // if width of modal exceeds image edge
    if (x + 200 > width) {
      // Change modal position by subtracting from it's X coordinate value.
      x -= 160;
      xExceeded = true;
      xTargetPos = x + 160;

      if (x + 200 > width) {
        x -= 20;
        xTargetPos = xTargetPos - 20;
      }
    }

    // if height of modal exceeds image edge
    if (y + 180 > height) {
      // Change modal position by subtracting from it's Y coordinate value.
      y -= 140;
      yExceeded = true;
      yTargetPos = y + 140;

      if (y + 200 > height) {
        y -= 20;
        yTargetPos = yTargetPos - 20;
      }
    }

    /* 
      Also subtract X and Y positions by half of the Target Box's dimensions to
      ensure that the clicked position is centered within the Target Box.
    */
    if (y - 20 > 0) {
      y -= 20;
      yTargetPos = yTargetPos - 20;
    }
    if (x - 20 > 0) {
      x -= 20;
      xTargetPos = xTargetPos - 20;
    }

    console.log({ x, y });
    console.log({ xTargetPos, yTargetPos });

    setTarget({
      xPosition: xTargetPos,
      yPosition: yTargetPos,
    });

    setModal({
      active: true,
      xPosition: x,
      yPosition: y,
      heightExceeded: yExceeded,
      widthExceeded: xExceeded,
    });
  };

  const handlePopupClick = (e) => {
    const characterName = e.target.id.toLowerCase();

    if (data[characterName] === 1) {
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: true, name: characterName },
      });

      // ****** placeholder data replace with real data ********
      const posString = e.target.className.split(" ")[1];

      setMarker({
        ...marker,
        [posString]: {
          status: "visible",
          xPosition: target.xPosition,
          yPosition: target.yPosition,
        },
      });
    } else {
      setFeedBack({
        wrongAnswer: true,
        correctAnswer: { status: false, name: "" },
      });
    }
  };

  // Reset to default
  const resetModalState = () => {
    setModal({
      active: false,
      xPosition: 0,
      yPosition: 0,
      heightExceeded: false,
      widthExceeded: false,
    });
  };

  return [
    modal,
    feedback,
    marker,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  ];
};

export default useWorldState;
