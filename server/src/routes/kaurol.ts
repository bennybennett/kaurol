import express from 'express';
import { getNextSuggestion } from '../controllers/kaurol';

export const kaurolRouter = express.Router();

kaurolRouter.get('/', getNextSuggestion);
