AFRAME.registerComponent("startbutton", {
  init: function() {
    var cube = document
      .querySelector("a-scene")
      .sceneEl.querySelector("#next-button");

    console.log(cube);
    cube.addEventListener("click", function(evt) {
      console.log("Inside");
      cube.setAttribute("rounded", "color", "red");
    });
    cube.addEventListener("mouseup", function(evt) {
      cube.setAttribute("material", "color", "green"); //we want to change this from "blue" to "green" to avoid some bugs
    });
    cube.addEventListener("mouseenter", function(evt) {
      cube.setAttribute("material", "color", "green");
    });
    cube.addEventListener("mouseleave", function(evt) {
      cube.setAttribute("material", "color", "blue");
    });
  }
});
