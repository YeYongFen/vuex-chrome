
export const isBackgroundScript = script => new Promise((resolve) => {
  try {
    chrome.runtime.getBackgroundPage(backgroundPage => resolve(script === backgroundPage));
  } catch (err) {
    return resolve(false);
  }

  return false;
});

export const connectToBackground = connectionName => chrome.runtime.connect({
  name: connectionName,
});

export const handleConnection = callback => chrome.runtime.onConnect.addListener(callback);
