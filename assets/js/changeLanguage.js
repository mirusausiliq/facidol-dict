var languages = {
  eng: {
    "head-title": "Facidol Dictionary",
    "nav-item-about": "About",
    "nav-item-learn": "Learn",
    "nav-item-dictionary": "Dictionary",
    "nav-item-resources": "Resources",
    "nav-item-vocabulary": "Vocabulary",
    "nav-item-grammar": "Grammar",
    "nav-item-tools": "Tools",
    "nav-item-ipa": "IPA",
    "nav-item-stem": "Stem",
    "btn-query": "Query",
  },
  chn: {
    "head-title": "巴基魯族語詞典",
    "nav-item-about": "關於",
    "nav-item-learn": "學習",
    "nav-item-dictionary": "辭典",
    "nav-item-resources": "資源",
    "nav-item-vocabulary": "詞彙",
    "nav-item-grammar": "語法",
    "nav-item-tools": "工具",
    "nav-item-ipa": "國際音標",
    "nav-item-stem": "詞根",
    "btn-query": "搜尋",
  },
  jpn: {
    "head-title": "ファジル辞書",
    "nav-item-about": "關於",
    "nav-item-learn": "勉強",
    "nav-item-dictionary": "辞書",
    "nav-item-resources": "リソース",
    "nav-item-vocabulary": "ボキャブラリー",
    "nav-item-grammar": "文法",
    "nav-item-tools": "道具",
    "nav-item-ipa": "IPA",
    "nav-item-stem": "字根",
    "btn-query": "検索",
  },
  ami: {
    // Amis
    "head-title": "O Citing no Facidol",
    "nav-item-about": "Tamdaw",
    "nav-item-learn": "Micodad",
    "nav-item-dictionary": "Citing",
    "nav-item-resources": "Resources",
    "nav-item-vocabulary": "Vocabulary",
    "nav-item-grammar": "Grammar",
    "nav-item-tools": "Kaysing",
    "nav-item-ipa": "IPA",
    "nav-item-stem": "Lamit",
    "btn-query": "Misearch",
  } /*,
  tay: {},
  bnn: {},
  xnb: {},
  ckv: {},
  pwn: {},
  pyu: {},
  dru: {},
  sxr: {},
  xsy: {},
  trv: {},
  ssf: {},
  tsu: {},
  tao: {},
  byq: {},
  bzg: {},
  uon: {},
  pzh: {},
  kae: {},
  ppu: {},
  fos: {},
  tvx: {},*/,
};

// Function to update the text content based on the selected language
function updateTextContent(language) {
  var languageData = languages[language];

  const headTitleElement = document.getElementById("head-title");
  const navItemIPAElement = document.getElementById("nav-item-ipa");
  const navItemStemElement = document.getElementById("nav-item-stem");
  const navItemAboutElement = document.getElementById("nav-item-about");

  // Check if the elements exist before setting their innerHTML
  if (headTitleElement)
    headTitleElement.innerHTML = languageData["head-title"];
  if (navItemIPAElement)
    navItemIPAElement.innerHTML = languageData["nav-item-ipa"];
  if (navItemStemElement)
    navItemStemElement.innerHTML = languageData["nav-item-stem"];
  if (navItemAboutElement)
    navItemAboutElement.innerHTML = languageData["nav-item-about"];
  
}

var defaultValue = 0;
var languageList = ["eng", "chn", "jpn", "ami"];

function changeLanguage() {
  defaultValue++;
  if (defaultValue < 4) {
    const selectedLanguage = languageList[defaultValue];
    updateTextContent(selectedLanguage);
  } else {
    // If the defaultValue exceeds the number of available languages, reset to the first language (ENG)
    defaultValue = 0;
    updateTextContent("eng");
  }
}

// Initialize the text content with the default language (ENG)
updateTextContent("eng");