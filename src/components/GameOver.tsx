import * as React from 'react'

interface IGameOverProps {
  isShow: boolean
  isMyWin: boolean
  onRestartGame: () => void
}

const GameOver: React.FC<IGameOverProps> = ({ isShow, isMyWin, onRestartGame }) => {

  return isShow
    ? (
      <div className='game-over'>
        <b className={isMyWin ? 'win' : 'lose'}>
          {isMyWin ? 'You won!' : 'You lost!'}
        </b>
        <button className='game-over-btn' onClick={onRestartGame}>Try it again?</button>
      </div>
    ) : null
};

export default GameOver;
