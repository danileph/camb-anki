/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Typography from 'components/UI/Typography/Typography';
import { FC } from 'react';
import bullet from 'assets/icons/bullet.svg';

interface IExampleProps extends Omit< React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: string[]
};

const styles = {
  root: {
    base: css({
      fontSize: '12px',
      fontStyle: 'italic',
      paddingLeft: '16px',
      margin: 0,
      'li': {
        listStyleImage: `url(${bullet})`,
        marginBottom: '8px',
        ':last-child': {
          marginBottom: 0
        }
      }
    })
  }
}

const Example: FC<IExampleProps> = ({ children }) => {
  return (
    <ul css={styles.root.base}>
      {children.map((child) => (
        <li>{child}</li>
      ))}
    </ul>
  )
};

export default Example;