import Audio from './src/components/atoms/audio/Audio.js';
import { Lobby } from './src/pages/Lobby/Lobby';
import './style.css';

// Main Menu Soundtrack
Audio('/src/assets/audio/music/Main-soundtrack.mp3', true, true);

Lobby();
