import express from 'express';

import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from '../controllers/location';

export const locationRouter = express.Router();

locationRouter.post('/', createLocation);
locationRouter.get('/', getAllLocations);
locationRouter.get('/:id', getLocationById);
locationRouter.put('/:id', updateLocation);
locationRouter.delete('/:id', deleteLocation);
