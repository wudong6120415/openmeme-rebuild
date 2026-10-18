const path = require('path');
try {
  const m = require('@deepseek-ai/dsh-agent');
  console.log('OK:', Object.keys(m).slice(0,5).join(','));
} catch (e) {
  console.log('FAIL:', e.message);
}
