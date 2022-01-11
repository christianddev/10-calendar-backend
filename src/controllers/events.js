const { response } = require("express");

const Event = require("../models/Event");

const getEvent = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      msg: {
        events,
      },
    });
  } catch (error) {
    console.log("error - getEvent(): ", error);
    res.status(500).json({
      ok: false,
      msg: {
        error: "contact the administrator",
      },
    });
  }
};

const createEvent = async (req, res = response) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;
    await event.save();

    return res.status(200).json({
      ok: true,
      msg: {
        event,
      },
    });
  } catch (error) {
    console.log("error - createEvent(): ", error);
    res.status(500).json({
      ok: false,
      msg: {
        error: "contact the administrator",
      },
    });
  }
};

const updateEvent = async (req, res = response) => {
  try {
    const { id } = req.params;
    const uid = req.uid;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: {
          error: "event not found",
        },
      });
    }

    if (event.user?.toString() !== uid) {
      return res.status(401).json({
        ok: true,
        msg: {
          error: "you do not have permission to edit this event",
        },
      });
    }

    const update = { ...req.body, user: uid };
    const eventUpdated = await Event.findByIdAndUpdate(id, update, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: {
        eventUpdated,
      },
    });
  } catch (error) {
    console.log("error - updateEvent(): ", error);
    res.status(500).json({
      ok: false,
      msg: {
        error: "contact the administrator",
      },
    });
  }
};

const deleteEvent = async (req, res = response) => {
  try {
    const { id } = req.params;
    const uid = req.uid;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: {
          error: "event not found",
        },
      });
    }

    if (event.user?.toString() !== uid) {
      return res.status(401).json({
        ok: true,
        msg: {
          error: "you do not have permission to delete this event",
        },
      });
    }

    const eventDeleted = await Event.findByIdAndDelete(id, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: {
        eventDeleted,
      },
    });
  } catch (error) {
    console.log("error - deleteEvent(): ", error);
    res.status(500).json({
      ok: false,
      msg: {
        error: "contact the administrator",
      },
    });
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
