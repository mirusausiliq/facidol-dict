var LANGUAGES = {
  "default": {
    "language": "eng"
  },
  "eng": { 
    "head-title": "Facidol Dictionary",
    "nav-item-about": "About",
    "nav-item-lean": "Learn",
    "nav-item-dictionary": "Dictionary",
    "nav-item-resources": "Resources",
    "nav-item-vocabulary": "Vocabulary",
    "nav-item-grammar": "Grammar"
  },
  "chn": {
    "head-title": "巴基魯族語詞典",
    "nav-item-about": "關於",
    "nav-item-learn": "學習",
    "nav-item-dictionary": "辭典",
    "nav-item-resources": "資源",
    "nav-item-vocabulary": "詞彙",
    "nav-item-grammar": "語法"
  },
  "jpn": {
    "head-title": "ファジル辞書",
    "nav-item-about": "關於",
    "nav-item-learn": "勉強",
    "nav-item-dictionary": "辞書",
    "nav-item-resources": "リソース",
    "nav-item-vocabulary": "ボキャブラリー",
    "nav-item-grammar": "文法"
  },
  "ami": { // Amis
    "head-title": "O Citing no Facidol"
  },
  "tay": {},
  "bnn": {},
  "xnb": {},
  "ckv": {},
  "pwn": {},
  "pyu": {},
  "dru": {},
  "sxr": {},
  "xsy": {},
  "trv": {},
  "ssf": {},
  "tsu": {},
  "tao": {},
  "byq": {},
  "bzg": {},
  "uon": {},
  "pzh": {},
  "kae": {},
  "ppu": {},
  "fos": {},
  "tvx": {}
};

function updateData() {
  $.getJson("./dict/cecay.json", function(Data) {
    
  });
}

function refreshDynamicTexts() {
  if (progress[0] !== progress[1]) return;
  let curLang = LANGUAGES[current_language];
  let localTexts = curLang.texts;
  Object.entries(localTexts).forEach(([textId, value]) => {
      if (value instanceof Array)
          if (document.getElementById(textId) != undefined)
              document.getElementById(textId).innerHTML = randomChoice(value);
  });
}

function multiLangMutation() {
  let curLang = LANGUAGES[current_language];
  let localTexts = curLang.texts;
  Object.entries(localTexts).forEach(([textId, value]) => {
      if (!(value instanceof Array))
          if (document.getElementById(textId) != undefined)
              document.getElementById(textId).innerHTML = value; // replaces the innerHTML of the element with the given textId with its translated version.
  });
  refreshDynamicTexts()
  document.getElementById("herta-card").src = "static/" + curLang.cardImage; // sets the image of element with id "herta-card" to the translated version in the selected language.
}