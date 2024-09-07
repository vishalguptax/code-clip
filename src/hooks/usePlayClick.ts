import useSound from "use-sound";

const clickSound = "/assets/sounds/click.mp3";

export const usePlayClick = () => {
  const [play] = useSound(clickSound);

  return play;
};
