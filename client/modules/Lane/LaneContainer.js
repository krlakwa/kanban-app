import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import * as laneActions from './LaneActions';
import { updateLaneRequest, deleteLaneRequest, moveBetweenLanes } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import Lane from './Lane';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});

const mapDispatchToProps = {
  ...laneActions,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes,
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;

    if (!targetProps.lane.notes.length) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
