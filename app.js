const message = new SpeechSynthesisUtterance();
//console.log(message);
let voices = [];
const voicesDopdown = document.querySelector('[name="voice"]');//this style tells that element can access the inside element without calling like array of foreach
//console.log(voicesDopdown);
const options = document.querySelectorAll('[type="range"],[name="text"]');
//console.log(options);

const playBtn = document.querySelector(".play");
const stopBtn = document.querySelector(".stop");
message.text = document.querySelector('[name="text"]').value;

//console.log(message.text);

function ShowVoiceModules() {
    voices = this.getVoices();
    //console.log(voices); //show all voices data availabe according to os and browser in Edge its around 400 voice modules
    const voiceOptions = voices
        .map(voice => `<option value="${voice.name}">${voice.name}(${voice.lang})</opton>`)
        .join('');
    voicesDopdown.innerHTML = voiceOptions;

    console.log(voiceOptions);
}

function SetVoice() {
    console.log(this.value);
    message.voice = voices.find(voice => voice.name === this.value);
    Toggle();
}
function Toggle(speaking=true) {
    speechSynthesis.cancel();
    if (speaking) {
        speechSynthesis.speak(message);
    }
}
function SetOption() {
    console.log(this.name, this.value);
    message[this.name] = this.value;
    Toggle();
}
speechSynthesis.addEventListener('voiceschanged', ShowVoiceModules);
voicesDopdown.addEventListener('change', SetVoice);

options.forEach(option =>
    option.addEventListener('change', SetOption)
);

playBtn.addEventListener('click', Toggle);
stopBtn.addEventListener('click', () => Toggle(false));
