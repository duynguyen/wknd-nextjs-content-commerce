// import { gql } from "@apollo/client"
import { NextResponse } from "next/server"
// import client from "../lib/CommerceGraphQLClient"

// Public files end in `.foo`, where `foo` is anything but `html`.
const PUBLIC_FILE = /\.(?!html$).*$/

export default async function middleware(req) {
	const { origin, pathname } = req.nextUrl

	// Avoid querying for public files.
	if (PUBLIC_FILE.test(pathname)) {
		return NextResponse.next()
	}

	// Apollo Client queries return undefined for some reason.
	// Maybe its internal fetch doesn't work in middleware?
	// const foo = await client.query({
	// 	query: RESOLVE_URL,
	// 	variables: { url: pathname }
	// })

	const query = getQuery(pathname)
	const uri = new URL(process.env.NEXT_PUBLIC_COMMERCE_GRAPHQL_ENDPOINT)

	uri.searchParams.set("query", query)

	// The `fetch` API is available in edge environs without Node.
	const res = await fetch(uri)
	const json = await res.json()
	const route = json?.data?.route

	if (!route) {
		if (json.errors) {
			console.log({ errors: json.errors })
		}
		return NextResponse.next()
	}

	const isProduct = route.type === "PRODUCT"
	const [slug] = route.relative_url.split(".html")

	// Rewrite preserves the URL while acting like we hit a filesystem route.
	return isProduct
		? NextResponse.rewrite(`${origin}/catalog/product/${slug}`)
		: NextResponse.next()
}

// Not ready for production. This is vulnerable to query injection.
const getQuery = (pathname) =>
`{
	route(url: "${pathname}") {
		__typename
		redirect_code
		relative_url
		type
	}
}`

// const RESOLVE_URL = gql`
// 	query ResolveUrl($url: String!) {
// 		route(url: $url) {
// 			__typename
// 			redirect_code
// 			relative_url
// 			type
// 		}
// 	}
// `
