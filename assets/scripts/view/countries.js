import _ from 'underscore';
import CountryBaseView from './country-base';
import limax from 'limax';

export default CountryBaseView.extend({
  initialize(options) {
    options.api.findCountryByName('EU')
      .then(country => {
        const slug = limax(country.name);
        const lang = options.application.get('language');
        options._router.navigate(`${lang}/countries/${slug}`, {trigger: true});
      });
  },
});
