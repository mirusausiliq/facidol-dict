$(document).ready(function () {
  const ipaData = {
    a: "a",
    b: "b",
    c: "t\u0361s",
    d: "ɬ",
    e: "ə",
    f: "f",
    //g: " -",
    h: "h",
    i: "i",
    //j: " -",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    ng: "ŋ",
    o: "o",
    p: "p",
    //q: " -",
    r: "ɾ",
    s: "s",
    t: "t",
    u: "u",
    v: "v",
    w: "w",
    x: "x",
    y: "j",
    //z: " -",
    "'": "ʡ",
    "^": "ʔ",
    ":": "ː",
    " ": " ",
  };

  const jsonURL =
    "https://raw.githubusercontent.com/g0v/amis-moedict/master/dict-amis-safolu.json";

  const originURL =
    "https://hts.ithuan.tw/%E6%96%87%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%90%88%E6%88%90?%E6%9F%A5%E8%A9%A2%E8%85%94%E5%8F%A3=Pangcah&%E6%9F%A5%E8%A9%A2%E8%AA%9E%E5%8F%A5=";

  let jsonData = null;
  $.getJSON(jsonURL, function (data) {
    jsonData = data;
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Error loading JSON data: ", error);
  });

  //
  function generateIPA(word) {
    // Convert the word to lowercase for case-insensitive lookup
    const lowercaseWord = word.toLowerCase();

    // Initialize an empty IPA string to store the IPA representation
    let ipaRepresentation = "";

    // Loop through each character of the word
    for (let i = 0; i < lowercaseWord.length; i++) {
      const character = lowercaseWord[i];

      // Check if the character exists in the ipaData JSON
      if (ipaData.hasOwnProperty(character)) {
        if (lowercaseWord[i] == "n" && lowercaseWord[i + 1] == "g") {
          ipaRepresentation += ipaData["ng"];
          i++;
        } else {
          ipaRepresentation += ipaData[character];
        }
      } else {
        // If the character is not found in the ipaData JSON, you can handle it based on your requirement.
        // For simplicity, you can skip the character or use a placeholder, like the character itself.
        //ipaRepresentation += character;
        continue;
      }
    }

    return ipaRepresentation;
  }

  // Function to render the JSON data for a specific title
  const renderJSONByTitle = (jsonData, searchWord) => {
    // Clear the previous content
    $("#raw").empty();

    const audioURL = `${originURL}${searchWord}`;
    const audio = new Audio(audioURL);

    // Search for the title in the JSON data
    const foundEntry = jsonData.find((entry) => entry.title === searchWord);

    if (foundEntry) {
      const title = foundEntry.title;
      const heteronyms = foundEntry.heteronyms;
      var i = 0;

      let html = `<div style="display: inline-block;">
                    <h2>${title}</h2>
                    <p>${foundEntry.stem ? `Stem: ${foundEntry.stem}` : ''}</p>
                    <p>IPA: [${generateIPA(title)}]</p>
                    <audio controls class="embed-responsive-item">
                      <source src="${audioURL}" type="audio/mp3">
                    </audio>
                  </div>
                 `;

      $("#playAudio").on("click", () => {
        audio.play();
      });



      html += `<h3>- Definitions</h3>`;
      heteronyms.forEach((heteronym) => {
        heteronym.definitions.forEach((definition) => {
          const def = definition.def;
          i++;
          html += `<p>${i}. ${def}</p>`;

          // If there are examples, render them as well
          if (definition.example) {
            definition.example.forEach((example) => {
              let str = "";
              for (const c of example) {
                if (c === "`" || c === "~") {
                  continue;
                } else {
                  str += c;
                }
              }
              html += `<p><i>${str}</i></p>`;
            });
          }

          if (definition.synonyms) {
            html += `<h3>Synonyms</h3>`
            definition.synonyms.forEach((synonyms) => {
              html += `<p><i>${synonyms}</i></p>`;
            });
          }
        });
      });

      if (title.startsWith("mi")) {
        const stem = foundEntry.stem;
        let firstChar = "";
        
        if (stem.charAt(0) == ('a' || 'e' || 'i' || 'o' || 'u')) {
        } else {
          firstChar = stem.charAt(0);
        }

        html += `<h3>- Conjugations<h3>`;
        html += `
          <div class="ts-box">
            <table class="ts-table">
                <tbody>
                  <tr>
                  <td>AFF.</td>
                  <td>act.</td>
                  <td>psv.nrm.</td>
                  <td>psv.cst.</td>
                  <td>ins.</td>
                  <td>loc.</td>
                </tr>
                <tr>
                  <td>nrm.</td>
                  <td>mi-${stem}</td>
                  <td>ma-${stem}</td>
                  <td>${stem}-en</td>
                  <td>sapi-${stem}</td>
                  <td>pi-${stem}en</td>
                </tr>
                <tr>
                  <td>ipf.</td>
                  <td>mami-${stem}</td>
                  <td>mama-${stem}</td>
                  <td>${firstChar}a-${stem}-en</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>prf.</td>
                  <td>mi-${stem}-ay</td>
                  <td>ma-${stem}-ay</td>
                  <td>mi-${stem}-an</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        `;
        html += `
        <div class="ts-box">
          <table class="ts-table">
              <tbody>
                <tr>
                <td>NGT.</td>
                <td>act.</td>
                <td>psv.nrm.</td>
                <td>psv.cst.</td>
                <td>ins.</td>
                <td>loc.</td>
              </tr>
              <tr>
                <td>nrm.</td>
                <td>caay mi-${stem}</td>
                <td>caay ma-${stem}</td>
                <td>caay ${stem}-en</td>
                <td>caay sapi-${stem}</td>
                <td>caay pi-${stem}en</td>
              </tr>
              <tr>
                <td>ipf.</td>
                <td>caay mami-${stem}</td>
                <td>caay mama-${stem}</td>
                <td>${firstChar}a-${stem}-en</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>prf.</td>
                <td>caay mi-${stem}-ay</td>
                <td>caay ma-${stem}-ay</td>
                <td>caay mi-${stem}-an</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      }

      if (title.startsWith("ma")) {
        const stem = foundEntry.stem;
        let firstChar = "";
        
        if (stem.charAt(0) == ('a' || 'e' || 'i' || 'o' || 'u')) {
        } else {
          firstChar = stem.charAt(0);
        }

        html += `<h3>- Conjugations<h3>`;
        html += `
          <div class="ts-box">
            <table class="ts-table">
                <tbody>
                  <tr>
                  <td>AFF.</td>
                  <td>act.</td>
                  <td>psv.nrm.</td>
                  <td>psv.cst.</td>
                  <td>ins.</td>
                  <td>loc.</td>
                </tr>
                <tr>
                  <td>nrm.</td>
                  <td>ma-${stem}</td>
                  <td>...</td>
                  <td>ma-${stem}-en</td>
                  <td>saka-${stem}</td>
                  <td>ka-${stem}en</td>
                </tr>
                <tr>
                  <td>ipf.</td>
                  <td>mama-${stem}</td>
                  <td>mama-${stem}</td>
                  <td>mama-${stem}-en</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>prf.</td>
                  <td>ma-${stem}-ay</td>
                  <td>ma-${stem}-ay</td>
                  <td>${stem}-an</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        `;
        html += `
        <div class="ts-box">
          <table class="ts-table">
              <tbody>
                <tr>
                <td>NGT.</td>
                <td>act.</td>
                <td>psv.nrm.</td>
                <td>psv.cst.</td>
                <td>ins.</td>
                <td>loc.</td>
              </tr>
              <tr>
                <td>nrm.</td>
                <td>caay ma-${stem}</td>
                <td>...</td>
                <td>caay ma-${stem}-en</td>
                <td>caay saka-${stem}</td>
                <td>caay ka-${stem}en</td>
              </tr>
              <tr>
                <td>ipf.</td>
                <td>caay mama-${stem}</td>
                <td>caay mama-${stem}</td>
                <td>caay mama-${stem}-en</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>prf.</td>
                <td>caay ma-${stem}-ay</td>
                <td>caay ma-${stem}-ay</td>
                <td>caay ${stem}-an</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      }

      if (title.startsWith("om", 1)) {
        const stem = foundEntry.title;
        let firstChar = "";
        
        if (stem.charAt(0) == ('a' || 'e' || 'i' || 'o' || 'u')) {
        } else {
          firstChar = stem.charAt(0);
        }

        html += `<h3>- Conjugations<h3>`;
        html += `
          <div class="ts-box">
            <table class="ts-table">
                <tbody>
                  <tr>
                  <td>AFF.</td>
                  <td>act.</td>
                  <td>psv.nrm.</td>
                  <td>psv.cst.</td>
                  <td>ins.</td>
                  <td>loc.</td>
                </tr>
                <tr>
                  <td>nrm.</td>
                  <td>${stem}</td>
                  <td>...</td>
                  <td>${stem}-en</td>
                  <td>saka-${stem}</td>
                  <td>ka-${stem}en</td>
                </tr>
                <tr>
                  <td>ipf.</td>
                  <td>mama-${stem}</td>
                  <td>mama-${stem}</td>
                  <td>mama-${stem}-en</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>prf.</td>
                  <td>ma-${stem}-ay</td>
                  <td>ma-${stem}-ay</td>
                  <td>${stem}-an</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
      }

      // Append the rendered content to the #raw div
      $("#raw").append(html);

      // Attach the click event to the play button after it is added to the DOM
      $("#playAudio").on("click", () => {
        audio.play();
      });
    } else {
      // If the title is not found, display a message
      $("#raw").html(`<p>"${searchWord}" is not found.</p>`);
    }
  };

  // Function to handle the search button click event
  const handleSearch = () => {
    const searchWord = $("#search-input").val().trim().toLowerCase();

    if (searchWord) {
      renderJSONByTitle(jsonData, searchWord);
    }
  };

  // Bind the search button click event
  $("#search-btn").on("click", handleSearch);

  // Bind the Enter key press event in the search input field
  $("#search-input").on("keypress", function (event) {
    if (event.which === 13) {
      // If Enter key is pressed, trigger the search button click
      handleSearch();
    }
  });

  // Bind the input event for autocomplete
  $("#search-input").on("input", function () {
    const inputText = $(this).val().trim().toLowerCase();
    const matchingWords = jsonData.filter((entry) =>
      entry.title.startsWith(inputText)
    );

    if (inputText === "") {
      $("#autocomplete-list").html("");
    } else {
      const autocompleteItems = matchingWords
        .map((entry) => `<li class="list-group-item">${entry.title}</li>`)
        .join("");
      $("#autocomplete-list").html(autocompleteItems);
    }
  });

  // Bind the click event for the autocomplete list items
  $("#autocomplete-list").on("click", "li", function (event) {
    const selectedWord = $(this).text();
    $("#search-input").val(selectedWord);
    $("#autocomplete-list").html("");
    handleSearch();
  });
});
