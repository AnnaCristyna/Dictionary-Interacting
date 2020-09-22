const fs = require("fs");
const fsPromises = require("fs").promises;

start();
async function start() {
  try {
    // const file = "../json/wordsAndWords.json"; //for wordsRelated function
    // const file = "../json/WordsWild.json";
    // const file = "../json/synonyms.json";
    const data = await readfiles(file);
    // wordsRelated(data);
    // Words(data);
  } catch (error) {
    return console.log(error);
  }
}

async function readfiles(file) {
  console.log(file);
  try {
    const response = await fsPromises.readFile(file, "utf8");
    console.log(response);

    const json = JSON.parse(response);
    console.log(json);
    return json;
  } catch (error) {
    return console.log(error);
  }
}
async function writeInFile(newFile, data) {
  const path = `../json/${newFile}.json`;
  json = JSON.stringify(data);
  fs.writeFileSync(path, json, "utf-8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
function wordsRelated(data) {
  const relatedWords = data.map((item) => {
    const arrayOfSynonyms = item.synonyms.split(", ");
    const synonyms = arrayOfSynonyms.map((word) => {
      return {
        source: item.word,
        target: word,
        type: "synonym",
      };
    });
    const arrayOfAntonyms = item.antonym.split(", ");
    const antonyms = arrayOfAntonyms.map((word) => {
      return {
        source: item.word,
        target: word,
        type: "antonym",
      };
    });
    return synonyms + antonyms;
  });
  // writeInFile("RelatedWords", relatedWords);
}
function Words(data) {
  const words = data.map((item) => {
    return {
      word: item.word,
      pos: item.pos,
    };
  });
  console.log(words);
  writeInFile("Words", words);
}
