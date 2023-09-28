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
  prehisoria: [
    { pos: 1, name: "Mario", image: marioImg },
    { pos: 2, name: "Blastoise", image: blastoiseImg },
    { pos: 3, name: "Crono", image: cronoImg },
  ],
  isord: [
    { pos: 1, name: "Gandalf", image: gandalfImg },
    { pos: 2, name: "Shrek", image: shrekImg },
    { pos: 3, name: "Genie", image: genieImg },
  ],
  memesupreme: [
    { pos: 1, name: "Waldo", image: waldoImg },
    { pos: 2, name: "Rick", image: rickImg },
    { pos: 3, name: "Ed", image: edImg },
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
    1: { status: "hidden", xPosition: 0, yPosition: 0 },
    2: { status: "hidden", xPosition: 0, yPosition: 0 },
    3: { status: "hidden", xPosition: 0, yPosition: 0 },
  });
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    // sets time for every 10 milliseconds
    let interval;

    if (gameWon === false) {
      interval = setInterval(() => {
        setTime((count) => count + 1);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [gameWon]);

  useEffect(() => {
    // Remove feedback popup after timeout
    const timeout = setTimeout(() => {
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: false, name: "" },
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [feedback.wrongAnswer, feedback.correctAnswer.status]);

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
    console.log(x);
    console.log(y);

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

    // ****** placeholder data replace with real data ********
    if (
      data[characterName] === 1 ||
      data[characterName] === 2 ||
      data[characterName] === 3
    ) {
      // Adds feedback message
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: true, name: characterName },
      });

      const posStr = e.target.className.split(" ")[1];
      console.log;

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
      let newArr = characters.filter((obj) => obj.name !== characterName);

      setCharacters(newArr);

      // If round completed
      if (newArr.length === 0) {
        setGameWon(true);
      }
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
    gameWon,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  ];
};

export default useWorldState;
