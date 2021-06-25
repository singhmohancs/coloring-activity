import { Caption } from "./caption.model";
import { Deserializable } from "./deserializable.model";

interface ActivitySettings  {
  caption: Caption;
  [key: string]: Object;
};

class Activity implements Deserializable {
  order: number | undefined;
  svg: string | undefined;
  captionOptions: Caption[] | undefined;
  settings ?: ActivitySettings;
  selectedCaption: Caption | undefined;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  getCaption() {
    return this.settings?.caption;
  }
}

export { ActivitySettings, Activity}
