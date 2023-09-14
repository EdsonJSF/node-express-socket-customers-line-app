// HTML Ref
const lblDesk = document.querySelector("h1");
const lblTicket = document.querySelector("small");
const lblAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");
const buttonAttend = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Desk is require");
}

const desk = searchParams.get("escritorio");
lblDesk.innerText = desk;

const socketClient = io();

socketClient.on("connect", () => {
  lblAlert.classList.add("d-none");
  buttonAttend.disabled = false;
});

socketClient.on("disconnect", () => {
  lblAlert.innerText = "Disconnected";
  lblAlert.classList.remove("d-none");
  buttonAttend.disabled = true;
});

socketClient.on("total-tickets", (totalTickets) => {
  if (totalTickets) {
    lblPendientes.classList.remove("d-none");
    lblPendientes.innerText = totalTickets;
    lblAlert.classList.add("d-none");
  } else {
    lblAlert.classList.remove("d-none");
    lblPendientes.classList.add("d-none");
  }
});

buttonAttend.addEventListener("click", () => {
  socketClient.emit("answer-ticket", { desk }, ({ ok, msg, ticket }) => {
    if (!ok) {
      lblAlert.innerText = msg;
      lblTicket.innerText = "....";
      lblAlert.classList.remove("d-none");
      return;
    }

    lblTicket.innerText = `Ticket ${ticket.number}`;
  });
});
