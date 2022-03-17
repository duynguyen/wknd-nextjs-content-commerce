const { NEXT_PUBLIC_AEM_HOST } = process.env

export async function getPageModel(path) {
  let pageModel = null;
  try {
    console.log(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`)
    const response = await fetch(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`, {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4='
      }
    })
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