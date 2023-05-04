import '../styles/SiteThemeSelector.css'
import { useEffect } from 'react';

function SiteThemeSelector(props) {
    useEffect(() => {
        if (localStorage.getItem('site-theme')) {  //is false if site-theme key exists but has no value (i.e default theme)
            let theme = localStorage.getItem('site-theme');
            document.body.classList.add(theme);
        }
    }, []);

    const onClickTheme = (themeName) => {
        document.body.setAttribute("class", ""); //clears the classList

        if (themeName)  //required since adding '' to classlist causes error
            document.body.classList.add(themeName);

        localStorage.setItem("site-theme", themeName);
    }

    return (
        <div className="site-theme-container">
            <div className="theme-select-label">Site Theme</div>

            <div className="theme-button default" onClick={() => onClickTheme('site-theme-light')}>
                <div className="hover-info top">Light</div>
                A
            </div>


            <div className="theme-button dark" onClick={() => onClickTheme('')}>
                <div className="hover-info top">Dark</div>
                A
            </div>
        </div>
    );

}

export default SiteThemeSelector;