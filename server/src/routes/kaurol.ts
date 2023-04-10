import express from 'express';
import { getNextSuggestion, getRandomCharacter } from '../controllers/kaurol';

export const kaurolRouter = express.Router();

kaurolRouter.get('/', getNextSuggestion);
kaurolRouter.get('/character', getRandomCharacter);
