import AEMHeadless from '@adobe/aem-headless-client-js'
import fetch from 'cross-fetch'

const endpoint = '/content/_cq_graphql/wknd/endpoint.json'
const serviceURL = 'https://publish-p13503-e139264.adobeaemcloud.com'

export async function getAdventures(path, query) {
  const aemHeadlessClient = new AEMHeadless({
    serviceURL,
    endpoint,
    fetch
  })
  const fakeQuery = `{
    adventureList {
      items {
        _path
        adventureTitle
        adventureDescription {
          plaintext
        }
        adventurePrimaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }
  }`
  const res = await aemHeadlessClient.runQuery(fakeQuery)
  return res
}

export async function getAdventurePaths() {
  const res = await getAdventures()
  const adventures = res?.data?.adventureList?.items || []
  const paths = adventures.map(item => {
    const pathItems = item._path.split('/')
    return {
      params: {
        id: `${pathItems[pathItems.length - 2]}`
      }
    }
  })
  return paths
}

export async function getAdventureByPath(path) {
  const aemHeadlessClient = new AEMHeadless({
    serviceURL,
    endpoint,
    fetch
  })
  const query = `{
    adventureByPath (_path: "${path}") {
      item {
        _path
          adventureTitle
          adventureActivity
          adventureType
          adventurePrice
          adventureTripLength
          adventureGroupSize
          adventureDifficulty
          adventurePrice
          adventurePrimaryImage {
            ... on ImageRef {
              _path
              mimeType
              width
              height
            }
          }
          adventureDescription {
            html
          }
          adventureItinerary {
            html
          }
      }
    }
  }
  `
  const res = await aemHeadlessClient.runQuery(query)
  return res
}