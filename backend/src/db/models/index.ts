import City from './CityModel';
import PollResult from './PollResultModel';

City.hasMany(PollResult, {
  foreignKey: 'cityName',
  sourceKey: 'name',
  as: 'pollResults',
});

PollResult.belongsTo(City, {
  foreignKey: 'cityName',
  targetKey: 'name',
  as: 'city',
});

export { City, PollResult };
