import { IMode } from "src/models/mode";

export class ModesStore {
  modes: Array<IMode> = [
    {
      name: 'polution',
      isActive: false,
    },
    {
      name: 'noise',
      isActive: true,
    },
  ];

  toggleMode(mode: IMode) {
    const modeIndex = this.modes.findIndex((m) => m.name == mode.name);
    if (modeIndex == -1) return;
    this.modes[modeIndex].isActive = !this.modes[modeIndex].isActive;
    console.log(mode.name, mode.isActive)
  }

  get ActiveModes(): Array<IMode> {
    return this.modes.filter((m) => m.isActive);
  }
}
