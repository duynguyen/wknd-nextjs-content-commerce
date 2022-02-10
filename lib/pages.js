import fetch from 'cross-fetch'

const aemServer = 'https://publish-p13503-e139264.adobeaemcloud.com'

export async function getPageModel(path) {
  let pageModel = {};
  try {
    const response = await fetch(`${aemServer}${path}.model.json`);
    pageModel = await response.json();
  } catch(e) {
    // invalid JSON?
  }
  return pageModel;
}