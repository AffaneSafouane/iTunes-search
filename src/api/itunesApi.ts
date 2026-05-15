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

  const queryParams: Record<string, string> = {
    term: normalizedTerm,
    media: "music",
    entity: params.entity ?? DEFAULT_ENTITY,
    limit: String(params.limit ?? DEFAULT_LIMIT),
  };

  if (params.attribute) {
    queryParams.attribute = params.attribute;
  }

  const query = new URLSearchParams(queryParams);
  const url = `${ITUNES_BASE_URL}?${query.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iTunes API responded with ${response.status}`);
    }

    const payload: unknown = await response.json();

    // console.log("iTunes API response:", JSON.stringify(payload, null, 2));

    if (!isObject(payload) || !Array.isArray(payload.results)) {
      throw new Error("Invalid iTunes API response format");
    }

    const validResults = payload.results.filter(isITunesTrackDTO);

    // L'API iTunes ignore parfois `attribute` côté serveur 
    // On filtre côté client pour garantir le comportement attendu : "Artiste" ne retient que les
    // résultats dont le nom d'artiste matche, "Titre" ceux dont le titre matche.
    const needle = normalizedTerm.toLocaleLowerCase();
    const filteredResults = validResults.filter((track) => {
      if (params.attribute === "artistTerm") {
        return track.artistName.toLocaleLowerCase().includes(needle);
      }

      return track.trackName.toLocaleLowerCase().includes(needle);
    });

    return {
      resultCount: filteredResults.length,
      results: filteredResults,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to fetch tracks from iTunes: ${error.message}`);
    }

    throw new Error("Unable to fetch tracks from iTunes due to an unknown error");
  }
};
