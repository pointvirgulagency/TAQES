const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

type Locale = "fr" | "ar";

async function fetchStrapi(
  url: string,
  errorMessage: string
) {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();

    console.error(`${errorMessage}:`, error);

    throw new Error(errorMessage);
  }

  return res.json();
}

/* =========================================================
   PROJECTS
========================================================= */
export async function getProjects(locale: Locale) {
  const query = new URLSearchParams({
    locale,

    "populate[FeaturedImage][populate]": "*",
    "populate[gallery][populate]": "*",
    "populate[videos][populate]": "*",
    "populate[brochure][populate]": "*",
    "populate[documents][populate]": "*",
    "populate[Plan][populate]": "*",
    "populate[type][populate]": "*",
    "populate[territoire][populate]": "*",
    "populate[location][populate]": "*",
    "populate[actualite][populate]": "*",
  });

  return fetchStrapi(
    `${STRAPI_URL}/api/projects?${query.toString()}`,
    "Failed to fetch projects"
  );
}


/* =========================================================
   PROJECT BY SLUG
========================================================= */

export async function getProjectBySlug(
  locale: Locale,
  slug: string
) {
  const query = new URLSearchParams({
    locale,
    "filters[slug][$eq]": slug,

    "populate[FeaturedImage][populate]": "*",
    "populate[gallery][populate]": "*",
    "populate[videos][populate]": "*",
    "populate[brochure][populate]": "*",
    "populate[documents][populate]": "*",
    "populate[Plan][populate][image][populate]": "*",
    "populate[Plan][populate][valeurs][populate]": "*",
    "populate[type][populate]": "*",
    "populate[location][populate]": "*",
    "populate[actualite][populate]": "*",
  });

  const res = await fetch(
    `${STRAPI_URL}/api/projects?${query.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();

    console.error(
      `Failed to fetch project "${slug}":`,
      error
    );

    throw new Error(
      `Failed to fetch project "${slug}": ${res.status}`
    );
  }

  const json = await res.json();

  return json.data?.[0] ?? null;
}
/* =========================================================
   PROJECTS PAGE
========================================================= */
export async function getProjetsPage(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/page-projet?locale=${locale}` +
    `&populate[HeroProjet][populate][background][populate]=*` +
    `&populate[HeroProjet][populate][projects][populate]=*` +
    `&populate[hero][populate]=*` +
    `&populate[last_section][populate][background][populate]=*` +
    `&populate[ProjectFilters][populate][FilterOptions]=*`;

  return fetchStrapi(
    url,
    "Failed to fetch projets page"
  );
}

/* =========================================================
   ACCUEIL
========================================================= */
export async function getAccueil(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/acceuil?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[Nouvelle_Identite][populate]=*` +
    `&populate[Projets_Mis_En_Avant][populate][projects][populate]=*` +
    `&populate[territoires][populate]=*` +
    `&populate[NotreApproche][populate]=*` +
    `&populate[CTAFinal][populate]=*` +
    `&populate[typologie][populate]=*` +
    `&populate[articles][populate][actualites][populate]=*` +
    `&populate[SEO][populate]=*`;

  return fetchStrapi(
    url,
    "Failed to fetch accueil"
  );
}

/* =========================================================
   LE GROUPE
========================================================= */

export async function getGroupe(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/le-groupe?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[foncierealia][populate]=*` +
    `&populate[chrono][populate][image][populate]=*` +
    `&populate[chrono][populate][projects][populate]=*` +
    `&populate[chiffresimage][populate]=*` +
    `&populate[territoire_background][populate]=*` +
    `&populate[transition][populate]=*` +
    `&populate[vision][populate]=*` +
    `&populate[mission][populate]=*` +
    `&populate[valeurs][populate]=*` +
    `&populate[chiffrescles][populate]=*` +
    `&populate[territoire][populate]=*` ;



  return fetchStrapi(
    url,
    "Failed to fetch groupe"
  );
}

/* =========================================================
   CONTACT
========================================================= */

export async function getContactPage(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/contact?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[last_section][populate][pillars][populate]=*` +
    `&populate[Selection][populate]=*` +
    `&populate[demandes][populate]=*`;

  return fetchStrapi(
    url,
    "Failed to fetch contact page"
  );
}
/* =========================================================
   SUBMIT DEMANDE
========================================================= */
export async function submitDemande(payload: {
  nom_complet: string;
  telephone?: string;
  email: string;
  preference_contact?: string;
  langue: string;
  ville?: string;
  message: unknown;
  consentement: boolean;
  locale: Locale;
  demande_detail?: {
    __component:
      | "shared.demande-projet"
      | "shared.demande-partenariat"
      | "shared.demande-foncier"
      | "shared.demande-reclamation"
      | "shared.demande-recrutement"
      | "shared.demande-presse";

    project?: number;
    zone?: string;
    zone_recherchee?: string;
    type_bien?: string;
    surface_recherchee?: string;
    delai_souhaite?: string;
    horizon_acquisition?: string;
    budget_indicatif?: string;

    organisation?: string;
    fonction?: string;
    type_demande?: string;
    message_detail?: unknown;

    localisation?: string;
    superficie?: string;
    nature_proposition?: string;
    document_foncier?: number;

    reference_dossier?: string;
    objet?: string;
    piece_jointe?: number[];

    media_organisation?: string;
    nature_demande?: string;
    sujet_demande?: string;
    date_echeance?: string;

    cv?: number;
  };
}) {
  const url = `${STRAPI_URL}/api/demandes`;

  const data: Record<string, unknown> = {
    nom_complet: payload.nom_complet,
    telephone: payload.telephone,
    email: payload.email,
    preference_contact: payload.preference_contact,
    langue: payload.langue,
    ville: payload.ville,
    message: payload.message,
    consentement: payload.consentement,
  };

  if (payload.demande_detail) {
    data.demande_detail = [payload.demande_detail];
  }

  const res = await fetch(
    `${url}?locale=${payload.locale}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();

    console.error(
      "Failed to submit demande:",
      error
    );

    throw new Error(
      "Failed to submit demande"
    );
  }

  return res.json();
}
/* =========================================================
   ACTUALITES PAGE
========================================================= */
export async function getActualitesPage(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/page-actu?locale=${locale}` +
    `&populate[hero][populate][0]=imagedesktop` +
    `&populate[hero][populate][1]=imagemobile` +
    `&populate[hero][populate][2]=article.image` +
    `&populate[actualites][populate]=*` +
    `&populate[last_section][populate]=*`;
    `&populate[SEO][populate]=*`;

  return fetchStrapi(
    url,
    "Failed to fetch actualites page"
  );
}
/* =========================================================
   ARTICLES
========================================================= */

export async function getArticles(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/actualites?locale=${locale}` +
    `&populate[image][populate]=*` +
    `&populate[SEO][populate]=*` +
    `&populate[sections][populate]=*` +
    `&populate[articles_associes][populate][image][populate]=*` +
    `&populate[auteur_logo][populate]=*` +
    `&populate[projects][populate]=*` +
    `&sort[0]=Date:desc`;

  return fetchStrapi(
    url,
    "Failed to fetch articles"
  );
}

