import Parse from 'parse';
import { tagsColorMatcher } from './Utils';

const normalizeParseResponseData = data => {
  let dataInJsonString = JSON.stringify(data);
  return JSON.parse(dataInJsonString);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const get_service_image = mainPicture => {
  if (!mainPicture) {
    return 'https://dummyimage.com/600x400/000/fff';
  }
  return mainPicture.url;
};

const buildServicesJson = services => {
  const i18nLocale = 'en-us';
  return services.map(service => {
    try {
      service.excerpt = service.description[i18nLocale];
      service.description = service.excerpt;
      service.title = service.title[i18nLocale];
      service.name = service.title;
      service.objectId = service._id;
      // eslint-disable-next-line
      service.latitude = (service.location && service.location.latitude) || 1;
      // eslint-disable-next-line
      service.longitude = (service.location && service.location.longitude) || 1;
      service.location = `${service.city ? service.city + ',' : ''} ${service.country}`;
      service.rating = service.rating;
      service.reviewCount = service.reviewCount;
      service.slots = service.slots;
      service.price = service.price == null ? service.pricePerSession : service.price;
      if (service.tags && service.tags.length) {
        const tags = service.tags.map(tag => {
          const tagBg = tagsColorMatcher(tag);
          return { label: tag, hoverBg: tagBg, background: tagBg };
        });
        service.tags = tags;
      }
      if (service.type === undefined) {
        if (service.picture) {
          if (typeof service.picture._url === 'string') service.image = service.picture._url;
          if (typeof service.picture.url === 'string') service.image = service.picture.url;
        }
        service.image = service.image || 'https://dummyimage.com/600x400/000/fff';
      } else {
        service.image = get_service_image(service.mainPicture);
      }
    } catch (error) {
      console.log(error);
    }
    return service;
  });
};

const mapServiceObjects = services => {
  return services.map(service => {
    try {
      service.excerpt = service.description;
      service.title = service.name || service.title;
      // eslint-disable-next-line
      service.latitude = (service.location && service.location.latitude) || 1;
      // eslint-disable-next-line
      service.longitude = (service.location && service.location.longitude) || 1;
      service.location = `${service.city ? service.city + ',' : ''} ${service.country}`;
      service.rating = service.rating;
      service.reviewCount = service.reviewCount;
      service.slots = service.slots;
      service.price = service.price == null ? service.pricePerSession : service.price;
      if (service.tags && service.tags.length) {
        const tags = service.tags.map(tag => {
          const tagBg = tagsColorMatcher(tag);
          return { label: tag, hoverBg: tagBg, background: tagBg };
        });
        service.tags = tags;
      }
      if (service.type === undefined) {
        if (service.picture) {
          if (typeof service.picture._url === 'string') service.image = service.picture._url;
          if (typeof service.picture.url === 'string') service.image = service.picture.url;
        }
        service.image = service.image || 'https://dummyimage.com/600x400/000/fff';
      } else {
        service.image = get_service_image(service.mainPicture);
      }
    } catch (error) {
      console.log(error);
    }
    return service;
  });
};

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

const build_query = model => {
  let Model = Parse.Object.extend(model);
  let query = new Parse.Query(Model);
  return query;
};

export const statuses = {
  STARTED: 'started',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default {
  normalizeParseResponseData,
  getRandomInt,
  get_service_image,
  mapServiceObjects,
  buildServicesJson,
  removeDuplicates,
  build_query,
  statuses,
};
