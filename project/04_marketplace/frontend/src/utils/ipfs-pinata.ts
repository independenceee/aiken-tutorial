import axios from "axios";

type Props = {
    image: File;
};

const ipfsPinata = async function ({ image }: Props): Promise<string | any> {
    try {
        const formData: FormData = new FormData();
        formData.append("file", image);
        const metadata: string = JSON.stringify({ name: "fileName" });
        formData.append("pinataMetadata", metadata);
        const option: string = JSON.stringify({ cidVersion: 0 });
        formData.append("pinataOptions", option);

        const { data } = await axios.post(
            (process.env.PINATA_RPC_URL as string) ||
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData}`,
                    Authorization:
                        `Bearer ${process.env.PINATA_API_KEY}` ||
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk",
                },
            },
        );

        console.log(data.IpfsHash);

        return "ipfs://" + data.IpfsHash;
    } catch (error) {
        console.log(error);
    }
};

export default ipfsPinata;
