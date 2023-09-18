interface IMyActionsProps {
  isMyAttack: boolean;
  onRepulsed: () => void;
  onGetCard: () => void;
}

const MyActions: React.FC<IMyActionsProps> = ({
  isMyAttack,
  onRepulsed,
  onGetCard,
}) => {

  const classes = ["btn-actions"];
  
  if (!isMyAttack) {
    classes.push("red-btn");
  }

  return (
    <button onClick={isMyAttack ? onRepulsed : onGetCard} className={classes.join(' ')}>
      {isMyAttack ? "Done" : "Get"}
    </button>
  );
};

export default MyActions;
