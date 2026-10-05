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

export interface SectionsActualitesAcceuil extends Struct.ComponentSchema {
  collectionName: 'components_sections_actualites_acceuils';
  info: {
    displayName: 'actualites-acceuil';
  };
  attributes: {
    actualites: Schema.Attribute.Relation<
      'oneToMany',
      'api::actualite.actualite'
    >;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    libelle_bouton: Schema.Attribute.String;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsChiffres extends Struct.ComponentSchema {
  collectionName: 'components_sections_chiffres';
  info: {
    displayName: 'Chiffres';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface SectionsCitation extends Struct.ComponentSchema {
  collectionName: 'components_sections_citations';
  info: {
    displayName: 'citation';
  };
  attributes: {
    auteur: Schema.Attribute.String;
    citation: Schema.Attribute.String;
    fond: Schema.Attribute.Enumeration<['sage', 'vert']>;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    description: Schema.Attribute.String;
    fond: Schema.Attribute.Enumeration<['blanc', 'nude', 'sage', 'vert']>;
    libelle_boutton: Schema.Attribute.String;
    lien: Schema.Attribute.String;
    surtitre: Schema.Attribute.String;
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

export interface SectionsElementListe extends Struct.ComponentSchema {
  collectionName: 'components_sections_element_listes';
  info: {
    displayName: 'element-liste';
  };
  attributes: {
    description: Schema.Attribute.Text;
    numero: Schema.Attribute.Integer;
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
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    soustitre: Schema.Attribute.String;
    titre: Schema.Attribute.String;
    titresecond: Schema.Attribute.Text;
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
    article: Schema.Attribute.Relation<'oneToOne', 'api::actualite.actualite'>;
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

export interface SectionsInformationCle extends Struct.ComponentSchema {
  collectionName: 'components_sections_information_cles';
  info: {
    displayName: 'information-cle';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    valeur: Schema.Attribute.String;
  };
}

export interface SectionsInformationsCles extends Struct.ComponentSchema {
  collectionName: 'components_sections_informations_cles';
  info: {
    displayName: 'informations-cles';
  };
  attributes: {
    informations: Schema.Attribute.Component<'sections.information-cle', true>;
    note: Schema.Attribute.String;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsLastSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_last_sections';
  info: {
    displayName: 'last_section';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    libelle_bouton: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface SectionsLastSectionActu extends Struct.ComponentSchema {
  collectionName: 'components_sections_last_section_actus';
  info: {
    displayName: 'last_section_actu';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    eyebrow: Schema.Attribute.String;
    libelle_bouton: Schema.Attribute.String;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsLastSectionContact extends Struct.ComponentSchema {
  collectionName: 'components_sections_last_section_contacts';
  info: {
    displayName: 'last-section_contact';
  };
  attributes: {
    description: Schema.Attribute.String;
    pillars: Schema.Attribute.Component<'sections.chiffres', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsListeNumerotee extends Struct.ComponentSchema {
  collectionName: 'components_sections_liste_numerotees';
  info: {
    displayName: 'liste-numerotee';
  };
  attributes: {
    element: Schema.Attribute.Component<'sections.element-liste', true>;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsMediaLarge extends Struct.ComponentSchema {
  collectionName: 'components_sections_media_larges';
  info: {
    displayName: 'media-large';
  };
  attributes: {
    alt: Schema.Attribute.String;
    format: Schema.Attribute.Enumeration<['panoramique', 'contenu']>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    legende: Schema.Attribute.String;
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
    cible: Schema.Attribute.String;
    description: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
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

export interface SectionsPlan extends Struct.ComponentSchema {
  collectionName: 'components_sections_plans';
  info: {
    displayName: 'plan';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
    valeurs: Schema.Attribute.Component<'sections.information-cle', true>;
  };
}

export interface SectionsProjectFilters extends Struct.ComponentSchema {
  collectionName: 'components_sections_project_filters';
  info: {
    displayName: 'Project Filters';
  };
  attributes: {
    FilterOptions: Schema.Attribute.Component<
      'shared.project-filter-option',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProjectLocation extends Struct.ComponentSchema {
  collectionName: 'components_sections_project_locations';
  info: {
    displayName: 'project_location';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    latitude: Schema.Attribute.String;
    longitude: Schema.Attribute.String;
    nom: Schema.Attribute.String;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsProjethero extends Struct.ComponentSchema {
  collectionName: 'components_sections_projetheroes';
  info: {
    displayName: 'Projethero';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
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

export interface SectionsSectionEditoriale extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_editoriales';
  info: {
    displayName: 'section-editoriale';
  };
  attributes: {
    contenu: Schema.Attribute.Blocks;
    fond: Schema.Attribute.Enumeration<['blanc', 'nude', 'sage']>;
    format: Schema.Attribute.Enumeration<['standard', 'large']>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    legende: Schema.Attribute.Text;
    position: Schema.Attribute.Enumeration<['gauche', 'droite']>;
    surtitre: Schema.Attribute.String;
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
    description: Schema.Attribute.Text;
    soustitre: Schema.Attribute.String;
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
    description_opportunite: Schema.Attribute.Blocks;
    document_foncier: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    fonction: Schema.Attribute.String;
    localisation: Schema.Attribute.String;
    nature_proposition: Schema.Attribute.Enumeration<
      ['Vente', 'Partenariat', 'Apport foncier', 'Autre']
    >;
    nom_raison_sociale: Schema.Attribute.String;
    profil: Schema.Attribute.Enumeration<
      ['proprietaire_foncier', 'apporteur_affaires', 'mandataire']
    >;
    reference_fonciere: Schema.Attribute.String;
    situation_juridique: Schema.Attribute.String;
    statut: Schema.Attribute.Enumeration<['particulier', 'societe']>;
    superficie: Schema.Attribute.String;
  };
}

export interface SharedDemandePartenariat extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_partenariats';
  info: {
    displayName: 'DemandePartenariat';
  };
  attributes: {
    budget_investissement: Schema.Attribute.String;
    documents_presentation: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    domaine_intervention: Schema.Attribute.String;
    fonction: Schema.Attribute.String;
    message_detail: Schema.Attribute.Blocks;
    organisation: Schema.Attribute.String;
    profil: Schema.Attribute.Enumeration<
      ['investisseur', 'entreprise', 'institution', 'partenaire']
    >;
    secteur_activite: Schema.Attribute.String;
    type_demande: Schema.Attribute.Enumeration<
      ['Investissement  ', 'Partenariat  ', 'Collaboration ', 'Autre']
    >;
    type_partenariat_recherche: Schema.Attribute.String;
    zone_geographique: Schema.Attribute.String;
  };
}

export interface SharedDemandePresse extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_presses';
  info: {
    displayName: 'DemandePresse';
  };
  attributes: {
    date_echeance: Schema.Attribute.Date;
    fonction: Schema.Attribute.String;
    media_organisation: Schema.Attribute.String;
    nature_demande: Schema.Attribute.Enumeration<
      [
        'Demande d\u2019interview',
        'Informations institutionnelles',
        'Communiqu\u00E9 ou dossier de presse',
        'Visuels et \u00E9l\u00E9ments de marque',
        'Reportage ou tournage',
        'Invitation ou \u00E9v\u00E9nement',
        'Autre',
      ]
    >;
    piece_jointe: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    sujet_demande: Schema.Attribute.String;
  };
}

export interface SharedDemandeProjet extends Struct.ComponentSchema {
  collectionName: 'components_shared_demande_projets';
  info: {
    displayName: 'DemandeProjet';
  };
  attributes: {
    budget_indicatif: Schema.Attribute.String;
    horizon_acquisition: Schema.Attribute.Enumeration<
      [
        'Imm\u00E9diatement',
        'Moins de 3 mois',
        'De 3 \u00E0 6 mois',
        'De 6 \u00E0 12 mois',
        'Simple prise d\u2019information',
      ]
    >;
    project: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
    surface_recherchee: Schema.Attribute.String;
    type_bien: Schema.Attribute.Enumeration<
      ['Appartement', 'Villa', 'Lot de terrain', 'Local commercial', 'Autre']
    >;
    zone_recherche: Schema.Attribute.String;
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

export interface SharedProjectFilterOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_project_filter_options';
  info: {
    displayName: 'ProjectFilterOption';
  };
  attributes: {
    active: Schema.Attribute.Boolean;
    field: Schema.Attribute.Enumeration<
      ['type_operation', 'statut', 'profile', 'disponibilite']
    >;
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
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
    adresse: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
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
      [
        'Skhirat',
        'A\u00EFn Attig',
        'Sala El Jadida',
        'Bouznika',
        'Sid El Abed',
        'Sal\u00E9',
      ]
    >;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'sections.actualites': SectionsActualites;
      'sections.actualites-acceuil': SectionsActualitesAcceuil;
      'sections.chiffres': SectionsChiffres;
      'sections.chronologie': SectionsChronologie;
      'sections.citation': SectionsCitation;
      'sections.cta': SectionsCta;
      'sections.cta-final': SectionsCtaFinal;
      'sections.element-liste': SectionsElementListe;
      'sections.fonciere-alia': SectionsFonciereAlia;
      'sections.gouvernance': SectionsGouvernance;
      'sections.hero': SectionsHero;
      'sections.information-cle': SectionsInformationCle;
      'sections.informations-cles': SectionsInformationsCles;
      'sections.last-section': SectionsLastSection;
      'sections.last-section-actu': SectionsLastSectionActu;
      'sections.last-section-contact': SectionsLastSectionContact;
      'sections.liste-numerotee': SectionsListeNumerotee;
      'sections.media-large': SectionsMediaLarge;
      'sections.membres': SectionsMembres;
      'sections.mission': SectionsMission;
      'sections.notre-approche': SectionsNotreApproche;
      'sections.nouvelle-identite': SectionsNouvelleIdentite;
      'sections.plan': SectionsPlan;
      'sections.project-filters': SectionsProjectFilters;
      'sections.project-location': SectionsProjectLocation;
      'sections.projethero': SectionsProjethero;
      'sections.projets-mis-en-avant': SectionsProjetsMisEnAvant;
      'sections.section-editoriale': SectionsSectionEditoriale;
      'sections.territoires-d-intervention': SectionsTerritoiresDIntervention;
      'sections.transition-taqes': SectionsTransitionTaqes;
      'sections.type-demande': SectionsTypeDemande;
      'sections.valeurs': SectionsValeurs;
      'sections.vision': SectionsVision;
      'shared.demande-foncier': SharedDemandeFoncier;
      'shared.demande-partenariat': SharedDemandePartenariat;
      'shared.demande-presse': SharedDemandePresse;
      'shared.demande-projet': SharedDemandeProjet;
      'shared.demande-reclamation-field': SharedDemandeReclamationField;
      'shared.location': SharedLocation;
      'shared.media': SharedMedia;
      'shared.project-filter-option': SharedProjectFilterOption;
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
