/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, ReactElement } from 'react';
import Tab from './Tab';

interface IGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactElement<typeof Tab>[]
};

const styles = {
  root: {
    base: css({
      display: 'flex',
      gap: '5px',
      alignItems: 'flex-end',
    })
  }
}

const Group: FC<IGroupProps> = ({ children, ...other }) => {
  console.log(children)
  return (
    <div
      css={[
        styles.root.base
      ]}
      {...other}
    >
      {children}
    </div>
  )
};

export default Group;