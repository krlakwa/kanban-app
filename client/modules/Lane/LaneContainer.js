import { connect } from 'react-redux';
import * as laneActions from './LaneActions';
import { updateLaneRequest, deleteLaneRequest } from './LaneActions';
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
