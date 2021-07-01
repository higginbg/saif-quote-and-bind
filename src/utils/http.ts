export const postData = async (
  endpoint: string,
  payload: {}[],
  successCallback: (repsonse?: any) => void,
  errorCallback: (error?: any) => void
) => {
  console.log('Request data', payload);
  try {
    const response: any = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      errorCallback();
      return;
    }
    successCallback();
    const data = await response.json();
    return data;
  } catch (err) {
    errorCallback();
  }
};
