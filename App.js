import React from 'react'

import Navigations from './navigations/Navigations'
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Navigations/>
  );
}

