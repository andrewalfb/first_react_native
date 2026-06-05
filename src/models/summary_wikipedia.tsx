export interface Summary {
  titles: Titles;
  originalimage: Originalimage;
  description: string;
  descriptionSource: string;
  extract: string;
}

export interface Originalimage {
  source: string;
  width: number;
  height: number;
}

export interface Titles {
  canonical: string;
  normalized: string;
  display: string;
}

export function parseSummary(json: unknown): Summary {
  if (typeof json !== "object" || json === null) {
    throw new Error("Invalid Wikipedia summary payload");
  }

  const data = json as Record<string, unknown>;
  const titles = data.titles as Record<string, unknown>;
  const originalimage = data.originalimage as Record<string, unknown>;

  if (
    typeof data.description !== "string" ||
    typeof data.description_source !== "string" ||
    typeof data.extract !== "string" ||
    typeof titles?.canonical !== "string" ||
    typeof titles?.normalized !== "string" ||
    typeof titles?.display !== "string" ||
    typeof originalimage?.source !== "string" ||
    typeof originalimage?.width !== "number" ||
    typeof originalimage?.height !== "number"
  ) {
    throw new Error("Invalid Wikipedia summary payload");
  }

  return {
    titles: {
      canonical: titles.canonical,
      normalized: titles.normalized,
      display: titles.display,
    },
    originalimage: {
      source: originalimage.source,
      width: originalimage.width,
      height: originalimage.height,
    },
    description: data.description,
    descriptionSource: data.description_source,
    extract: data.extract,
  };
}
