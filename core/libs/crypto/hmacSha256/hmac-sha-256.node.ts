import crypto from 'crypto';

export default function hmacSha256(value: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url'); // base64url 형태 추천
}
