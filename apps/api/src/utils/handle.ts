import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { ResolveFastifyReplyReturnType } from 'fastify/types/type-provider';
import type { AuthContext } from './auth/context';
import { makeAuthContext } from './auth/context';

export type RequestContext<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends
    RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends
    RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
> = {
  req: FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    ZodTypeProvider,
    ContextConfig,
    Logger
  >;
  res: FastifyReply<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    ZodTypeProvider
  >;
  body: FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    ZodTypeProvider,
    ContextConfig,
    Logger
  >['body'];
  params: FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    ZodTypeProvider,
    ContextConfig,
    Logger
  >['params'];
  query: FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    ZodTypeProvider,
    ContextConfig,
    Logger
  >['query'];
  auth: AuthContext;
};

export function handler<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends
    RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends
    RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(
  reqHandler: (
    ctx: RequestContext<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      Logger
    >,
  ) => ResolveFastifyReplyReturnType<
    ZodTypeProvider,
    SchemaCompiler,
    RouteGeneric
  >,
): RouteHandlerMethod<
  RawServer,
  RawRequest,
  RawReply,
  RouteGeneric,
  ContextConfig,
  SchemaCompiler,
  ZodTypeProvider,
  Logger
> {
  const realHandler: any = async (req: any, res: any) => {
    const auth = await makeAuthContext(req);
    let result: any = reqHandler({
      req,
      res,
      body: req.body,
      params: req.params,
      query: req.query,
      auth,
    });
    if (result instanceof Promise) result = await result;
    res.send(result);
  };
  return realHandler;
}
