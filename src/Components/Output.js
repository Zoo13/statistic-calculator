import { useEffect, useState } from "react";

const Output = (props) => {

    const [throwInHome, setThrowInHome] = useState({})
    const [throwInAway, setThrowInAway] = useState({})

    const [playedHomeGames, setPlayedHome] = useState(props.homeGames);
    const [playedAwayGames, setPlayedAwayGames] = useState(props.awayGames);


    const calculate = () => {
        let homeTeam = 0;
        let homeAgainst = 0;
        let homeTotal = 0;
        let totalHomeGames = playedHomeGames.length;
        
        if (totalHomeGames > 0) {
            playedHomeGames.forEach(obj => {
                homeTeam += obj.teamThrowIns;
                homeAgainst += obj.againstTeamThrowIns;
                homeTotal += obj.total;
            });
            setThrowInHome(prev => ({
                ...prev,
                team: (homeTeam / totalHomeGames).toFixed(2),
                agains: (homeAgainst / totalHomeGames).toFixed(2),
                total: (homeTotal / totalHomeGames).toFixed(2)
            }));
        } else {
            setThrowInHome({
                team: "0.00",
                agains: "0.00",
                total: "0.00"
            });
        }
    
        let totalAwayGames = playedAwayGames.length;
        let awayTeam = 0;
        let awayAgainst = 0;
        let awayTotal = 0;
    
        if (totalAwayGames > 0) {
            playedAwayGames.forEach(obj => {
                awayTeam += obj.teamThrowIns;
                awayAgainst += obj.againstTeamThrowIns;
                awayTotal += obj.total;
            });
            setThrowInAway(prev => ({
                ...prev,
                team: (awayTeam / totalAwayGames).toFixed(2),
                agains: (awayAgainst / totalAwayGames).toFixed(2),
                total: (awayTotal / totalAwayGames).toFixed(2)
            }));
        } else {
            setThrowInAway({
                team: "0.00",
                agains: "0.00",
                total: "0.00"
            });
        }
    }

    useEffect(() => {
        calculate();

        setPlayedHome(props.homeGames)
        setPlayedAwayGames(props.awayGames)
    }, [playedHomeGames, playedAwayGames, props]);

    return (
        <div className="output_container">
            <div className="home_away">
                <h5>Home</h5>
                <h5>Away</h5>
            </div>
            <div className="for_against_total">
                <div className="throwIn">
                    <h5 style={{ color: 'green' }}> Average (team)</h5>
                    <h5 style={{ color: 'green' }}>{ throwInHome.team}</h5>
                    <h5 style={{ color: 'green' }}>{throwInAway.team}</h5>
                </div>
                <div className="throwIn">
                    <h5 style={{ color: '#CB3232' }}> Average (against)</h5>
                    <h5 style={{ color: '#CB3232' }}>{throwInHome.agains}</h5>
                    <h5 style={{ color: '#CB3232' }}>{throwInAway.agains}</h5>
                </div>
                <div className="throwIn">
                    <h5 style={{ color: 'white' }}>Average (total)</h5>
                    <h5 style={{ color: 'white' }}>{throwInHome.total}</h5>
                    <h5 style={{ color: 'white' }}>{throwInAway.total}</h5>
                </div>
            </div>

        </div>
    )
}



export default Output;