// servicios/openaiService.js

import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/completions';

axiosRetry(axios, {
  retries: 3, // Número de reintentos
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount); // Tiempo de espera exponencial
  },
  retryCondition: (error) => {
    // Solo reintentar en caso de error 429
    return error.response.status === 429;
  },
});

const getCompletion = async (prompt) => {
    try {
        const response = await axios.post(API_URL, {
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 20
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        throw error;
      }
};

export default getCompletion;