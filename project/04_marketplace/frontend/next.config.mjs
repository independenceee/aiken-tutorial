const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.demarket.vn",
            },
            {
                protocol: "https",
                hostname: "ipfs.io",
            },
        ],
    },
    env: {
        NEXT_APP_BASE_URL: "https://api.demarket.vn/api/v2",
        ADDRESS_DONATE:
            "addr1qy2z60lx2zdfs7gvjn3mt47mlx20dhqyrt8xu0m7d685x2ng64psekpurtcrh0esrtgkyk3pn5ehv5njx745rqp5ts7s3zfapl",
        CONTRACT_ADDRESS: "addr_test1wpsqeugnmmtk3cdf3fsly998458eavua8rhg4jdtgcva26sqnylmx",
        EXCHANGE_ADDRESS:
            "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
        PINATA_RPC_URL: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        PINATA_API_KEY:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk",
        BLOCKFROST_NETWORK_NAME_PREPROD: "Preprod",
        BLOCKFROST_NETWORK_NAME_PREVIEW: "Preview",
        BLOCKFROST_NETWORK_NAME_MAINNET: "Mainnet",
        BLOCKFROST_RPC_URL_MAINNET: " https://cardano-mainnet.blockfrost.io/api/v0",
        BLOCKFROST_RPC_URL_PREPROD: "https://cardano-preprod.blockfrost.io/api/v0",
        BLOCKFROST_RPC_URL_PREVIEW: "https://cardano-preview.blockfrost.io/api/v0",
        BLOCKFROST_PROJECT_API_KEY_MAINNET: "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC",
        BLOCKFROST_PROJECT_API_KEY_PREPROD: "preprodqxI262OVhgmUJ8gYjaoM2hSRUW2Si4DI",
        BLOCKFROST_PROJECT_API_KEY_PREVIEW: "preprodqxI262OVhgmUJ8gYjaoM2hSRUW2Si4DI",
    },
};

export default nextConfig;
