// HTML Ref
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const buttonCreate = document.querySelector("button");

const socketClient = io();

socketClient.on("connect", () => {
  buttonCreate.disabled = false;
});

socketClient.on("disconnect", () => {
  buttonCreate.disabled = true;
});

socketClient.on("last-ticket", (lastTicket) => {
  lblNuevoTicket.innerText = `Ticket ${lastTicket}`;
});

buttonCreate.addEventListener("click", () => {
  socketClient.emit("next-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
