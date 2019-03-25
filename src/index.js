
import BackgroundScript from './backgroundScript';
import { isBackgroundScript } from './chromeUtils';
import ContentScript from './contentScript';

export default function (opt) {
  return (store) => {
    isBackgroundScript(window).then((isBackground) => {
      if (isBackground) {
        return new BackgroundScript(store);
      }
      return new ContentScript(store);
    });
  };
}
