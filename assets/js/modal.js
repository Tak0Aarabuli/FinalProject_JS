class Modal {
  constructor(type, title = null) {
    this.type = type;
    this.modalId = `${type}Modal`;
    this.title = title || (type === "success" ? "Success" : "Error");

    this.createModal();

    this.modal = document.getElementById(this.modalId);
    this.messageElement = this.modal.querySelector(".modal-message");
    this.titleElement = this.modal.querySelector(".modal-title");
    this.closeButton = this.modal.querySelector(".close");

    this.modal.style.display = "none";

    this.closeButton.addEventListener("click", () => this.close());

    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  createModal() {
    const modalHTML = `
        <div id="${this.modalId}" class="modal">
          <div class="modal-content ${this.type}">
            <span class="close">&times;</span>
            <h2 class="modal-title">${this.title}</h2>
            <p class="modal-message">Message goes here...</p>
          </div>
        </div>
      `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }
  open(message, title = null) {
    if (title) {
      this.titleElement.innerText = title;
    }
    this.messageElement.innerText = message;
    this.modal.style.display = "flex";
  }

  close() {
    this.modal.style.display = "none";
  }
}

window.Modal = Modal;
