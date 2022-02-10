const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
    reactStrictMode: true,
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
    },
    webpack(config) {
        config.plugins.push(new WebpackAssetsManifest({
            output: '../public/asset-manifest.json',
            transform: assets => {
                const entrypoints = [];
                for (let file in assets) {
                    if (assets[file].endsWith('.js') || assets[file].endsWith('.css')) {
                        entrypoints.push(assets[file]);
                    }
                }
                return {
                    files: assets,
                    entrypoints: entrypoints
                };
            }
        }));

        return config;
    }
};