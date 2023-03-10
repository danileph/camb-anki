export interface DefinitionType {
  content: string;
  lvl: string;
  translate: string;
  examples: string[];
}

export interface UseCaseType {
  content: string;
  definition: DefinitionType[];
}

export interface VerbFormsType {
  presentParticiple: string;
  pastTense: string;
  pastParticiple: string;
}

export interface WordType {
  word: string;
  partOfspeech: string;
  formality: string;
  verbForms: VerbFormsType;
  uk: {
    transcription: string;
    audio: string;
  };
  us: {
    transcription: string;
    audio: string;
  };
  useCases: UseCaseType[];
}
