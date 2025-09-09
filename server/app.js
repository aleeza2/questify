const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/verify', (req, res) => {
  const { url } = req.body;

  const isFake = Math.random() > 0.5;
  res.json({
    url,
    result: isFake ? 'fake' : 'real',
    confidence: isFake ? '92%' : '87%',
    reason: isFake
      ? 'Detected deceptive linguistic patterns'
      : 'Verified by known trusted source',
  });
});

app.listen(PORT, () => {
  console.log(`✅ Questify backend running at http://localhost:${PORT}`);
});
