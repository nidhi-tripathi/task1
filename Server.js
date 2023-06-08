const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const synonyms = require('synonyms');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/', (req, res) => {
  const sourceText = req.body.sourceText;
  const words = sourceText.split(' ');

  
  const spunText = [];

 
  words.forEach((word) => {
    if (word.length > 3) {
      const wordSynonyms = synonyms(word) || [];
      const randomSynonym = wordSynonyms[Math.floor(Math.random() * wordSynonyms.length)];
      spunText.push(randomSynonym || word);
    } else {
      spunText.push(word);
    }
  });

  
  const result = spunText.join(' ');


  res.send(result);
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
