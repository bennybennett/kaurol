export interface ICharacterRelationship extends Document {
  _id?: string;
  relatedCharacter: string;
  relationshipType: string;
}

export interface IEntry extends Document {
  _id: string;
  title: string;
  description: string;
  entryType: string;
}

export interface ICharacter extends IEntry {
  personality: string;
  relationships: ICharacterRelationship[];
}
