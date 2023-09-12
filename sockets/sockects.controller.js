const TicketControl = require("../models/ticket-control");
const tickeControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", tickeControl.last);

  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = tickeControl.nextTicket();
    callback(nextTicket);

    // TODO: new ticket
  });

  socket.on("answer-ticket", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        msg: "Desk is require",
      });
    }

    const ticket = tickeControl.answerTicket(desk);

    // TODO: Push last 4 notifications

    if (!ticket) {
      return callback({
        ok: false,
        msg: "No have tickets",
      });
    }

    return callback({
      ok: true,
      ticket,
    });
  });
};

module.exports = {
  socketController,
};
