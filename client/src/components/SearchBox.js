import { useState, useContext, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import useFirstRender from '../hooks/useFirstRender';
import axios from 'axios';

// const base = "https://api.openweathermap.org/data/2.5/weather?q=";
// const key = "00fa81d1d7c66ef685600b094490df4a";
const GeoCityUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const GeoCityHeaders = {
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    'X-RapidAPI-Key': '86159da102msh819392eff4522f8p187c3bjsnc56a34f645ab'
}
// const GoogleApiKey = "AIzaSyDt-I2-FWKKVnzysvPJKZRtf1bGk2m2EtA";

export const SearchBox = () => {

    const renderCount = useFirstRender();

    // query is used in GET request to fetch weather data
    const [query, setQuery] = useState('');
    
    // suggestion contains list of places for autocomplete
    const [suggestion, setSuggestion] = useState('');

    // active selects single entry from suggestions for selection/highlight
    const [active, setActive] = useState(0);
    
    // show is used to show/hide autocomplete list
    const [isShow, setIsShow] = useState(false);
    
    // input is displayed in search box
    const [input, setInput] = useState("");

    // import search method from context. 
    // Used to make GET request for weather data using query
    const { search } = useContext(WeatherContext);

    // if query is updated, useEffect triggers search() and clears input (search-bar)
    useEffect(() => {

        if (renderCount) {
            // typeof query !== "undefined" && search();
            search(query);
            setInput('');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // if input (text value of search bar input element) updates,
    // it triggers this useEffect which makes GET request to api
    // for list of cities with name prefix as input
    // if input empty or default placeholder, clear suggestions
    // else: define async function to make the request,
    // if input is greater than 2 letters, call the function 
    // and set isShow to true to show list of autocomplete cities
    useEffect(() => {

        if (renderCount) {
            if (input === "" || input === 'Search any city/country...') {
                setSuggestion('');
            } else {
                async function fetchData() {
                    try {
                        const options = {
                            method: 'GET',
                            url: GeoCityUrl,
                            params: { limit: '5', types: 'CITY', minPopulation: '100000', namePrefix: input, sort: '-population' },
                            headers: GeoCityHeaders
                        };
                        const res = await axios.request(options);
                        const names = res.data.data.map(data => { return data.name });
                        setSuggestion('')
                        renderAutocomplete();
                        setSuggestion(names);
                        renderAutocomplete();
                    } catch (error) {
                        console.error(error);
                    }
                };
                input.length > 2 && fetchData() && setIsShow(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])

    // onClick  function triggered when we press enter (or mouse click) 
    // on highlighted city in list of autocomplete.
    // reset active (highlight number) to 0, hide autocomplete & update query
    const onClick = e => {
        setActive(0);
        setIsShow(false);
        setQuery(e.currentTarget.innerText);
    };

    // On pressing keys while typing in search box
    // enter to update query wit selected city in list of autocomplete
    // up/down keys to highlight up/down from list of autocomplete 
    const onKeyDown = e => {
        if (e.keyCode === 13) { // enter key
            setActive(0);
            setIsShow(false);
            setQuery(suggestion[active]);
            setInput('');
        }
        else if (e.keyCode === 38) { // up arrow
            return (active === 0) ? null : setActive(active - 1);
        }
        else if (e.keyCode === 40) { // down arrow
            return (active - 1 === suggestion.length) ? null : setActive(active + 1);
        }
    };

    // component to show list of city based on names fetched from api 
    // using input prefix
    const renderAutocomplete = () => {
        // console.log(isShow, input, suggestion)
        if (isShow && input) {
            if (suggestion.length) {
                return (
                    <ul className="autocomplete">
                        {suggestion.map((suggestion, index) => {
                            let className;
                            if (index === active) {
                                className = "active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className="no-autocomplete">
                        <em>Not found</em>
                    </div>
                );
            }
        }
        return <></>;
    }

    // return search box with autocomplete
    return (
        <div className="search-box">
            <button className="btn-search"><i className="fas fa-search"></i></button>
            <input
                type="text"
                className="input-search"
                placeholder="Search any city/country..."
                onChange={e => setInput(e.target.value)}
                value={input}
                onKeyDown={onKeyDown}
                autoFocus
            />
            {renderAutocomplete()}
        </div>
    )
}