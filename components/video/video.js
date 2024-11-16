class Video extends HTMLElement {
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
      const video = this.shadowRoot.querySelector("video");
      if (video) {
        video.style.width = newValue;
      }
    }
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="container">
      <video id="${this.tag}" src="${this.source}" controls style="width: ${this.width || "50"}%;">
        Your browser does not support the video tag.
      </video>
      <sub>${this.subtitle}</sub>
    </div>
    <style>
      :host {
        display: block;
        text-align: center;
      }

      .container {
        text-align: center;
      }

      sub {
        display: block;
        font-size: 1rem;
        font-style: italic;
        margin-top: 8px;
      }

      video {
        display: block;
        margin: auto;
      }
    </style>
  `;

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(div);
  }
}

customElements.define("video-component", Video);