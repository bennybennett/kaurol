import express from 'express';

import {
  getAllEntries,
  getEntryById,
  deleteEntry,
  updateEntry,
} from '../controllers/entry';

export const entryRouter = express.Router();

entryRouter.get('/', getAllEntries);
entryRouter.get('/:id', getEntryById);
entryRouter.delete('/:id', deleteEntry);
entryRouter.put('/:id', updateEntry);
