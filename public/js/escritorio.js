// HTML Ref
const lblDesk = document.querySelector("h1");
const buttonAttend = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Desk require");
}

const desk = searchParams.get("escritorio");
lblDesk.innerText = desk;

const socketClient = io();

socketClient.on("connect", () => {
  buttonAttend.disabled = false;
});

socketClient.on("disconnect", () => {
  buttonAttend.disabled = true;
});

socketClient.on("last-ticket", (lastTicket) => {});

buttonAttend.addEventListener("click", () => {
  // socketClient.emit("", null, (ticket) => {
  // });
});
