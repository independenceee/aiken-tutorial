import axios from "axios";

type Props = {
    image: File;
};

const pinata = async function ({ image }: Props): Promise<string> {
    try {
        const formData = new FormData();
        formData.append("file", image);
        const metadata = JSON.stringify({ name: "fileName" });
        formData.append("pinataMetadata", metadata);
        const options = JSON.stringify({ cidVersion: 0 });
        formData.append("pinataOptions", options);
        const { data } = await axios.post(process.env.PINATA_RPC_URL!, formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData}`,
                Authorization: process.env.PINATA_API_KEY!,
            },
        });
        return "ipfs://" + data.IpfsHash;
    } catch (error) {
        return "";
    }
};

export default pinata;
