import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import center from '@turf/center';
import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from 'mobx';
import { ICitiesApi } from 'src/api/cities/ICitiesApi';
import { City } from 'src/models/city';
import { asGeoPoint } from 'src/models/geo-point';
import { IFilteredMeasurementsStore } from 'src/store/data/FilteredMeasurementsStore';

interface CityData {
  city?: City;
  error?: string;
}
const fromError = (errorMessage: string): CityData => ({
  error: errorMessage,
});

const fromSuccess = (city: City): CityData => ({
  city,
});

const fromNotSelected = (): CityData => ({});

export class CitiesStore {
  constructor(
    private citiesApi: ICitiesApi,
    private measurementsStore: IFilteredMeasurementsStore
  ) {
    makeObservable(this, {
      cities: observable,
      SelectedCity: computed,
      updateCity: action,
      setSelectedCity: action,
      loadCityData: action,
      loadingError: observable,
    });

    autorun(() => {
      this.loadCityData(this.SelectedCity?.name as string).then((cityData) => {
        runInAction(() => {
          this.loadingError = cityData.error;
          console.log(`loading error ${cityData.error}`);
        });
      });
    });

    autorun(() => {
      const city = toJS(this.SelectedCity);
      this.measurementsStore.addOrUpdateFilter({
        name: 'borders-filter',
        predicate: (measurement) => {
          if (!city?.borders) return false;
          const inPolygon = booleanPointInPolygon(
            asGeoPoint(measurement),
            city.borders
          );
          return inPolygon;
        },
      });
    });
  }

  loadingError?: string;

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
      name: 'Камчатка',
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

  getCityByName(name: string) {
    if (name) return this.cities.find((c) => c.name === name);
  }

  updateCity(cityName: string, city: City) {
    const c = this.getCityByName(cityName);
    if (!c) return;
    this.cities = [
      ...this.cities.filter((c) => c.name !== cityName),
      {
        ...c,
        ...city,
      },
    ];
  }

  async loadCityData(name: string): Promise<CityData> {
    const city = this.getCityByName(name);
    if (!city)
      return fromError('Не удалось загрузить границы выбранного города.');
    if (city.borders) return fromSuccess(city);

    const borders = await this.citiesApi.getCityBorders(name);
    if (!borders) {
      return fromError('Не удалось загрузить границы выбранного города.');
    }

    const c = center(borders);
    const newCityInfo = {
      ...city,
      borders,
      latitude: c.geometry.coordinates[1],
      longitude: c.geometry.coordinates[0],
    };

    this.updateCity(name, newCityInfo);

    return fromSuccess(newCityInfo);
  }

  setSelectedCity(name: string) {
    this.cities.forEach((c) => (c.isSelected = false));
    this.getCityByName(name)!.isSelected = true;
  }
}
