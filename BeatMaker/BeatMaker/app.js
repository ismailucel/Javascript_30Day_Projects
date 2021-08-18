window.addEventListener("load", () => {  /* after the content is loaded this function is gonna run*/
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div"); /* all the divs inside pads */
  const visual = document.querySelector(".visual");
  const colors = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

  pads.forEach((pad, index) => {
    pad.addEventListener("click", function () { /* we are using normal function so we have access to the this which is gonna refer to the pad*/
      sounds[index].currentTime = 0; /* when we start clicking again it's gonna restart and play*/
      sounds[index].play();
      createBubble(index);
    });
  });

  const createBubble = index => {
    //Create bubbles
    const bubble = document.createElement("div");
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = `jump 1s ease`;
    bubble.addEventListener("animationend", function () {  /*after the animation end we gonna get rid of the bubble for performance*/
      visual.removeChild(this);
    });
  };
});
