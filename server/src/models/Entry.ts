import mongoose, { Schema } from 'mongoose';
import { ICharacter, IEntry, ILocation } from '../../../shared/types/entry';

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

const LocationSchema = new Schema({
  parent: { type: Schema.Types.ObjectId, ref: 'Entry' },
  locationType: {
    type: String,
    enum: [
      'Planet',
      'City',
      'Region',
      'Nation',
      'Landmark',
      'Continent',
      'Building',
      'Natural Landmark',
    ],
    required: true,
    validate: {
      validator: async function () {
        const count = await (this.constructor as any).countDocuments({
          locationType: 'Planet',
        });
        return count === 0;
      },
      message: 'There can only be one Planet document in the collection',
    },
  },
});

export const EntryModel = mongoose.model<IEntry>('Entry', EntrySchema);
export const CharacterModel = EntryModel.discriminator<ICharacter>(
  'Character',
  CharacterSchema
);
export const LocationModel = EntryModel.discriminator<ILocation>(
  'Location',
  LocationSchema
);
