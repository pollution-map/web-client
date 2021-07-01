import { ICitiesApi } from 'src/api/CitiesApi';
import { City } from 'src/models/city';
import center from '@turf/center';
import { IMeasurementsStore } from 'src/store/data/MeasurementsStore';
import { inPolygon } from 'src/utils/filter-measurements';

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
    private measurementsStore: IMeasurementsStore
  ) {
    this.loadCityData(this.SelectedCity?.name as string);
  }

  cities: Array<City> = [
    {
      name: 'Ижевск',
      isSelected: true,
      measurements: [],
    },
    {
      name: 'Набережные Челны',
      isSelected: false,
      measurements: [],
    },
    {
      name: 'Москва',
      isSelected: false,
      measurements: [],
    },
    {
      name: 'Санкт-Петербург',
      isSelected: false,
      measurements: [],
    },
    {
      name: 'Камчатка',
      isSelected: false,
      measurements: [],
    },
    {
      name: 'testCity',
      isSelected: false,
      measurements: [],
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
      measurements: city.measurements
        // filter measurements for city
        ? inPolygon(this.measurementsStore.measurements, borders)
        // or return existing ones
        : city.measurements,
    };

    this.updateCity(name, newCityInfo);

    console.log(name, borders);

    return fromSuccess(newCityInfo);
  }

  async switchSelectedCity(name: string): Promise<CityData> {
    
    const target = this.getCityByName(name);
    if (this.SelectedCity) this.SelectedCity.isSelected = false;
    if (!target) return fromNotSelected();

    const { city, error } = await this.loadCityData(name);
    if (error) return fromError(error);

    target.isSelected = true;
    return fromSuccess(city as City);
  }
}
