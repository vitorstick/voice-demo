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
listenButton?.addEventListener('click', () => {
  // Check if the browser supports SpeechRecognition
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('SpeechRecognition is not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = languageSelect?.value || 'en-US';
  // IF TRUE, THE SPEECH RECOGNITION WILL RETURN INTERIM RESULTS
  // RETURNING RESULTS AS THE USER SPEAKS
  // IF FALSE, THE SPEECH RECOGNITION WILL RETURN ONLY FINAL RESULTS
  recognition.interimResults = false;
  // MAXIMUM NUMBER OF ALTERNATIVES TO RETURN
  // IF 1, ONLY THE BEST RESULT WILL BE RETURNED
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    listenButton.textContent = 'Listening...';
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    console.log('onresult ', event);
    const transcript = event.results[0][0].transcript;
    const speechResultDiv = document.getElementById('speechResult');
    if (speechResultDiv) {
      speechResultDiv.textContent = `${transcript}`;
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    alert(`Error occurred in recognition: ${event.error}`);
  };

  recognition.onend = () => {
    listenButton.textContent = 'Start listening!';
  };

  recognition.onnomatch = (event: SpeechRecognitionEvent) => {
    alert(`No match found: ${event.results[0][0].transcript}`);
  };

  recognition.start();
});

// SECOND PART: SPEAKING TO THE USER
const talkButton = document.getElementById('talk');

talkButton?.addEventListener('click', () => {
  const speechResultDiv = document.getElementById('speechResult');

  const SpeechSynthesis = window.speechSynthesis;
  let textToSpeak = speechResultDiv?.textContent || 'Hello, how are you?';
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = languageSelect?.value || 'en-US';
  // Controls the speed at which the text is spoken
  // Values range from 0.1 (very slow) to 10 (very fast)
  utterance.rate = 1;
  // Adjusts the pitch of the voice
  // Changing pitch can make the voice sound deeper or higher
  utterance.pitch = 1;

  utterance.onstart = () => {
    talkButton.textContent = 'Talking...';
  };

  utterance.onend = () => {
    talkButton.textContent = 'Start talking!';
  };

  utterance.onerror = (event: Event) => {
    alert(`Error occurred in speech synthesis: ${event}`);
  };

  utterance.onpause = () => {
    talkButton.textContent = 'Paused...';
  };
  utterance.onresume = () => {
    talkButton.textContent = 'Talking...';
  };
  utterance.onboundary = (event: Event) => {
    console.log('Boundary reached:', event);
  };

  SpeechSynthesis.speak(utterance);
});

// THIRD PART: CHANGE MY WEBSITE COLOR
const colorChangeButton = document.getElementById('colorChange');
const colorResultDiv = document.getElementById('colorResult');
const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'black',
  'white',
];

colorChangeButton?.addEventListener('click', () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('SpeechRecognition is not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = languageSelect?.value || 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    colorChangeButton.textContent = 'Listening...';
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const result = event.results[0][0].transcript.toLowerCase();
    console.log('result: ' + event.results[0][0]);

    if (colorResultDiv) {
      colorResultDiv.textContent = `You said: ${result}`;
    }
    if (colors.some((color) => result.includes(color))) {
      const foundColor = colors.find((color) => result.includes(color));
      if (foundColor) {
        document.body.style.backgroundColor = foundColor;
      }
    } else {
      alert(`Color not recognized: ${result}`);
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    alert(`Error occurred in recognition: ${event.error}`);
  };

  recognition.onend = () => {
    colorChangeButton.textContent = 'Change color!';
  };

  recognition.start();
});
