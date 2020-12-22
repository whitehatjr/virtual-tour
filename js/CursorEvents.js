AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function() {
    this.handleClickEvents();
    this.handleMouseCenterEvents();
    this.handleMouseLeaveEvents();
  },
  handleClickEvents: function() {
    //  Click Events
    this.el.addEventListener("click", evt => {
      const earthEl = document.querySelector("#earth-model");
      const { state } = earthEl.getAttribute("tour");
      if (state === "initial_state") {
        this.handleInitialState();
      }

      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = [
          "taj-mahal",
          "budapest",
          "new-york-city",
          "eiffel-tower"
        ];
        if (placesId.includes(id)) {
          earthEl.setAttribute("tour", {
            state: "view",
            selectedCard: id
          });
        }
      }

      if (state === "view") {
        this.handleViewState();
      }
      if (state === "change-view") {
        this.handleViewState();
      }
    });
  },
  handleInitialState: function() {
    const id = this.el.getAttribute("id");
    if (id === "earth-model") {
      this.el.setAttribute("tour", {
        state: "places-list"
      });
      const cursorEl = document.querySelector("#camera-cursor");
      cursorEl.setAttribute("position", { x: 0, y: 0, z: -35 });
      cursorEl.setAttribute("geometry", {
        radiusInner: 1.5,
        radiusOuter: 2
      });
    }
  },
  handleMouseCenterEvents: function() {
    // Mouse Center Events
    this.el.addEventListener("mouseenter", () => {
      const earthEl = document.querySelector("#earth-model");
      const { state } = earthEl.getAttribute("tour");
      if (state === "places-list") {
        this.handlePlacesListState();
      }
    });
  },
  handlePlacesListState: function() {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
      });
      this.el.setAttribute("material", {
        opacity: 1
      });
    }
  },
  handleMouseLeaveEvents: function() {
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      const earthEl = document.querySelector("#earth-model");
      const { state } = earthEl.getAttribute("tour");
      if (state === "places-list") {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              opacity: 0.4
            });
          }
        }
      }
    });
  },
  handleViewState: function() {
    const el = this.el;
    const id = el.getAttribute("id");

    const placesContainer = document.querySelector("#places-container");
    const { selectedItemId } = placesContainer.getAttribute("cursor-listener");

    const morePlacesId = ["place-1", "place-2", "place-3", "place-4"];
    if (morePlacesId.includes(id)) {
      const earthEl = document.querySelector("#earth-model");
      earthEl.setAttribute("tour", {
        state: "change-view"
      });
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `../assets/360_images/${selectedItemId}/${id}.jpg`
      });
    }
  }
});
