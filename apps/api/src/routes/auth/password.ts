import { z } from 'zod';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { makeRouter } from '@/utils/routes';
import { NotFoundError } from '@/utils/error';
import { timeout } from '@/utils/timeout';
import { resetPasswordEmail } from '@/modules/emails/templates/reset-password';
import { passwordSchema } from '@/utils/zod';
import { hashPassword } from '@/utils/auth/pass';
import { createSession, makeSessionToken } from '@/utils/auth/session';
import { mapExpandedUser } from '@/mappings/user';

export const passwordAuthrouter = makeRouter((app) => {
  app.post(
    '/api/v1/auth/password-reset',
    {
      schema: {
        description: 'Request password reset',
        body: z.object({
          email: z.string().min(1),
        }),
      },
    },
    handler(async ({ body }) => {
      // wait a few seconds, to prevent timing attacks
      const timeoutPromise = timeout(2000);

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        await timeoutPromise;
        return { success: true }; // always return success, to prevent email enumeration
      }

      try {
        await resetPasswordEmail.send({
          to: user.email,
          props: {
            resetLink: 'https://google.com', // TODO create valid link with a token
          },
        });
      } catch {
        // ignore all errors, we do not want to leak that it's a valid user email
      }

      await timeoutPromise;
      return { success: true };
    }),
  );

  app.post(
    '/api/v1/auth/password-reset/submit',
    {
      schema: {
        description: 'Submit a password reset',
        body: z.object({
          token: z.string().min(1),
          newPassword: passwordSchema(),
        }),
      },
    },
    handler(async ({ body }) => {
      // TODO check for valid token (security stamp has to match)
      const userId = 'abc'; // TODO extract from token

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new NotFoundError();

      const newUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          passwordHash: await hashPassword(body.newPassword),
          // TODO generate new security stamp
        },
        include: {
          orgMembers: true,
          projectMembers: {
            include: {
              project: true,
            },
          },
        },
      });
      const session = await createSession(newUser);
      return {
        user: mapExpandedUser(newUser),
        token: makeSessionToken(session.id),
      };
    }),
  );
});
