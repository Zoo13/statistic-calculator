import { useEffect, useState } from 'react';

const Input = (props) => {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [home_away, setHome_Away] = useState('');

  const [stats, setStats] = useState({
    game: props.game,
    played: '',
    total: 0,
    teamThrowIns: 0,
    againstTeamThrowIns: 0,
  });

  const firstInputValue = (event) => {
    setFirstInput(event.target.value);
  };

  const secondInputValue = (event) => {
    setSecondInput(event.target.value);
  };

  const homeOrAway = (event) => {
    setHome_Away(event.target.value);
  };

  const calcul = () => {
    const newStats = {
      game: props.game,
      played: home_away,
      total: Number(firstInput) + Number(secondInput),
      teamThrowIns: home_away === 'home' ? Number(firstInput) : Number(secondInput),
      againstTeamThrowIns: home_away === 'home' ? Number(secondInput) : Number(firstInput),
    };
    setStats(newStats);
  };

  useEffect(() => {
    calcul();
  }, [firstInput, secondInput, home_away]);

  useEffect(() => {
    props.takeStats(stats);
  }, [stats]);

  useEffect(() => {
    setFirstInput('');
    setSecondInput('');
    setHome_Away('');
    setStats({
      game: props.game,
      played: '',
      total: 0,
      teamThrowIns: 0,
      againstTeamThrowIns: 0,
    });
  }, [props.resetKey]);

  return (
    <div className='input__div'>
      <input
        type="radio"
        name={`home-away-${props.game}`}
        value="home"
        onChange={homeOrAway}
        checked={home_away === 'home'}
      />
      <input
        className='input__field'
        type='number'
        onChange={firstInputValue}
        value={firstInput}
      />
      <h5>Game {props.game}</h5>
      <input
        className='input__field'
        type='number'
        onChange={secondInputValue}
        value={secondInput}
      />
      <input
        type="radio"
        name={`home-away-${props.game}`}
        value="away"
        onChange={homeOrAway}
        checked={home_away === 'away'}
      />
    </div>
  );
};

export default Input;