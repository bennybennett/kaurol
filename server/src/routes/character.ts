import express from 'express';

import {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  addCharacterRelationship,
  deleteCharacter,
} from '../controllers/character';

export const characterRouter = express.Router();

characterRouter.post('/', createCharacter);
characterRouter.get('/', getAllCharacters);
characterRouter.get('/:id', getCharacterById);
characterRouter.put('/:id', updateCharacter);
characterRouter.post('/:id/relationship', addCharacterRelationship);
characterRouter.delete('/:id', deleteCharacter);
