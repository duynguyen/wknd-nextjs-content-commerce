const { NEXT_PUBLIC_AEM_HOST } = process.env;
const { NEXT_PUBLIC_AEM_PATH } = process.env;

const EXCLUDED_PATHS = ['/adventures', '/catalog', '/magazine/members-only/rep:cugPolicy'];
const FETCH_CONFIG = {
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4='
  }
};

export async function getPageModel(path) {
  let pageModel = null;
  try {
    console.log(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`)
    const response = await fetch(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`, FETCH_CONFIG)
    pageModel = await response.json()
  } catch(e) {
    // invalid JSON?
  }
  return pageModel;
}

export async function getPageModelWithFallback(path, fallbackPath) {
  let pageModel = await getPageModel(path);

  if (pageModel == null) {
      pageModel = await getPageModel(fallbackPath);
  }
  return pageModel;
}

export function getComponentModel(pageModel, path) {
  const parts = path.split('/');
  let obj = pageModel;

  for (let i = 0; i < parts.length && obj; i++) {
    obj = (obj[':items'] || {})[parts[i]];
  }

  return obj || {};
}

export function getComponentsFromModel(model, type) {
  const results = []

  if(type===model[':type']){
    results.push(model)
  }

  const childItems = model[':items'];

  if(childItems){
    Object.keys(childItems).forEach(item => {
      getComponentsFromModel(childItems[item], type).forEach(component => {
        results.push(component);
      })
    })
  }

  return results;
}

export async function getChildrenPaths(path, staticPaths) {
  let children = []
  try {
    const response = await fetch(`${NEXT_PUBLIC_AEM_HOST}${path}.children.model.json`, FETCH_CONFIG);
    const childrenRes = await response.json();
    children = childrenRes.filter(child => child.id != "jcr:content").map(child => child.uri);
  } catch(e) {
    // invalid JSON?
    console.error(e);
  }
  const promises = children.map(async childPath => {
    const spaPath = childPath.replace(NEXT_PUBLIC_AEM_PATH, '')
    if(EXCLUDED_PATHS.indexOf(spaPath) < 0) {
      await getChildrenPaths(childPath, staticPaths)
      staticPaths.push(spaPath)
    }
  })
  await Promise.all(promises);
}