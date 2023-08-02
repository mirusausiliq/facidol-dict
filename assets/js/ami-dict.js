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

  const amisMDURL = 
    "https://amis.moedict.tw/#:";
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

      let html = `
        <h2>${title}</h2>
        <div class="ts-divider is-section"></div>
      `;

      let verbType = "";
      let pos = "";
      if (title.startsWith("mi")) {
        verbType += "mi-";
        pos += "vrb.";
      } else if (title.startsWith("ma")) {
        verbType += "ma-";
        pos += "vrb.";
      } else if (title.startsWith("om", 1)) {
        verbType += "-om-";
        pos += "vrb.";
      } else if (title.startsWith("em", 1)) {
        verbType += "-em-";
        pos += "vrb.";
      } else if (title.startsWith("tala") || title.startsWith("tala")) {
        verbType += "tala- (ta-)";
        pos += "vrb.";
      } else if (title.startsWith("hali")) {
        verbType += "hali-";
        pos += "vrb.";
      } else if (title.startsWith("maka")) {
        verbType += "maka-";
        pos += "vrb.";
      } else if (title.endsWith("en")) {
        verbType += "en-";
        pos += "vrb.";
      } else if (title.endsWith("an")) {
        verbType += "-an";
        pos += "vrb.";
      } else if (title.endsWith("ay")) {
        verbType += "-ay";
        pos += "vrb.";
      } else if (title == "ini") {
        verbType += "ini";
        pos += "vrb.";
      } else if (title == "ira") {
        verbType += "ira";
        pos += "vrb.";
      } else if (title == "tayni") {
        verbType += "tayni";
        pos += "vrb.";
      } else if (title == "tayra") {
        verbType += "tayra";
        pos += "vrb.";
      } else {
        pos += "nou./prn./adj./adv./ptc./ntj... (unknown)";
      }

      if (pos) {
        if (verbType) {
          html += `
            <p>詞性 Part of Speech: ${verbType} ${pos}</p> 
          `;
        } else {
          html += `
            <p>詞性 Part of Speech: ${pos}</p>
          `;
        }

        if (foundEntry.stem) {
          html += `
            <p>詞根 Stem: ${foundEntry.stem}</p>
          `;
        } else {
          html += `
            <p>詞根 Stem: ${title} (unclassified)</p>
          `; 
        }

        html += `
          <p>音標 IPA: [${generateIPA(title)}]</p>
          <audio controls class="embed-responsive-item">
            <source src="${audioURL}" type="audio/mp3">
          </audio>
        `;
      }

      html += `<h3>- 定義 Definitions</h3>`;
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
            html += `<h3>- 近義詞 Synonyms</h3>`;
            definition.synonyms.forEach((synonyms) => {
              html += `<p><i>${synonyms}</i></p>`;
            });
          }
        });
      });

      if (title.startsWith("mi")) {
        const stem = foundEntry.stem;
        let fC = "";

        if (stem.charAt(0) == ("a" || "e" || "i" || "o" || "u")) {
        } else {
          fC = stem.charAt(0);
        }

        html += `<h3>- 動詞變化 Conjugations<h3>`;
        html += `
          <div class="ts-box" style="font-size: 14px; overflow-x: scroll">
            <table class="ts-table is-celled table-hover">
              <tbody>
                <tr>
                  <td>肯定 AFF.</td>
                  <td>主事焦點 act.</td>
                  <td>受事焦點 pss.</td>
                  <td></td>
                  <td>工具焦點 ins.</td>
                  <td>處所焦點 loc.</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>被動 (ma-)</td>
                  <td>處置 (-en)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>一般體 nrm.</td>
                  <td>  mi-${stem}</td>
                  <td>  ma-${stem}</td>
                  <td>     ${stem}-en</td>
                  <td>sapi-${stem}</td>
                  <td>  pi-${stem}-an</td>
                </tr>
                <tr>
                  <td>將行體 ipf.</td>
                  <td> ma-mi-${stem}</td>
                  <td> ma-ma-${stem}</td>
                  <td>${fC}a-${stem}-en</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>已行體 prf.</td>
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
        <div class="ts-box" style="font-size: 14px; overflow-x: scroll">
          <table class="ts-table is-celled table-hover">
            <tbody>
              <tr>
                <td>否定 NGT.</td>
                <td>主事焦點 act.</td>
                <td>受事焦點 pss.</td>
                <td></td>
                <td>工具焦點 ins.</td>
                <td>處所焦點 loc.</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>被動 (ma-)</td>
                <td>處置 (-en)</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>一般體 nrm.</td>
                <td>  caay mi-${stem}</td>
                <td>  caay ma-${stem}</td>
                <td>     caay ${stem}-en</td>
                <td>caay sapi-${stem}</td>
                <td>  caay pi-${stem}en</td>
              </tr>
              <tr>
                <td>將行體 ipf.</td>
                <td>        caay mami-${stem}</td>
                <td>        caay mama-${stem}</td>
                <td>      caay ${fC}a-${stem}-en</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>已行體 prf.</td>
                <td>caay mi-${stem}-ay</td>
                <td>caay ma-${stem}-ay</td>
                <td>caay mi-${stem}-an</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        `;
      }

      if (title.startsWith("ma")) {
        const stem = foundEntry.stem;
        let fC = "";

        if (stem.charAt(0) == ("a" || "e" || "i" || "o" || "u")) {
        } else {
          fC = stem.charAt(0);
        }

        html += `<h3>- 動詞變化 Conjugations<h3>`;
        html += `
          <div class="ts-box" style="font-size: 14px; overflow-x: scroll">
            <table class="ts-table is-celled table-hover">
              <tbody>
                <tr>
                  <td>肯定 AFF.</td>
                  <td>主事焦點 act.</td>
                  <td>受事焦點 pss.</td>
                  <td></td>
                  <td>工具焦點 ins.</td>
                  <td>處所焦點 loc.</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>被動 (ma-)</td>
                  <td>處置 (-en)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>一般體nrm.</td>
                  <td>  ma-${stem}</td>
                  <td>...</td>
                  <td>  ma-${stem}-en</td>
                  <td>saka-${stem}</td>
                  <td>  ka-${stem}-an</td>
                </tr>
                <tr>
                  <td>將行體 ipf.</td>
                  <td> ma-mi-${stem}</td>
                  <td> ma-ma-${stem}</td>
                  <td> ma-ma-${stem}-en</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>已行體 prf.</td>
                  <td>ma-${stem}-ay</td>
                  <td>ma-${stem}-ay</td>
                  <td>   ${stem}-an</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        `;
        html += `
        <div class="ts-box" style="font-size: 14px; overflow-x: scroll">
          <table class="ts-table is-celled table-hover">
            <tbody>
              <tr>
                <td>肯定 AFF.</td>
                <td>主事焦點 act.</td>
                <td>受事焦點 pss.</td>
                <td></td>
                <td>工具焦點 ins.</td>
                <td>處所焦點 loc.</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>被動 (ma-)</td>
                <td>處置 (-en)</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>一般體nrm.</td>
                <td>  caay ma-${stem}</td>
                <td>...</td>
                <td>  caay ma-${stem}-en</td>
                <td>caay saka-${stem}</td>
                <td>  caay ka-${stem}-an</td>
              </tr>
              <tr>
                <td>將行體 ipf.</td>
                <td>caay ma-mi-${stem}</td>
                <td>caay ma-ma-${stem}</td>
                <td>caay ma-ma-${stem}-en</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>已行體 prf.</td>
                <td>caay ma-${stem}-ay</td>
                <td>caay ma-${stem}-ay</td>
                <td>   caay ${stem}-an</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        `;
      }

      if (title.startsWith("om", 1)) {
        const stem = foundEntry.title;
        let fC = "";

        if (stem.charAt(0) == ("a" || "e" || "i" || "o" || "u")) {
        } else {
          fC = stem.charAt(0);
        }

        html += `<h3>- 動詞變化 Conjugations<h3>`;
        html += `
          <div class="ts-box" style="font-size: 14px; overflow-x: scroll">
            <table class="ts-table is-celled table-hover">
              <tbody>
                <tr>
                  <td>肯定 AFF.</td>
                  <td>主事焦點 act.</td>
                  <td>受事焦點 pss.</td>
                  <td></td>
                  <td>工具焦點 ins.</td>
                  <td>處所焦點 loc.</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>被動 (ma-)</td>
                  <td>處置 (-en)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>一般體nrm.</td>
                  <td>  mi-${title}</td>
                  <td>  ma-${title}</td>
                  <td>     ${title}-en</td>
                  <td>sapi-${title}</td>
                  <td>  pi-${title}en</td>
                </tr>
                <tr>
                  <td>將行體 ipf.</td>
                  <td>  mami-${title}</td>
                  <td>  mama-${title}</td>
                  <td>${fC}a-${title}-en</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>已行體 prf.</td>
                  <td>mi-${title}-ay</td>
                  <td>ma-${title}-ay</td>
                  <td>mi-${title}-an</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        `;
        html += `
        <div class="ts-box" style="font-size: 14px; overflow-x: scroll">
          <table class="ts-table is-celled table-hover">
            <tbody>
              <tr>
                <td>否定 NGT.</td>
                <td>主事焦點 act.</td>
                <td>受事焦點 pss.</td>
                <td></td>
                <td>工具焦點 ins.</td>
                <td>處所焦點 loc.</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>被動 (ma-)</td>
                <td>處置 (-en)</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>一般體 nrm.</td>
                <td>  caay ${title}</td>
                <td>  caay ${title}</td>
                <td>     caay ${title}-en</td>
                <td>caay sapi-${title}</td>
                <td> caay pi-${title}en</td>
              </tr>
              <tr>
                <td>將行體 ipf.</td>
                <td>        caay mami-${title}</td>
                <td>        caay mama-${title}</td>
                <td>caay ${fC}a-${title}-en</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>已行體 prf.</td>
                <td>caay mi-${title}-ay</td>
                <td>caay ma-${title}-ay</td>
                <td>caay mi-${title}-an</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        `;
      }

      const amismoedict = `${amisMDURL}${title}`;

      html += `
        <h3>- 參考 Reference</h3>
        <ul>
          <li>
            <a href="${amismoedict}">阿美語萌典 蔡中涵大詞典 - ${title}</a>
          </li>
          <li>
            朱清義 Kolas Foting (2020) O Lalelo^ no Sowal no Pangcah 新觀念阿美語語法
          </li>
          <li>
            吳靜蘭 Wu, Jinglan (2022) O Kasawail no Sowal ato Lalelo no Pipasifana' 阿美語詞類及其教學
          </li>
          <li>
            朱珍靜 Dakoc Lamelo (2022) 阿美語中的台灣閩南語及日語借詞
          </li>
        </ul>
      `; 

      html += `
      <h3>- Credits</h3>
      <ul>
        <li>
          The data of this dictionary is not owned by me. They are from 
          <a href="https://github.com/g0v/amis-moedict">
            Amis-Moedict project 
          </a>
          created by Miaoski, Lafin, Safulo Kacaw Lalanges Hakasi (蔡中涵) and the other contributors.
        </li>
      </ul>
    `; 

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

  $.getJSON(jsonURL, function (data) {
    const jsonData = data;

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
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Error loading JSON data: ", error);
  });
});
