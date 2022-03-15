const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['jnz3dtiuj77ca.dummycachetest.com']
    },
    async headers() {
        return [
            {
                source: '/api/getNextProps',
                headers: [ {
                    key: 'Access-Control-Allow-Origin',
                    value: process.env.NEXT_PUBLIC_AEM_HOST
                } ]
            },
            {
                source: '/asset-manifest.json',
                headers: [ {
                    key: 'Access-Control-Allow-Origin',
                    value: process.env.NEXT_PUBLIC_AEM_HOST
                } ]
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/content/:path*',
                destination: '/api/proxy/:path*'
            },
            {
                source: '/.model.json',
                destination: '/api/proxy/.model.json'
            }
        ]
    }
};