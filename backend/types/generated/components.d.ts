import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsActualites extends Struct.ComponentSchema {
  collectionName: 'components_sections_actualites';
  info: {
    displayName: 'Actus';
  };
  attributes: {
    articlePrincipal: Schema.Attribute.Relation<
      'oneToOne',
      'api::actualite.actualite'
    >;
    articlesSecondaires: Schema.Attribute.Relation<
      'oneToMany',
      'api::actualite.actualite'
    >;
  };
}

export interface SectionsChiffres extends Struct.ComponentSchema {
  collectionName: 'components_sections_chiffres';
  info: {
    displayName: 'Chiffres';
  };
  attributes: {
    description: Schema.Attribute.Text;
    libelle: Schema.Attribute.String;
    valeur: Schema.Attribute.String;
  };
}

export interface SectionsChronologie extends Struct.ComponentSchema {
  collectionName: 'components_sections_chronologies';
  info: {
    displayName: 'chronologie';
  };
  attributes: {
    annee: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsCtaFinal extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_finals';
  info: {
    displayName: 'CTAFinal';
  };
  attributes: {
    libelleBoutonProjets: Schema.Attribute.String;
    lienBoutonContact: Schema.Attribute.String;
    lienBoutonProjets: Schema.Attribute.String;
    texte: Schema.Attribute.Blocks;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsFonciereAlia extends Struct.ComponentSchema {
  collectionName: 'components_sections_fonciere_alias';
  info: {
    displayName: 'fonciere-alia';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsGouvernance extends Struct.ComponentSchema {
  collectionName: 'components_sections_gouvernances';
  info: {
    displayName: 'gouvernance';
  };
  attributes: {
    Job: Schema.Attribute.String;
    Nom: Schema.Attribute.String;
    Picture: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Poste: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    imagedesktop: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    imagemobile: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    imageposter: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Libellebouton1: Schema.Attribute.String;
    libelleboutonprincipal: Schema.Attribute.String;
    lienbouton1: Schema.Attribute.String;
    lienboutonprincipal: Schema.Attribute.String;
    surtitre: Schema.Attribute.String;
    Territoires: Schema.Attribute.Text;
    titre: Schema.Attribute.String;
    video: Schema.Attribute.Media<'files' | 'videos'>;
  };
}

export interface SectionsMembres extends Struct.ComponentSchema {
  collectionName: 'components_sections_membres';
  info: {
    displayName: 'membres';
  };
  attributes: {
    biographie: Schema.Attribute.Blocks;
    fonction: Schema.Attribute.String;
    nom: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    prenom: Schema.Attribute.String;
  };
}

export interface SectionsMission extends Struct.ComponentSchema {
  collectionName: 'components_sections_missions';
  info: {
    displayName: 'mission';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsNotreApproche extends Struct.ComponentSchema {
  collectionName: 'components_sections_notre_approches';
  info: {
    displayName: 'Notre Approche';
  };
  attributes: {
    boutton: Schema.Attribute.String;
    description: Schema.Attribute.String;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    lien: Schema.Attribute.String;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsNouvelleIdentite extends Struct.ComponentSchema {
  collectionName: 'components_sections_nouvelle_identite';
  info: {
    displayName: 'Nouvelle Identit\u00E9';
  };
  attributes: {
    Chiffres: Schema.Attribute.Component<'sections.chiffres', true>;
    description: Schema.Attribute.Blocks;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    libellebouton: Schema.Attribute.String;
    lien_boutton: Schema.Attribute.String;
    Titre: Schema.Attribute.String;
  };
}

export interface SectionsProjethero extends Struct.ComponentSchema {
  collectionName: 'components_sections_projetheroes';
  info: {
    displayName: 'Projethero';
  };
  attributes: {
    projet: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsProjetsMisEnAvant extends Struct.ComponentSchema {
  collectionName: 'components_sections_projets_mis_en_avants';
  info: {
    displayName: 'Projets_Mis_En_Avant';
  };
  attributes: {
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsTerritoiresDIntervention
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_territoires_d_interventions';
  info: {
    displayName: 'Territoires d\u2019intervention';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    latitude: Schema.Attribute.String;
    longitude: Schema.Attribute.String;
    nom: Schema.Attribute.String;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsTransitionTaqes extends Struct.ComponentSchema {
  collectionName: 'components_sections_transition_taqes';
  info: {
    displayName: 'transition-taqes';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsTypeDemande extends Struct.ComponentSchema {
  collectionName: 'components_sections_type_demandes';
  info: {
    displayName: 'type-demande';
  };
  attributes: {
    type: Schema.Attribute.Enumeration<
      ['Projet', 'Foncier', 'Partenariat', 'Presse', 'R\u00E9clamation']
    >;
  };
}

export interface SectionsValeurs extends Struct.ComponentSchema {
  collectionName: 'components_sections_valeurs';
  info: {
    displayName: 'Valeurs';
  };
  attributes: {
    titre: Schema.Attribute.String;
  };
}

export interface SectionsVision extends Struct.ComponentSchema {
  collectionName: 'components_sections_visions';
  info: {
    displayName: 'vision';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface SharedDemandeFoncier extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_fonciers';
  info: {
    displayName: 'DemandeFoncier';
  };
  attributes: {
    document_foncier: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    localisation: Schema.Attribute.String;
    nature_proposition: Schema.Attribute.Enumeration<
      ['Vente', 'Partenariat', 'Apport foncier', 'Autre']
    >;
    superficie: Schema.Attribute.String;
  };
}

export interface SharedDemandePartenariat extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_partenariats';
  info: {
    displayName: 'DemandePartenariat';
  };
  attributes: {
    fonction: Schema.Attribute.String;
    message_detail: Schema.Attribute.Blocks;
    organisation: Schema.Attribute.String;
    type_demande: Schema.Attribute.Enumeration<
      ['Partenariat', 'Presse', 'Interview', 'Autre']
    >;
  };
}

export interface SharedDemandeProjet extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_projets';
  info: {
    displayName: 'DemandeProjet';
  };
  attributes: {
    delai_souhaite: Schema.Attribute.String;
    project: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
    surface_recherchee: Schema.Attribute.String;
    type_bien: Schema.Attribute.Enumeration<
      ['Appartement', 'Villa', 'Terrain', 'Bureau', 'Autre']
    >;
    zone: Schema.Attribute.String;
  };
}

export interface SharedDemandeReclamationField extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_reclamation_fields';
  info: {
    displayName: 'DemandeReclamation Field';
  };
  attributes: {
    objet: Schema.Attribute.String;
    piece_jointe: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    project: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
    reference_dossier: Schema.Attribute.String;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    displayName: 'location';
  };
  attributes: {};
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSelection extends Struct.ComponentSchema {
  collectionName: 'components_shared_selections';
  info: {
    displayName: 'Selection';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    canonical: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    openGraphDescription: Schema.Attribute.Text;
    openGraphImage: Schema.Attribute.Media<'images'>;
    openGraphTitle: Schema.Attribute.String;
    robots: Schema.Attribute.Enumeration<['index,follow', 'noindex,nofollow']>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTypologie extends Struct.ComponentSchema {
  collectionName: 'components_shared_typologies';
  info: {
    displayName: 'Typologie';
  };
  attributes: {
    client: Schema.Attribute.Enumeration<
      ['Particuliers', 'Professionnels & investisseurs']
    >;
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titre: Schema.Attribute.String;
  };
}

export interface SharedVille extends Struct.ComponentSchema {
  collectionName: 'components_shared_villes';
  info: {
    displayName: 'ville';
  };
  attributes: {
    ville: Schema.Attribute.Enumeration<
      ['Skhirat', 'A\u00EFn Attig', 'Sala El Jadida', 'Bouznika', 'Sid El Abed']
    >;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'sections.actualites': SectionsActualites;
      'sections.chiffres': SectionsChiffres;
      'sections.chronologie': SectionsChronologie;
      'sections.cta-final': SectionsCtaFinal;
      'sections.fonciere-alia': SectionsFonciereAlia;
      'sections.gouvernance': SectionsGouvernance;
      'sections.hero': SectionsHero;
      'sections.membres': SectionsMembres;
      'sections.mission': SectionsMission;
      'sections.notre-approche': SectionsNotreApproche;
      'sections.nouvelle-identite': SectionsNouvelleIdentite;
      'sections.projethero': SectionsProjethero;
      'sections.projets-mis-en-avant': SectionsProjetsMisEnAvant;
      'sections.territoires-d-intervention': SectionsTerritoiresDIntervention;
      'sections.transition-taqes': SectionsTransitionTaqes;
      'sections.type-demande': SectionsTypeDemande;
      'sections.valeurs': SectionsValeurs;
      'sections.vision': SectionsVision;
      'shared.demande-foncier': SharedDemandeFoncier;
      'shared.demande-partenariat': SharedDemandePartenariat;
      'shared.demande-projet': SharedDemandeProjet;
      'shared.demande-reclamation-field': SharedDemandeReclamationField;
      'shared.location': SharedLocation;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.selection': SharedSelection;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.typologie': SharedTypologie;
      'shared.ville': SharedVille;
    }
  }
}
