import { PLUS_AND_DOT, PLUS_ONLY } from "../../constants";
import { ObjectDefinition } from "../../types";

export const normalizeableProviders: ObjectDefinition = {
    'gmail.com': {
      'cut': PLUS_AND_DOT
    },
    'googlemail.com': {
      'cut': PLUS_AND_DOT,
      'aliasOf': 'gmail.com'
    },
    'hotmail.com': {
      'cut': PLUS_ONLY
    },
    'live.com': {
      'cut': PLUS_AND_DOT
    },
    'outlook.com': {
      'cut': PLUS_ONLY
    }
  };