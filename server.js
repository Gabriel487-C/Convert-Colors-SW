const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/conversao', async (req, res) => {
  const { from, input, to, apikey } = req.query;

  if (!from || !input || !to || !apikey) {
    return res.status(400).json({ error: 'Parâmetros ausentes.' });
  }

  const apiUrl = `https://qconv.com/api/v1/convert.php?from=${from}&input=${input}&to=${to}&apikey=${apikey}`;

  try {
    const response = await fetch(apiUrl); 
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar a API externa.', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando em http://localhost:${PORT}`);
});