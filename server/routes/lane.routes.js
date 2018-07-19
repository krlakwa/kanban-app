import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Get all lines

router.route('/lanes').get(LaneController.getLanes);

// Add a new Lane

router.route('/lanes').post(LaneController.addLane);

// Delete a line by laneId

router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// Edit lane name

router.route('/lanes/:laneId').put(LaneController.editName);


export default router;
