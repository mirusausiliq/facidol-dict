const url = 'https://raw.githubusercontent.com/g0v/amis-moedict/master/dict-amis-safolu.json'

const getDefinition = async (word) => {
  const definitions = await fetch(url).then(res = res.json());
  return definitions[word];
}

const renderDefinition = (data,word) => {
  const raw = document.querySelector('#raw');
  raw.innerHTML = JSON.stringify(data, null, 4);

  const formatted = document.getElementById('formatted');
}

const fetchAndRenderDefinition = async (word) => {
  const data = await getDefinition(word);

  renderDefinition(data, word);

  hljs.highlightAll();
  MathJax.typeset();
}

const defineInputWord = () => {
  const word = document.querySelector('#word').ariaValueMax.toLowerCase().trim();
  if (!word) return;
  fetchAndRenderDefinition(word)
}