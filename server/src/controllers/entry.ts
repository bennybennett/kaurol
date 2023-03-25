import { Request, Response } from 'express';
import { EntryModel } from '../models/Entry';

export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const entries = await EntryModel.find({});
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getEntryById = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    const entry = await EntryModel.findById(entryId);

    if (!entry) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    const deletedEntry = await EntryModel.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    res.status(200).json(deletedEntry);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
