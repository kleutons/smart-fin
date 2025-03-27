import SHA256 from 'crypto-js/sha256';

export default function generateHash(password: string) {
    const hash = SHA256(password).toString();
    return hash;
}