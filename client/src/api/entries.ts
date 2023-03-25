// src/api/characters.ts
import axios from 'axios';
import { IEntry } from '../../../shared/types/entry';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllEntries = async (): Promise<IEntry[]> => {
  try {
    const response = await axios.get<IEntry[]>(`${API_URL}/entries`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEntryById = async (id: string): Promise<IEntry> => {
  try {
    const response = await axios.get<IEntry>(`${API_URL}/entries/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
