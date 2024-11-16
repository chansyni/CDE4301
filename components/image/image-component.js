class ImageComponent extends HTMLElement {
  static get observedAttributes() {
    return ["tag", "source", "subtitle", "width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
    if (name === "width" && this.shadowRoot) {
      const container = this.shadowRoot.querySelector(".image-container");
      if (container) {
            container.style.width = `${newValue}%`;
      }
    }
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="image-container" style="width: ${this.width}%;">
      <img id="${this.tag}" src="${this.source}" alt="${this.subtitle}">
      <sub>${this.subtitle}</sub>
    </div>
    <style>
      :host {
        display: block;
        text-align: center;
      }

      .image-container {
        display: inline-block;
        text-align: center;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      sub {
        display: block;
        font-size: 1rem;
        font-style: italic;
        margin-top: 8px;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("image-component", ImageComponent);
