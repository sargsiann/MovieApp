import Paths from './routes'
import { ConfigProvider, theme } from 'antd'
import { use, useEffect } from 'react';
import "antd/dist/reset.css";
import { useSelector } from 'react-redux';
import { fetchMovieGenres } from './api/getData';



function App() {
	// Hooks for manageing themes

	const darkMode = useSelector((state: any) => state.theme.darkMode);

	// Saveing the theme to local storage
	useEffect(() => {
		// Toggle dark mode
		document.body.style.backgroundColor = darkMode ? "#1f1f1f" : "#fff";
		document.body.style.color = darkMode ? "#fff" : "#000";


		localStorage.setItem("darkMode", darkMode.toString());
	  }, [darkMode]);
	
	  useEffect(() => {
		const genres = fetchMovieGenres();
		console.log("Fetched genres:", genres);
	  },[]);
	
	
	return (
		<ConfigProvider
		theme={{
		  algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
		  token: {
			colorPrimary: darkMode ? "#7b61ff" : "#1890ff",
			colorBgBase: darkMode ? "#0f0f30" : "#ffffff",
			colorTextBase: darkMode ? "#e0e0ff" : "#000000",
	  
			colorBgContainer: darkMode ? "#1a1a40" : "#f0f0f0",
			colorBorder: darkMode ? "#4b4f7d" : "#d9d9d9",
			colorError: darkMode ? "#ff4d6d" : "#ff4d4f",
			colorSuccess: darkMode ? "#73d13d" : "#52c41a",
			colorWarning: darkMode ? "#ffc53d" : "#faad14",
			colorInfo: darkMode ? "#91d5ff" : "#1890ff",
	  
			colorBgLayout: darkMode ? "#12122b" : "#fff",
			colorTextDisabled: darkMode ? "#8c8c8c" : "#bfbfbf"
		  },
		  
		}}
	  >
		<Paths />
	  </ConfigProvider>
	)
}

export default App
