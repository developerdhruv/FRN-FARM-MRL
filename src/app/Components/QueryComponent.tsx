import React, { useState } from 'react';
import axios from 'axios';

const QueryComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [translatedResponse, setTranslatedResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await axios.get('http://localhost:8000/answer', {
        params: { query }
      });
      setResponse(result.data.answer);
      setTranslatedResponse('');
    } catch (err) {
      setError('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (response) {
      setLoading(true);
      setError('');
      try {
        const result = await axios.get('http://localhost:8000/translate', {
          params: { text: response, target_lang: 'ur' }
        });
        setTranslatedResponse(result.data.translated_text);
      } catch (err) {
        setError('An error occurred while translating the response.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your query:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
          <button onClick={handleTranslate}>Translate to Urdu</button>
        </div>
      )}
      {translatedResponse && (
        <div>
          <h3>Translated Response:</h3>
          <p>{translatedResponse}</p>
        </div>
      )}
    </div>
  );
};

export default QueryComponent;
