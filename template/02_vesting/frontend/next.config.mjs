/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BLOCKFROST_PROPROD_RPC_URL:
            "https://cardano-preprod.blockfrost.io/api/v0",
        BLOCKFROST_PROPROD_API: "preprody7qLCi4kIiAUEFRlJvmZ2PTi6jreF7gI",
    },
};

export default nextConfig;
