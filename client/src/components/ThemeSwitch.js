import React, { useRef, useEffect, useState } from 'react';

// https://www.npmjs.com/package/react-theme-switch
const ThemeSwitch = ({ preserveRasters = true, storeKey = 'ThemeSwitch' }) => {
    const cssString = `
        html { filter: invert(100%); background: #fefefe; }
        * { background-color: inherit }
      `;
    const rasterCss =
        'img:not([src*=".svg"]), video, [style*="url("], .sun-times, .flag, .slider { filter: invert(100%) }';

    const isDeclarationSupported = (property, value) => {
        const prop = property + ':',
            el = document.createElement('test'),
            mStyle = el.style;
        el.style.cssText = prop + value;
        return mStyle[property];
    };

    const supported = useRef(!!isDeclarationSupported('filter', 'invert(100%)'));

    const [css, setCss] = useState(cssString);
    const [active, setActive] = useState(
        localStorage.getItem(storeKey) === 'true' || (!localStorage.getItem(storeKey) && matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (preserveRasters) {
            setCss(`${cssString} ${rasterCss}`);
        }
        return () => {
            setCss(cssString);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preserveRasters]);

    useEffect(() => {
        localStorage.setItem(storeKey, active);
    }, [active, storeKey]);

    const toggle = () => {
        setActive(a => !a);
    };

    return (
        supported.current && (
            <div>
                <label id="switch" className="switch">
                    <input type="checkbox" onChange={toggle} id="slider" checked={!active}/>
                    <span className="slider round"></span>
                </label>
                <style media={active ? 'screen' : 'none'}>
                    {active ? css.trim() : css}
                </style>
            </div>
        )
    );
};

export default ThemeSwitch;