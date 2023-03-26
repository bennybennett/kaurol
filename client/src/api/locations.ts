// src/api/characters.ts
import axios from 'axios';
import qs from 'qs';
import { ICharacter } from '../../../shared/types/entry';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllCharacters = async (): Promise<ICharacter[]> => {
  try {
    const response = await axios.get<ICharacter[]>(`${API_URL}/characters`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
