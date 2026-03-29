
export interface ThumbnailConfig {
  title: string;
  headshot: string; // base64
  aspectRatio: "9:16";
}

export interface GenerationState {
  loading: boolean;
  resultUrl: string | null;
  error: string | null;
  progress: string;
}
