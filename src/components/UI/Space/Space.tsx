/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

interface ISpaceProps extends React.HTMLAttributes<HTMLElement> {
  css?: {}
};

const styles = {
  base: css({
    display: 'flex',
  })
}

const Space: FC<ISpaceProps> = ({ children, css, ...other }) => {
  return (
    <div
      css={[
        styles.base,
        css
      ]}
      {...other}
    > 
      {children}
    </div>
  )
};

export default Space;