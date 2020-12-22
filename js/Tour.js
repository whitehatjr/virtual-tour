AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "initial_state" },
    selectedCard: { type: "string", default: "#card1" },
    zoomAspectRatio: { type: "number", default: 1 }
  },
  init: function() {
    this.earthEL = this.el;
    this.messageEl = document.querySelector("#message");
    this.placesContainer = document.querySelector("#places-container");
    this.cameraEl = document.querySelector("#camera");
    this.createCards();
  },
  tick: function() {
    const { state } = this.el.getAttribute("tour");
    if (state === "places-list") {
      this.hideEl([this.earthEL, this.messageEl]);
      this.unhideEl([this.placesContainer]);
    }
    //
    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function(elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  unhideEl: function(elList) {
    elList.map(el => {
      el.setAttribute("visible", true);
    });
  },
  createCards: function() {
    this.placesContainer.setAttribute("visible", false);
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "../assets/thumbnails/taj_mahal.png"
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "../assets/thumbnails/budapest.jpg"
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "../assets/thumbnails/eiffel_tower.png"
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "../assets/thumbnails/new_york_city.png"
      }
    ];
    let prevoiusXPosition = -60;
    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);
      // // Thubnail Element
      const thumbNail = this.createThumbNail(item, item.id);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function(position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#00bcd4",
      opacity: 0.4
    });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  createThumbNail: function(item, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9
    });
    entityEl.setAttribute("material", { src: item.url, opacity: 0.4 });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  createTitleEl: function(position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 60,
      color: "#fff",
      value: item.title
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    return entityEl;
  },
  showView: function() {
    const { selectedCard } = this.data;
    const skyEl = document.querySelector("#main-container");
    if (selectedCard === "taj-mahal") {
      skyEl.setAttribute("material", {
        src: "../assets/360_images/taj_east_view.jpg"
      });
      skyEl.setAttribute("rotation", { x: 0, y: -60, z: 0 });
    }

    if (selectedCard === "budapest") {
      skyEl.setAttribute("material", {
        src: "../assets/360_images/taj_front_view.jpg"
      });
    }

    if (selectedCard === "eiffel-tower") {
      skyEl.setAttribute("material", {
        src: "../assets/360_images/taj_inside_view.jpg"
      });
    }

    if (selectedCard === "new-york-city") {
      skyEl.setAttribute("material", {
        src: "../assets/360_images/taj_back_view.jpg"
      });
    }
  },
  update: function() {
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowUp") {
        if (
          (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
          (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
        ) {
          this.data.zoomAspectRatio += 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
      if (e.key === "ArrowDown") {
        if (
          (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
          (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
        ) {
          this.data.zoomAspectRatio -= 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
    });
  }
});
