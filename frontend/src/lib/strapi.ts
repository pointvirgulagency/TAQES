const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function getProjects(locale: string) {
  const url =
    `${STRAPI_URL}/api/projects?locale=${locale}` +
    `&populate=FeaturedImage`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export async function getProjetsPage(locale: string) {
  const url =
    `${STRAPI_URL}/api/page-projet?locale=${locale}` +
    `&populate[HeroProjet][populate][projet][populate]=FeaturedImage`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch projets page");
  }

  return res.json();
}

export async function getAccueil(locale: string) {
  const url =
    `${STRAPI_URL}/api/acceuil?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[Nouvelle_Identite][populate]=*` +
    `&populate[Projets_Mis_En_Avant][populate][projects][populate]=*` +
    `&populate[Territoires][populate][projects][populate]=*` +
    `&populate[NotreApproche][populate]=*` +
    `&populate[Actualites][populate][articlePrincipal][populate]=*` +
    `&populate[Actualites][populate][articlesSecondaires][populate]=*` +
    `&populate[CTAFinal][populate]=*` +
    `&populate[SEO][populate]=*`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch accueil");
  }

  return res.json();
}

export async function getGroupe(locale: string) {
  const url =
    `${STRAPI_URL}/api/le-groupe?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[foncierealia][populate]=*` +
    `&populate[chrono][populate][image][populate]=*` +
    `&populate[chrono][populate][projects][populate]=*` +
    `&populate[transition][populate]=*` +
    `&populate[vision][populate]=*` +
    `&populate[mission][populate]=*` +
    `&populate[chiffrescles][populate]=*` +
    `&populate[gouvernance][populate]=*` +
    `&populate[SEO][populate]=*`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch groupe");
  }

  return res.json();
}


export async function getContactPage(locale: string) {
  const url =
    `${STRAPI_URL}/api/contact?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[demandes][populate]=*` +
    `&populate[Selection][populate]=*` +
    `&populate[SEO][populate]=*`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch contact page");
  }

  return res.json();
}

export async function submitDemande(payload: {
  nomComplet: string;
  email: string;
  telephone?: string;
  sujet?: string;
  message: string;
  type?: string;
  locale: string;
}) {
  const url = `${STRAPI_URL}/api/demandes`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        nomComplet: payload.nomComplet,
        email: payload.email,
        telephone: payload.telephone,
        sujet: payload.sujet,
        message: payload.message,
        type: payload.type ?? "Nous contacter",
        locale: payload.locale,
      },
    }),
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to submit demande");
  }

  return res.json();
}

export async function getActualitesPage(locale: string) {
  const url =
    `${STRAPI_URL}/api/page-actualite?locale=${locale}` +
    `&populate[Hero][populate]=*` +
    `&populate[SEO][populate]=*`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch actualites page");
  }

  return res.json();
}

export async function getArticles(locale: string) {
  const url =
    `${STRAPI_URL}/api/articles?locale=${locale}` +
    `&populate=FeaturedImage` +
    `&sort=publishedAt:desc`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}
