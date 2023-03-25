export interface ISuggestion {
  message: string;
  type: string;
  _id: string;
}

export interface IOneSidedRelationshipSuggestion extends ISuggestion {
  fromCharacter: {
    name: string;
    id: string;
  };
  toCharacter: {
    name: string;
    id: string;
  };
  relationshipType: string;
}

export interface IAddMoreRelationshipsSuggestion extends ISuggestion {
  character: {
    name: string;
    id: string;
    outgoingRelationships: number;
    incomingRelationships: number;
  };
}
