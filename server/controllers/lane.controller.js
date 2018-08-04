import uuid from 'uuid';

import Lane from '../models/lane';
import Note from '../models/note';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.note = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    const noteIds = lane.notes.map(note => note.id);
    Note.remove({ id: { $in: noteIds } }).exec(err => {
      if (err) {
        res.status(500).send(err);
      }
      lane.remove(() => {
        res.status(200).end();
      });
    });
  });
}

export function editName(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.name = req.body.name;
    lane.save((err, laneSaved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(laneSaved);
    });
  });
}
