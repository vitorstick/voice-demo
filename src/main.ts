import './style.css';
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <!-- FIRST PART: LISTENING TO THE USER -->
    <section class="card" aria-labelledby="listen-heading">
      <h2 id="listen-heading">Listen to my voice!</h2>
      <div class="card">
        <button id="listen" type="button" aria-controls="speechResult" aria-live="polite" aria-label="Button to start speech recognition">
          Start listening!
        </button>
      </div>
      <div class="card">
        <label for="speechResult">Speech Result:</label>
        <div id="speechResult" aria-live="assertive"></div>
      </div>
    </section>

    <!-- SECOND PART: SPEAKING TO THE USER -->
    <section class="card" aria-labelledby="talk-heading">
      <h2 id="talk-heading">Talk to me!</h2>
      <div class="card">
        <button id="talk" type="button" aria-label="Start speech synthesis to talk to the user">
          Start talking!
        </button>
      </div>
    </section>

    <!-- THIRD PART: CHANGE MY WEBSITE COLOR -->
    <section class="card" aria-labelledby="color-change-heading">
      <h2 id="color-change-heading">Change my website color!</h2>
      <div class="card">
        <button id="colorChange" type="button" aria-controls="colorResult">
          Change color!
        </button>
      </div>
      <label for="colorResult">Color: </label>
      <div id="colorResult" aria-live="polite"></div>
    </section>

    <div class="card">
      <label for="languageSelect">Language: </label>
      <select id="languageSelect" aria-label="Select the language for speech recognition and synthesis">
        <option value="en-US">English (US)</option>
        <option value="pt-PT">Português (Portugal)</option>
      </select>
    </div>
  </main>
`;

const languageSelect = document.getElementById(
  'languageSelect'
) as HTMLSelectElement;

// FIRST PART: LISTENING TO THE USER
const listenButton = document.getElementById('listen');
listenButton?.addEventListener('click', () => {});

// SECOND PART: SPEAKING TO THE USER
const talkButton = document.getElementById('talk');

talkButton?.addEventListener('click', () => {});
