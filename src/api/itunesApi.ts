import type {
  ITunesSearchResponse,
  ITunesTrackDTO,
  SearchTracksParams,
} from "../types";

const ITUNES_BASE_URL = "https://itunes.apple.com/search";
const DEFAULT_ENTITY = "song";
const DEFAULT_LIMIT = 25;

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isITunesTrackDTO = (value: unknown): value is ITunesTrackDTO => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.trackId === "number" &&
    typeof value.trackName === "string" &&
    typeof value.artistName === "string" &&
    typeof value.artworkUrl100 === "string"
  );
};

const isITunesSearchResponse = (value: unknown): value is ITunesSearchResponse => {
  if (!isObject(value)) {
    return false;
  }

  if (typeof value.resultCount !== "number" || !Array.isArray(value.results)) {
    return false;
  }

  return value.results.every((item) => isITunesTrackDTO(item));
};

export const fetchITunesTracks = async (
  params: SearchTracksParams,
): Promise<ITunesSearchResponse> => {
  const normalizedTerm = params.term.trim();

  if (!normalizedTerm) {
    return {
      resultCount: 0,
      results: [],
    };
  }

  const query = new URLSearchParams({
    term: normalizedTerm,
    entity: params.entity ?? DEFAULT_ENTITY,
    attribute: params.attribute,
    limit: String(params.limit ?? DEFAULT_LIMIT),
  });

  const url = `${ITUNES_BASE_URL}?${query.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iTunes API responded with ${response.status}`);
    }

    const payload: unknown = await response.json();

    if (!isITunesSearchResponse(payload)) {
      throw new Error("Invalid iTunes API response format");
    }

    return payload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to fetch tracks from iTunes: ${error.message}`);
    }

    throw new Error("Unable to fetch tracks from iTunes due to an unknown error");
  }
};
