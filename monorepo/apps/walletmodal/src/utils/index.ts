export function stellarShortenAddress(address: string){
    return address.slice(0, 3) + '...' + address.slice(address.length - 4);
}