import { IMode } from 'src/models/mode';

export class ModesStore {
  modes: Array<IMode> = [
    {
      name: 'polution',
      displayName: 'Загрязнение воздуха',
      isActive: false,
    },
    {
      name: 'noise',
      displayName: 'Шум',
      isActive: true,
    },
  ];

  toggleMode(mode: IMode) {
    const modeIndex = this.modes.findIndex((m) => m.name === mode.name);
    if (modeIndex === -1) return;
    this.modes[modeIndex].isActive = !this.modes[modeIndex].isActive;
  }

  get ActiveModes(): Array<IMode> {
    return this.modes.filter((m) => m.isActive);
  }
}
