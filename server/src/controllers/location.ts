import { Request, Response } from 'express';
import { ILocation } from '../../../shared/types/entry';
import { LocationModel } from '../models/Entry';

export const createLocation = async (req: Request, res: Response) => {
  try {
    const locationData: ILocation = req.body;
    const location = new LocationModel(locationData);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const includeSublocations = req.query.sublocations === 'true';

    const locations = await LocationModel.find({});

    if (includeSublocations) {
      const locationsWithSublocationsAndParent = await Promise.all(
        locations.map(async (location) => {
          const sublocations: Partial<ILocation>[] = await LocationModel.find(
            { parent: location._id },
            { _id: 1, locationType: 1, title: 1 }
          );

          let parent: Partial<ILocation> | null = null;
          if (location.parent) {
            const parentLocation = await LocationModel.findById(
              location.parent,
              {
                _id: 1,
                locationType: 1,
                title: 1,
              }
            );
            if (parentLocation) {
              parent = parentLocation.toObject();
            }
          }

          return { ...location.toObject(), parent, sublocations };
        })
      );
      res.status(200).json(locationsWithSublocationsAndParent);
    } else {
      res.status(200).json(locations);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id;
    const locationData: ILocation = req.body;
    const updatedLocation = await LocationModel.findByIdAndUpdate(
      locationId,
      locationData,
      { new: true }
    );

    if (!updatedLocation) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id;
    const location = await LocationModel.findById(locationId);

    if (!location) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id;
    const deletedLocation = await LocationModel.findByIdAndDelete(locationId);

    if (!deletedLocation) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    res.status(200).json(deletedLocation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
