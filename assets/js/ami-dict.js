jQuery(document).ready(function () {
  const ipaData = {
    a: "a",
    b: "b",
    c: "t\u0361s",
    d: "ɬ",
    e: "ə",
    f: "f",
    //g: " -",
    h: "ħ",
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
    r: "r",
    s: "s",
    t: "t",
    u: "ʊ",
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
        if (
          lowercaseWord[i] == "n" &&
          lowercaseWord[i + 1] == "g"
        ) {
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

    // Search for the title in the JSON data
    const foundEntry = jsonData.find(
      (entry) => entry.title === searchWord
    );

    if (foundEntry) {
      const title = foundEntry.title;
      const heteronyms = foundEntry.heteronyms;
      var i = 0;

      let html = `<h2>${title}</h2>`;

      if (title) {
        html += `<p>IPA: [${generateIPA(title)}]</p>`;
      }

      if (foundEntry.stem) {
        html += `<p>Stem: ${foundEntry.stem}</p>`;
      }

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
            definition.synonyms.forEach((synonyms) => {
              html += `<p><i>${synonyms}</i></p>`;
            });
          }
        });
      });

      // Append the rendered content to the #raw div
      $("#raw").append(html);
    } else {
      // If the title is not found, display a message
      $("#raw").html(`<p>"${searchWord}" is not found.</p>`);
    }
  };

  // Function to handle the search button click event
  const handleSearch = () => {
    const searchWord = $("#search-input")
      .val()
      .trim()
      .toLowerCase();

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
        .map(
          (entry) =>
            `<li class="list-group-item">${entry.title}</li>`
        )
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