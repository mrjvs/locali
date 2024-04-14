import jwtLib, { type SignOptions } from 'jsonwebtoken';
import type { FastifyRequest } from 'fastify';
import { conf } from '@/config';
import { logger } from '@/modules/log';
import { StatusError } from '../error';

const alg = 'HS256';

export type AuthToken = {
  t: 'session';
  id: string;
};

export function parseAuthToken(input: string): null | AuthToken {
  try {
    const jwt = jwtLib.verify(input, conf.crypto.secret, {
      algorithms: [alg],
      complete: true,
    });
    if (typeof jwt.payload === 'string') return null;
    return jwt.payload as AuthToken;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

export function makeAuthToken(payload: AuthToken): string {
  const ops: SignOptions = {
    algorithm: alg,
  };
  return jwtLib.sign(payload, conf.crypto.secret, ops);
}

export function hasAuthorizationToken(request: FastifyRequest) {
  const { authorization } = request.headers;
  if (!authorization) return null;
  const headerParts: string[] = authorization.split(' ', 2);
  if (headerParts.length === 0 || headerParts[0] !== 'Bearer')
    throw new StatusError('wrong auth method', 401);
  return headerParts[1];
}

export function getAuthorizationToken(request: FastifyRequest) {
  const token = hasAuthorizationToken(request);
  if (!token) throw new StatusError('header missing', 401);
  return token;
}
