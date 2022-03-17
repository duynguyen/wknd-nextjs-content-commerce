
const { NEXT_PUBLIC_INVALIDATION_AUTH, NEXT_PUBLIC_AEM_PATH } = process.env;

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.headers.Authorization === NEXT_PUBLIC_INVALIDATION_AUTH) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const { path } = req.headers; // CQ-Path

        if (path && path.indexOf(NEXT_PUBLIC_AEM_PATH) === 0) {
            const route = path.substr(NEXT_PUBLIC_AEM_PATH.length) || '/';
            console.log(`revalidate ${route}`);
            await res.unstable_revalidate(route);
        } 

        return res.status(200).send('OK')
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}