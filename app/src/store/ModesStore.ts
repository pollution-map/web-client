export interface Mode {
  name: string;
  isActive: boolean;
}
export default class ModesStore {
  modes: Array<Mode> = [
    {
      name: 'polution',
      isActive: true,
    },
    {
      name: 'noise',
      isActive: true,
    },
  ];

  addMode(mode: Mode) {
    this.modes.push(mode);
  }

  removeMode(mode: Mode) {
    this.modes = this.modes.filter((m) => m.name !== mode.name);
  }

  toggleMode(mode: Mode) {
    const modeIndex = this.modes.findIndex((m) => m.name == mode.name);
    if (modeIndex == -1) return;
    this.modes[modeIndex].isActive = !this.modes[modeIndex].isActive;
  }

  get ActiveModes(): Array<Mode> {
    return this.modes.filter((m) => m.isActive);
  }
}
