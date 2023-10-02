import { useState, useEffect, useContext } from "react";
import { WinContext } from "../../App";
import marioImg from "../../images/mario.png";
import blastoiseImg from "../../images/blastoise.png";
import cronoImg from "../../images/crono.png";
import gandalfImg from "../../images/gandalf.png";
import shrekImg from "../../images/shrek.png";
import genieImg from "../../images/genie.png";
import waldoImg from "../../images/waldo.png";
import rickImg from "../../images/rick.png";
import edImg from "../../images/ed.png";

const originalDimensions = {
  prehisoria: { width: 1905, height: 1701 },
  isord: { width: 1905, height: 1858 },
  memesupreme: { width: 1905, height: 1905 },
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
  const [targetBox, setTargetBox] = useState({
    oldX: 0,
    oldY: 0,
    xPos: 0,
    yPos: 0,
    clientWidth: 0,
    clientHeight: 0,
  });
  const [characters, setCharacters] = useState(charactersData[world]);
  const [dbPositions, setDBPositions] = useState();
  const [modal, setModal] = useState({
    active: false,
    xPosition: 0,
    yPosition: 0,
  });
  const [marker, setMarker] = useState({
    1: { status: "hidden", xPosition: 0, yPosition: 0 },
    2: { status: "hidden", xPosition: 0, yPosition: 0 },
    3: { status: "hidden", xPosition: 0, yPosition: 0 },
  });
  const [feedback, setFeedBack] = useState({
    wrongAnswer: false,
    correctAnswer: { status: false, name: "" },
  });
  const { gameWon, setGameWon } = useContext(WinContext);

  // Reset Game Win on component mount
  useEffect(() => {
    setGameWon(false);
  }, []);

  // Fetch characters' positions from database
  useEffect(() => {
    fetch(`https://photo-tag-api.fly.dev/${world}`, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }

        return response.json();
      })
      .then((response) => {
        setDBPositions(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [world]);

  // Remove feedback popup after timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: false, name: "" },
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [feedback.wrongAnswer, feedback.correctAnswer.status]);

  // Remove target box and modal on window resize
  useEffect(() => {
    window.addEventListener("resize", resetModalState);

    return () => {
      window.removeEventListener("resize", resetModalState);
    };
  });

  const handleImgClick = (e) => {
    if (modal.active === true) {
      resetModalState();
      return;
    }

    let height = e.target.clientHeight;
    let width = e.target.clientWidth;
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    let xTargetPos = x;
    let yTargetPos = y;

    setTargetBox({
      ...targetBox,
      oldX: x,
      oldY: y,
    });

    // if both width and height of modal exceeds image right and bottom edges
    if (x + 190 > width && y + 180 > height) {
      x += 50;
      y += 25;
    }

    // if both width and height of modal exceeds image left and top edges
    if (x - 190 < 0 && y - 180 < 0) {
      x += 25;
    }

    // if width of modal exceeds image right edge
    if (x + 190 > width) {
      // Change modal position by subtracting both its width and target box width.
      x -= 250;
    }

    // if height of modal exceeds image bottom edge
    if (y + 180 > height) {
      // Change modal position by subtracting both its height and target box height.
      y -= 230;
      x -= 50;
    }

    // if height of modal exceeds image top edge
    if (y - 180 < 0) {
      y += 50;
      x -= 50;
    }

    /* Subtract X and Y positions by half of the Target Box's dimensions to
      ensure that the clicked position is centered within the Target Box. */
    xTargetPos -= 25;
    yTargetPos -= 25;

    // Add width of targeting box to add gap between modal and target box
    x += 50;

    setTargetBox((prev) => ({
      ...prev,
      xPos: xTargetPos,
      yPos: yTargetPos,
      clientWidth: width,
      clientHeight: height,
    }));

    setModal({
      active: true,
      xPosition: x,
      yPosition: y,
    });
  };

  // Get character coordinates form the database
  const getDatabaseCoordinates = (characterName) => {
    for (let i = 0; i < dbPositions.length; i++) {
      const obj = dbPositions[i];

      if (obj.characterName === characterName) {
        const originalWidth = originalDimensions[world].width;
        const originalHeight = originalDimensions[world].height;
        const adjustedX = Math.round(
          (obj.positionX / originalWidth) * targetBox.clientWidth
        );
        const adjustedY = Math.round(
          (obj.positionY / originalHeight) * targetBox.clientHeight
        );

        return { positionX: adjustedX, positionY: adjustedY };
      }
    }
  };

  const isCorrectPosition = (dbCoordinates) => {
    const { positionX, positionY } = dbCoordinates;
    const rangeX = Math.abs(positionX - targetBox.oldX);
    const rangeY = Math.abs(positionY - targetBox.oldY);

    if (rangeX <= 25 && rangeY <= 25) {
      return true;
    } else {
      return false;
    }
  };

  const handlePopupClick = (e) => {
    const characterName = e.target.id;
    const dbCoordinates = getDatabaseCoordinates(characterName);
    const correctPosition = isCorrectPosition(dbCoordinates);

    // ****** placeholder data replace with real data ********
    if (correctPosition === true) {
      // Adds feedback message
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: true, name: characterName },
      });

      const posStr = e.target.className.split(" ")[1];

      // Adds marker
      setMarker({
        ...marker,
        [posStr]: {
          status: "visible",
          xPosition: targetBox.xPos,
          yPosition: targetBox.yPos,
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

  return {
    targetBox,
    modal,
    characters,
    feedback,
    marker,
    gameWon,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  };
};

export default useWorldState;
