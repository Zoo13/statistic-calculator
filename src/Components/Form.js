import { useState } from 'react';
import Input from './Input';
import './Form.css';
import Output from './Output';

const Form = () => {
    const [team, setTeam] = useState('');
    const [stats, setStats] = useState([]);
    const [totalGames, setTotalGames] = useState(5);
    const [playedHomeGames, setPlayedHome] = useState([]);
    const [playedAwayGames, setPlayedAwayGames] = useState([]);
    const [resetKey, setResetKey] = useState(Date.now());

    const teamName = (event) => {
        setTeam(event.target.value);
    };

    const plusGame = () => {
        setTotalGames(prevTotal => prevTotal + 1);
    };

    const calculate = () => {
        let arrayOfObj = Object.values(stats);
        const homeGames = arrayOfObj.filter(member => member.played === 'home');
        const awayGames = arrayOfObj.filter(member => member.played === 'away');
        setPlayedHome(homeGames);
        setPlayedAwayGames(awayGames);
    };

    const takeStats = (newStats) => {
        setStats(prevStats => ({
            ...prevStats,
            [newStats.game]: newStats
        }));
    };

    const minusGame = () => {
        setTotalGames(prevTotal => {
            const newTotal = Math.max(prevTotal - 1, 1);
            const updatedStats = { ...stats };
            for (let i = newTotal + 1; i <= prevTotal; i++) {
                delete updatedStats[i];
            }
            setStats(updatedStats);
            return newTotal;
        });
    };

    const reset = () => {
        setTeam('');
        setStats([]);
        setTotalGames(5);
        setPlayedHome([]);
        setPlayedAwayGames([]);
        setResetKey(Date.now()); // Update the reset key
    };

    return (
        <div className='both__container'>
            <div className="form__container">
                <div>
                    <h3 style={{ margin: 0 }}>TeamName</h3>
                    <input className='Team__1' onChange={teamName} value={team} />
                    <h1>{team}</h1>
                </div>
                <div className='buttons'>
                    <button onClick={plusGame}> + Game</button>
                    <button onClick={minusGame}> - Game</button>
                </div>
                {Array.from({ length: totalGames }).map((_, index) => (
                    <Input team={team} key={index} game={index + 1} takeStats={takeStats} resetKey={resetKey} />
                ))}
                <button type='submit' onClick={calculate} className='calculate'>Calculate </button>
                <button className='reset' onClick={reset}>Reset </button>
                <Output
                    totalGames={totalGames}
                    homeGames={playedHomeGames}
                    awayGames={playedAwayGames}
                />
            </div>
        </div>
    );
};

export default Form;