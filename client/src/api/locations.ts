// src/api/characters.ts
import axios from 'axios';
import { ILocation } from '../../../shared/types/entry';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllLocations = async (): Promise<ILocation[]> => {
  try {
    const response = await axios.get<ILocation[]>(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllLocationsWithSublocations = async (): Promise<
  ILocation[]
> => {
  try {
    const response = await axios.get<ILocation[]>(
      `${API_URL}/locations?sublocations=true`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
