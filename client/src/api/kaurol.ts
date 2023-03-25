// src/api/characters.ts
import axios from 'axios';
import { ISuggestion } from '../../../shared/types/kaurol';

const API_URL = process.env.REACT_APP_API_URL;

export const getSuggestions = async (): Promise<ISuggestion[]> => {
  try {
    const response = await axios.get<ISuggestion[]>(`${API_URL}/kaurol`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
