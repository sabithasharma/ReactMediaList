/**
 * @name - App
 * @description - Single screen which loads header and landing screen
 */
import React from 'react';
import LandingScreen from '../landingScreen/landingScreen';
import Header from '../header/header';
import './app.css';

export default function App() {
  return (
    <div id="app">
      <Header />
      <LandingScreen />      
    </div>
  );
}
