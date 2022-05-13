import { useRef } from 'react';

// on  first render it returns false and after that always true
// used to avoid rendering some components on first render
export default function useFirstRender() {
    const ref = useRef(false);
    const firstRender = ref.current;
    ref.current = true;
    return firstRender;
}