export interface SearchRes {
  facet_counts: unknown[];
  found: number;
  hits: Hit[];
  out_of: number;
  page: number;
  request_params: RequestParams;
  search_cutoff: boolean;
  search_time_ms: number;
}

export interface Hit {
  document: Document;
  highlight: PurpleHighlight;
  highlights: HighlightElement[];
  text_match: number;
  text_match_info: TextMatchInfo;
}

export interface Document {
  contents: string;
  id: string;
  title: string;
  uri: string;
}

export interface PurpleHighlight {
  contents: Contents;
  title: Contents;
}

export interface Contents {
  matched_tokens: string[];
  snippet: string;
}

export interface HighlightElement {
  field: string;
  matched_tokens: string[];
  snippet: string;
}

export interface TextMatchInfo {
  best_field_score: string;
  best_field_weight: number;
  fields_matched: number;
  score: string;
  tokens_matched: number;
}

export interface RequestParams {
  collection_name: string;
  per_page: number;
  q: string;
}
