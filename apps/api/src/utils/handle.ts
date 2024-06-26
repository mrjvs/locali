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
};

export function handle<
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
  handler: (
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
  const reqHandler: any = async (req: any, res: any) => {
    let result: any = handler({
      req,
      res,
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (result instanceof Promise) result = await result;
    res.send(result);
  };
  return reqHandler;
}
