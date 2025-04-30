import './style.css';
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Listen to my voice!</h1>
    <div class="card">
      <button id="listen" type="button">Start listening!</button>
    </div>
    <div class="card">
      <label for="speechResult">Speech Result:</label>
      <div id="speechResult"></div>
    </div>
    <div class="card">
      <button id="talk" type="button">Start talking!</button>
    </div>
    <div class="card">
      <label for="languageSelect">Language: </label>
      <select id="languageSelect">
        <option value="en-US">English (US)</option>
        <option value="pt-PT">Português (Portugal)</option>
      </select>
    </div>
  </div>
`;
