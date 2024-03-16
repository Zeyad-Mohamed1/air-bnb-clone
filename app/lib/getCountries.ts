import countries from "world-countries";

const countriesList = countries.map((c) => ({
  value: c.cca2,
  label: c.name.common,
  flag: c.flag,
  latlng: c.latlng,
  region: c.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesList;

  const getCountrybyValue = (value: string) => {
    return countriesList.find((item) => item.value === value);
  };

  return { getAllCountries, getCountrybyValue };
};
