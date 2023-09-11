const TicketControl = require("../models/ticket-control");
const tickeControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", tickeControl.last);

  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = tickeControl.nextTicket();
    callback(nextTicket);

    // TODO: new ticket
  });
};

module.exports = {
  socketController,
};
