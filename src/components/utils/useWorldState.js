import { useState, useEffect } from "react";

import marioImg from "../../images/mario.png";
import blastoiseImg from "../../images/blastoise.png";
import cronoImg from "../../images/crono.png";
import gandalfImg from "../../images/gandalf.png";
import shrekImg from "../../images/shrek.png";
import genieImg from "../../images/genie.png";
import waldoImg from "../../images/waldo.png";
import rickImg from "../../images/rick.png";
import edImg from "../../images/ed.png";

const data = {
  Mario: 1,
  Blastoise: 2,
  Crono: 3,
  Gandalf: 1,
  Shrek: 2,
  Genie: 3,
  Waldo: 1,
  Rick: 2,
  Ed: 3,
};

const charactersData = {
  worldOne: [
    { name: "Mario", image: marioImg },
    { name: "Blastoise", image: blastoiseImg },
    { name: "Crono", image: cronoImg },
  ],
  worldTwo: [
    { name: "Gandalf", image: gandalfImg },
    { name: "Shrek", image: shrekImg },
    { name: "Genie", image: genieImg },
  ],
  worldThree: [
    { name: "Waldo", image: waldoImg },
    { name: "Rick", image: rickImg },
    { name: "Ed", image: edImg },
  ],
};

const useWorldState = (world) => {
  const [time, setTime] = useState(0);
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
  const [characters, setCharacters] = useState(charactersData[world]);
  const [feedback, setFeedBack] = useState({
    wrongAnswer: false,
    correctAnswer: { status: false, name: "" },
  });
  const [marker, setMarker] = useState({
    0: { status: "hidden", xPosition: 0, yPosition: 0 },
    1: { status: "hidden", xPosition: 0, yPosition: 0 },
    2: { status: "hidden", xPosition: 0, yPosition: 0 },
  });

  useEffect(() => {
    // sets time for every 10 milliseconds
    const interval = setInterval(() => {
      setTime((count) => count + 1);
    }, 10);

    return () => clearInterval(interval);
  }, []);

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
    const characterName = e.target.id;

    if (data[characterName] === 1) {
      // Adds feedback message
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: true, name: characterName },
      });

      // ****** placeholder data replace with real data ********
      const posStr = e.target.className.split(" ")[1];

      // Adds marker
      setMarker({
        ...marker,
        [posStr]: {
          status: "visible",
          xPosition: target.xPosition,
          yPosition: target.yPosition,
        },
      });

      // Removes character
      let newData = charactersData[world].filter(
        (obj) => obj.name !== characterName
      );

      setCharacters(newData);
    } else {
      // Adds feedback message
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
    time,
    modal,
    characters,
    feedback,
    marker,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  ];
};

export default useWorldState;
