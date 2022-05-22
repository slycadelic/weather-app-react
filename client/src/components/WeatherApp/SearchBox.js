import { useState, useContext, useEffect } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import useFirstRender from '../../hooks/useFirstRender';
import axios from 'axios';

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
    const { search, setPlaying } = useContext(WeatherContext);

    // if query is updated, useEffect triggers search() and clears input (search-bar)
    useEffect(() => {

        if (renderCount) {
            setPlaying(false);
            // console.log(query);
            search(query);
            setInput('');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // triggers when change in input, populates autocomplete list of city names
    useEffect(() => {

        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        const options = {
            method: 'GET',
            url: 'https://referential.p.rapidapi.com/v1/city',
            params: { lang: 'en', prefix: input, sort: 'population', order: 'desc', limit: '7' },
            headers: {
                'X-RapidAPI-Host': 'referential.p.rapidapi.com',
                'X-RapidAPI-Key': '86159da102msh819392eff4522f8p187c3bjsnc56a34f645ab'
            }
        };

        if (renderCount) {
            if (input === "" || input === 'Search any city..' || input.length < 2) {
                setSuggestion('');
                renderAutocomplete();
            } else {
                try {
                    (async function () {
                        const res = await axios.request(options);
                        const names = res.data
                            .map(data => { return data.value })
                            .filter((value, index, self) => self.indexOf(value) === index);
                        setIsShow(true);
                        setSuggestion(names);
                    })();
                } catch (error) {
                    console.log(error);
                }
                return () => {
                    source.cancel();
                };
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])

    useEffect(() => {
        renderAutocomplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[suggestion])

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
        // console.log(active)
        if (e.keyCode === 13) { // enter key
            setActive(0);
            setIsShow(false);
            if (active > -1) {setQuery(suggestion[active])}
            else {setQuery(input)};
            setInput('');
        }
        else if (e.keyCode === 38) { // up arrow
            return (active === -1) ? null : setActive(active - 1);
        }
        else if (e.keyCode === 40) { // down arrow
            return (active - 1 === suggestion.length) ? null : setActive(active + 1);
        }
    };

    // component to show list of city based on names fetched from api 
    // using input prefix
    const renderAutocomplete = () => {
        // console.log(isShow, input, suggestion);
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
                placeholder="Search any city.."
                onChange={e => setInput(e.target.value)}
                value={input}
                onKeyDown={onKeyDown}
                autoFocus
            />
            {renderAutocomplete()}
        </div>
    )
}