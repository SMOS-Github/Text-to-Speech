const options = document.querySelectorAll('[type="range"],[name="text"]');
const voicesDopdown = document.querySelector('[name="voice"]');
const playBtn = document.querySelector(".play");
const stopBtn = document.querySelector(".stop");
const message = new SpeechSynthesisUtterance();

let voices = [];
message.text = document.querySelector('[name="text"]').value;

function ShowVoiceModules() {
    voices = this.getVoices();
    const voiceOptions = voices
        .map(voice => `<option value="${voice.name}">${voice.name}(${voice.lang})</opton>`)
        .join('');
    voicesDopdown.innerHTML = voiceOptions;

}

function SetVoice() {
    message.voice = voices.find(voice => voice.name === this.value);
    Toggle();
}
function Toggle(speaking = true) {
    speechSynthesis.cancel();
    if (speaking) {
        speechSynthesis.speak(message);
    }
}
function SetOption() {

    message[this.name] = this.value;
    Toggle();
}
speechSynthesis.addEventListener('voiceschanged', ShowVoiceModules);
voicesDopdown.addEventListener('change', SetVoice);
options.forEach(option => option.addEventListener('change', SetOption));
playBtn.addEventListener('click', Toggle);
stopBtn.addEventListener('click', () => Toggle(false));