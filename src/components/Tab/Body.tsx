/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  tabId: string,
  currentTab: string,
};

const styles = {
  root: {
    base: css({
      display: 'none',
    }),
    chosen: css({
      display: 'block'
    })
  }
}

const Body: FC<IBodyProps> = ({ children, currentTab, tabId }) => {
  return (
    <div
      css={[
        styles.root.base,
        tabId === currentTab && styles.root.chosen,
      ]}
    >
      {children}
    </div>
  )
};

export default Body;