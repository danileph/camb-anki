import Button from 'components/UI/Button/Button';
import { FC } from 'react';
import { ReactComponent as IconAudio } from 'assets/icons/audio.svg';

interface IAudioButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  audioSrc: string;
};

const AudioButton: FC<IAudioButtonProps> = ({ audioSrc, ...other }) => {

  const play = () => {
    const audio = new Audio(audioSrc);
    audio.play();
  }

  const handleClick = () => {
    play();
  }

  return (
    <Button 
      link
      onClick={() => handleClick()}
      {...other}
    >
      <IconAudio />
    </Button>
  )
};

export default AudioButton;