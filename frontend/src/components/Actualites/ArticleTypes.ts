export type Locale = "fr" | "ar";

export interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface SEO {
  metaTitle?: string | null;
  metaDescription?: string | null;
  openGraphImage?: StrapiImage | null;
  keywords?: string | null;
  canonical?: string | null;
  robots?: string | null;
  openGraphTitle?: string | null;
  openGraphDescription?: string | null;
}

export interface Projet {
  id: number;
  documentId?: string;
  nom?: string;
  titre?: string;
  slug?: string;
  image?: StrapiImage | null;
}

export interface RichTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface RichTextBlock {
  type?: string;
  level?: number;
  format?: string;
  children?: RichTextChild[];
}

export interface InformationCle {
  id?: number;
  label?: string | null;
  valeur?: string | null;
  description?: string | null;
}

export interface ElementListe {
  id?: number;
  numero?: number | null;
  titre?: string | null;
  description?: string | null;
}

export interface SectionEditoriale {
  __component: "sections.section-editoriale";
  id?: number;
  surtitre?: string | null;
  titre?: string | null;
  contenu?: RichTextBlock[] | null;
  image?: StrapiImage | null;
  legende?: string | null;
  position?: "gauche" | "droite" | null;
  fond?: "blanc" | "nude" | "sage" | null;
  format?: "standard" | "large" | null;
}

export interface InformationsClesSection {
  __component: "sections.informations-cles";
  id?: number;
  titre?: string | null;
  informations?: InformationCle[] | null;
}

export interface ListeNumeroteeSection {
  __component: "sections.liste-numerotee";
  id?: number;
  titre?: string | null;
  element?: ElementListe[] | null;
}

export interface CitationSection {
  __component: "sections.citation";
  id?: number;
  citation?: string | null;
  auteur?: string | null;
  fond?: "sage" | "vert" | null;
}

export interface MediaLargeSection {
  __component: "sections.media-large";
  id?: number;
  image?: StrapiImage | null;
  alt?: string | null;
  legende?: string | null;
  format?: "panoramique" | "contenu" | null;
}

export interface CTASection {
  __component: "sections.cta";
  id?: number;
  surtitre?: string | null;
  titre?: string | null;
  description?: string | null;
  libelle_boutton?: string | null;
  lien?: string | null;
  fond?: "blanc" | "nude" | "sage" | "vert" | null;
}

export type ArticleSection =
  | SectionEditoriale
  | InformationsClesSection
  | ListeNumeroteeSection
  | CitationSection
  | MediaLargeSection
  | CTASection;

export interface Article {
  id: number;
  documentId?: string;
  titre: string;
  slug: string;
  categorie?: string;
  Date?: string;
  featured?: boolean;
  introduction?: string | null;
  auteur?: string | null;
  auteur_logo?: StrapiImage | null;
  image?: StrapiImage | null;
  SEO?: SEO | null;
  sections?: ArticleSection[] | null;
  articles_associes?: Article[] | null;
  projects?: Projet[] | null;
}