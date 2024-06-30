import { Heading, Text } from '@react-email/components';
import type { ReactNode } from 'react';

const styles = {
  paragraph: {
    margin: '0 0 15px',
    fontSize: '15px',
    lineHeight: '1.4',
    color: '#3c4149',
  },
  heading: {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
  },
} as const;

export function LclParagraph(props: { children?: ReactNode }) {
  return <Text style={styles.paragraph}>{props.children}</Text>;
}

export function LclHeading(props: { children?: ReactNode }) {
  return <Heading style={styles.heading}>{props.children}</Heading>;
}

export const Txt = {
  Heading: LclHeading,
  Paragraph: LclParagraph,
};
