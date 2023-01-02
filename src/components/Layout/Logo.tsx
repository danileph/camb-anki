/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { FC } from "react";
import { theme } from "utils/theme";
import { ReactComponent as LogoIcon } from "assets/icons/Logo.svg";
import { useRecoilState } from "recoil";
import { isSearchingState } from "store/isSearching";
import { BounceLoader } from "react-spinners";
import wreath from "assets/christmas/wreath.png";
import { useProgressiveImage } from "../../hooks/useProgressiveImage";

interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
  shrincted?: boolean;
}

const Logo: FC<ILogoProps> = ({ shrincted = false, ...other }) => {
  const [isSearching] = useRecoilState(isSearchingState);
  const wreathImage = useProgressiveImage(wreath);

  const styles = {
    base: css({
      width: "100px",
      height: "100px",
      // width: "80px",
      // height: "80px",
      background: theme.palette.primary.normal,
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "calc(90px/2 - 5px)",
      transition: theme.transition,
      "> div": {
        width: "75px",
        height: "75px",
        // width: "60px",
        // height: "60px",
        background: theme.palette.secondary.normal,
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: theme.transition,
        // "&:before": {
        //   content: '""',
        //   display: "inline-block",
        //   width: 135,
        //   height: 135,
        //   position: "absolute",
        //   backgroundImage: `url(${wreathImage})`,
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   transition: theme.transition,
        // },
      },
    }),
    // shrincted: css({
    //   "> div": {
    //     "&:before": {
    //       content: '""',
    //       display: "inline-block",
    //       width: 90,
    //       height: 90,
    //       position: "absolute",
    //       backgroundImage: `url(${wreathImage})`,
    //       backgroundPosition: "center",
    //       backgroundRepeat: "no-repeat",
    //       backgroundSize: "cover",
    //       transition: theme.transition,
    //     },
    //   },
    // }),
    imgWrap: css({
      position: "relative",
      "& > *": {
        marginTop: "5px",
        transition: theme.transition,
      },
    }),
    spinner: css({
      position: "absolute",
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      marginTop: "0px",
    }),
  };

  return (
    <div css={[styles.base]} {...other}>
      <div css={styles.imgWrap}>
        <LogoIcon />
        {isSearching && (
          <div css={styles.spinner}>
            <BounceLoader
              color={theme.palette.primary.darkest}
              size={shrincted ? "50px" : "75px"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
