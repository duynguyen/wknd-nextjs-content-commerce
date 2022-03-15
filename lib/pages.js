const { NEXT_PUBLIC_AEM_HOST } = process.env

export async function getPageModel(path) {
  let pageModel = {};
  try {
    console.log(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`)
    const response = await fetch(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`, {
      headers: {}
    })
    pageModel = await response.json()
  } catch(e) {
    // invalid JSON?
  }
  return pageModel;
}