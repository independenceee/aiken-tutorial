function checkMediaType(mediaType = "image/jpeg", type: string) {
    return mediaType.toLowerCase().startsWith(type);
}

export default checkMediaType;
