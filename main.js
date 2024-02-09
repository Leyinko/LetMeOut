import { Lobby } from './src/pages/lobby/Lobby';
import Audio from './src/components/atoms/audio/Audio';
import './style.css';

// Main Menu Soundtrack
Audio('/src/assets/audio/music/Main-soundtrack.mp3', true, true);

Lobby();
