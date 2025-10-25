// Selectors
const lookupWords = document.querySelectorAll('.lookup');
const popup = document.getElementById('definition-popup');
const popupWord = document.getElementById('popup-word');
const popupPronunciation = document.getElementById('popup-pronunciation');
const popupDefinition = document.getElementById('popup-definition');
const popupExample = document.getElementById('popup-example');
const closePopup = document.getElementById('close-popup');

// Fetch word info from Wiktionary API
async function fetchDefinition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    const entry = data[0];

    popupWord.textContent = entry.word || word;
    popupPronunciation.textContent = entry.phonetic ? `Pronunciation: ${entry.phonetic}` : "";
    popupDefinition.textContent = entry.meanings[0]?.definitions[0]?.definition || "No definition found.";
    popupExample.textContent = entry.meanings[0]?.definitions[0]?.example
      ? `"${entry.meanings[0].definitions[0].example}"`
      : "";
  } catch {
    popupWord.textContent = word;
    popupDefinition.textContent = "Definition not found.";
    popupPronunciation.textContent = "";
    popupExample.textContent = "";
  }
}

// Event listeners
lookupWords.forEach(word => {
  word.addEventListener('click', () => {
    fetchDefinition(word.textContent.trim());
    popup.classList.remove('hidden');
  });
});

closePopup.addEventListener('click', () => popup.classList.add('hidden'));
popup.addEventListener('click', e => {
  if (e.target === popup) popup.classList.add('hidden');
});
