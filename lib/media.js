import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if(media){
    console.warn(media.data.name)
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl; 
  }
  return "/"
  
}