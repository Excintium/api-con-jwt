// src/auth/constants/jwt.constant.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'NO_USAR_EN_PROD',
  expiresIn: process.env.JWT_EXPIRES ?? '1d',
};
