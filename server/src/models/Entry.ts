import mongoose, { Schema } from 'mongoose';
import { ICharacter, IEntry } from '../../../shared/types/entry';

const EntrySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, discriminatorKey: 'entryType' }
);

const CharacterRelationshipSchema = new Schema({
  relatedCharacter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Entry',
  },
  relationshipType: { type: String, required: true },
});

const CharacterSchema = new Schema({
  personality: { type: String, required: true },
  appearance: { type: String },
  relationships: [CharacterRelationshipSchema],
});

export const EntryModel = mongoose.model<IEntry>('Entry', EntrySchema);
export const CharacterModel = EntryModel.discriminator<ICharacter>(
  'Character',
  CharacterSchema
);
