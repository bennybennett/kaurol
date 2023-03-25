import { Request, Response } from 'express';
import { ICharacter } from '../../../shared/types/entry';
import { CharacterModel } from '../models/Entry';

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const characterData: ICharacter = req.body;
    const character = new CharacterModel(characterData);
    await character.save();
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await CharacterModel.find({});
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    const characterData: ICharacter = req.body;
    const updatedCharacter = await CharacterModel.findByIdAndUpdate(
      characterId,
      characterData,
      { new: true }
    );

    if (!updatedCharacter) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }

    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getCharacterById = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    const character = await CharacterModel.findById(characterId);

    if (!character) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }

    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addCharacterRelationship = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    const relationshipData = req.body;

    const character = await CharacterModel.findById(characterId);

    if (!character) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }

    character.relationships.push(relationshipData);
    await character.save();
    res.status(200).json(character);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    const deletedCharacter = await CharacterModel.findByIdAndDelete(
      characterId
    );

    if (!deletedCharacter) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }

    res.status(200).json(deletedCharacter);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
