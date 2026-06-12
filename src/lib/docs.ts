import { getCollection, type CollectionEntry } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

export const SECTIONS = {
  students: {
    id: "students",
    label: "Students",
    description: "Guides for studying with Mnemo: installing, notes, flashcards, mind maps, and settings.",
  },
  developers: {
    id: "developers",
    label: "Developers",
    description: "Architecture, setup, module system, and contribution guides for working on Mnemo itself.",
  },
} as const;

export type SectionId = keyof typeof SECTIONS;

/** "students/notes/index" -> "students/notes", "students/index" -> "students" */
export function slugOf(entry: DocEntry): string {
  return entry.id.replace(/\/index$/, "");
}

export function sectionOf(entry: DocEntry): SectionId {
  return entry.id.split("/")[0] as SectionId;
}

export function urlOf(entry: DocEntry): string {
  return `/docs/${slugOf(entry)}`;
}

export interface SidebarGroup {
  label: string;
  entries: DocEntry[];
}

function sortEntries(a: DocEntry, b: DocEntry): number {
  return a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
}

export async function getSectionEntries(section: SectionId): Promise<DocEntry[]> {
  return getCollection(
    "docs",
    (entry) => !entry.data.draft && sectionOf(entry) === section,
  );
}

/** Sidebar groups for a section, ordered by the lowest `order` they contain. */
export async function getSidebar(section: SectionId): Promise<SidebarGroup[]> {
  const entries = await getSectionEntries(section);
  const groups = new Map<string, DocEntry[]>();

  for (const entry of entries) {
    const label = entry.data.category ?? "Overview";
    const group = groups.get(label);
    if (group) group.push(entry);
    else groups.set(label, [entry]);
  }

  const result: SidebarGroup[] = [...groups.entries()].map(([label, list]) => ({
    label,
    entries: list.sort(sortEntries),
  }));

  result.sort((a, b) => {
    const minA = Math.min(...a.entries.map((e) => e.data.order));
    const minB = Math.min(...b.entries.map((e) => e.data.order));
    return minA - minB || a.label.localeCompare(b.label);
  });

  return result;
}

/** Flat reading order across all groups, used for prev/next links. */
export async function getFlatNav(section: SectionId): Promise<DocEntry[]> {
  const groups = await getSidebar(section);
  return groups.flatMap((g) => g.entries);
}
