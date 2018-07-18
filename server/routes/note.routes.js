import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new note

router.route('/notes').post(NoteController.addNote);

export default router;
