import { autorun, runInAction } from 'mobx';
import { ICitiesApi } from 'src/api/CitiesApi';
import { City } from 'src/models/city';
import center from '@turf/center';

export class CitiesStore {
  constructor(private citiesApi: ICitiesApi) {
    this.loadCityData(this.SelectedCity?.name as string);
  }

  cities: Array<City> = [
    {
      name: 'Ижевск',
      isSelected: true,
    },
    {
      name: 'Набережные Челны',
      isSelected: false,
    },
    {
      name: 'Москва',
      isSelected: false,
    },
    {
      name: 'Санкт-Петербург',
      isSelected: false,
    },
    {
      name: 'testCity',
      isSelected: false,
    },
  ];

  get SelectedCity() {
    return this.cities.find((c) => c.isSelected);
  }

  async loadCityData(name: string): Promise<string | undefined> {
    const city = this.getCityByName(name);
    if (!city) return 'Не удалось загрузить границы выбранного города.';
    if (city.borders) return;
    const borders = await this.citiesApi.getCityBorders(name);
    let errorMessage;
    runInAction(() => {
      if (!borders) {
        errorMessage = 'Не удалось загрузить границы выбранного города.';
        return;
      }
      runInAction(() => {
        city.borders = borders;
      });
      const c = center(borders);
      city.longitude = c.geometry.coordinates[0];
      city.latitude = c.geometry.coordinates[1];
      console.log(name, borders);
    });
    return errorMessage;
  }

  getCityByName(name: string) {
    if (name) return this.cities.find((c) => c.name === name);
  }

  async switchSelectedCity(name: string) {
    if (this.SelectedCity) this.SelectedCity.isSelected = false;

    const target = this.getCityByName(name);
    if (!target) return;

    const errorMessage = (await this.loadCityData(name)) as string | undefined;
    if (errorMessage) return errorMessage;
    runInAction(() => {
      target.isSelected = true;
    });
  }
}
