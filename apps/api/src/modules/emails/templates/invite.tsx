import type { InviteType } from '@/routes/invite';
import { makeEmailRenderer } from '../builder';
import { EmailContainer } from '../components/container';
import { Txt } from '../components/text';

interface InviteEmailProps {
  inviteLink: string;
  orgName: string;
  projectName?: string;
  type: InviteType;
}

// TODO better email template

export default function InviteEmail(props: InviteEmailProps) {
  const displayName =
    props.type === 'project' ? props.projectName ?? '' : props.orgName;
  return (
    <EmailContainer preview="You have been invited to Locali">
      <Txt.Heading>Invited to {displayName}</Txt.Heading>
      <Txt.Paragraph>
        Click the link below to accept the invitation to {displayName}.
      </Txt.Paragraph>
      <Txt.Paragraph>{props.inviteLink}</Txt.Paragraph>
    </EmailContainer>
  );
}

InviteEmail.PreviewProps = {
  inviteLink: 'https://example.com',
  orgName: 'John orgs',
  type: 'project',
  projectName: 'Johns project',
} satisfies InviteEmailProps;

export const inviteEmail = makeEmailRenderer({
  template: InviteEmail,
  subject() {
    return 'You have been invited to Locali';
  },
});
