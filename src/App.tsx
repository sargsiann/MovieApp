import Paths from './routes'
import { Button, ConfigProvider, theme } from 'antd'
import { useEffect, useState } from 'react';
import "antd/dist/reset.css";


function App() {
	// Hooks for manageing themes
	const [darkMode, setDarkMode] = useState(() => {  
		const saved = localStorage.getItem("darkMode");
    	return saved === "true" ? true : false
	});

	// Saveing the theme to local storage
	useEffect(() => {
		// Toggle dark mode
		document.body.style.backgroundColor = darkMode ? "#1f1f1f" : "#fff";
		document.body.style.color = darkMode ? "#fff" : "#000";

		localStorage.setItem("darkMode", darkMode.toString());
	  }, [darkMode]);
	
	
	return (
		<ConfigProvider
		theme={{
		  algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
		}}
	  >
		<Paths />
	  </ConfigProvider>
	)
}

export default App
