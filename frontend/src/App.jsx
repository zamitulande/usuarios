import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './components/User'
import {ThemeProvider } from '@mui/material'
import Routes from './routes/Routes'
import { getTheme } from './config/Theme'

function App() { 
  return (
    <ThemeProvider theme={getTheme}>
      <Routes/>
    </ThemeProvider>
  )
}

export default App
