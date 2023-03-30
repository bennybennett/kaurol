// src/api/characters.ts
import axios from 'axios';
import { IEntry } from '../../../shared/types/entry';
import qs from 'qs';

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

export const updateEntry = async (
  id: string,
  body: object
): Promise<IEntry> => {
  console.log('updateEntry', id, body);
  try {
    const response = await axios.put<IEntry>(
      `${API_URL}/entries/${id}`,
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