/* =========================================================
   ARTICLE BY SLUG
========================================================= */

export async function getArticleBySlug(
  locale: Locale,
  slug: string
) {
  const query = new URLSearchParams();

  query.set("locale", locale);
  query.set("filters[slug][$eq]", slug);

  query.set(
    "populate[image][populate]",
    "*"
  );

  query.set(
    "populate[auteur_logo][populate]",
    "*"
  );

  query.set(
    "populate[SEO][populate]",
    "*"
  );

  query.set(
    "populate[sections][populate]",
    "*"
  );

  query.set(
    "populate[articles_associes][populate][image][populate]",
    "*"
  );

  query.set(
    "populate[projects][populate]",
    "*"
  );

  const res = await fetch(
    `${STRAPI_URL}/api/actualites?${query.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();

    console.error(
      "Failed to fetch article:",
      error
    );

    throw new Error(
      `Failed to fetch article: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data?.[0] ?? null;
}
/* =========================================================
   PROJECT BY TITLE
========================================================= */

export async function getProjectByTitle(
  locale: Locale,
  title: string
) {
  const query = new URLSearchParams({
    locale,
    "filters[title][$eq]": title,
    "populate[FeaturedImage][populate]": "*",
    "populate[gallery][populate]": "*",
    "populate[videos][populate]": "*",
    "populate[brochure][populate]": "*",
    "populate[type][populate]": "*",
    "populate[territoire][populate]": "*",
    "populate[actualite][populate]": "*",
  });

  const res = await fetch(
    `${STRAPI_URL}/api/projects?${query.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();

    console.error(
      `Failed to fetch project "${title}":`,
      error
    );

    throw new Error(
      `Failed to fetch project "${title}": ${res.status}`
    );
  }

  const json = await res.json();

  return json.data?.[0] ?? null;
}

/* =========================================================
   UPLOAD
========================================================= */

export async function uploadFile(
  file: File
): Promise<number> {
  const formData = new FormData();

  formData.append("files", file);

  const res = await fetch(
    `${STRAPI_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.text();

    console.error(
      "Failed to upload file:",
      error
    );

    throw new Error(
      "Failed to upload file"
    );
  }

  const json = await res.json();

  return json[0].id as number;
}

export async function uploadFiles(
  files: File[]
): Promise<number[]> {
  return Promise.all(
    files.map((file) => uploadFile(file))
  );
}

export async function getTerritoires(locale: Locale) {
  const url =
    `${STRAPI_URL}/api/territoires?locale=${locale}` +
    `&pagination[pageSize]=100` +
    `&sort=nom:asc`;

  const response = await fetchStrapi(
    url,
    "Failed to fetch territoires"
  );

  console.log(
    "TERRITOIRES API:",
    response.data?.map(
      (territoire: { id?: number; nom?: string }) => ({
        id: territoire.id,
        nom: territoire.nom,
      })
    )
  );

  return response;
}