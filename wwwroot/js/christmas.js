// @ts-nocheck
(function () {
  'use strict';


  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function ( /** @type {string} */ s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}


// high-performance modern Christmas detection technology
window.Christmas = {

  var date = new Date();
  var christmas = new Date(date.getYear(), 11, 25);

  getAnswer: function() {
    return Christmas.answer;
  },
  isIt: function(date) {
    if (!date) date = new Date();
    return (date.getMonth() == christmas.time.month && date.getDate() == christmas.time.date);
  },

  thisYear: function() {
    var year = new Date().getYear() + 1900;
    return new Date(year, christmas.time.month, christmas.time.date);
  },

  answer: function(countryCode, date) {
    if (Christmas.isIt(date))
      return Christmas.yes(countryCode);
    else
      return Christmas.no(countryCode);
  },

  // for use from Node, where timezones are not set by user agent.
  // first argument is the moment-timezone module.
  forYear: function(moment, year, timezone) {
    // produces a zone-less timestamp, e.g. "2007-12-25 00:00:00"
    var unzoned = "" + year + "-" + (Christmas.time.month+1) + "-" + Christmas.time.date + " 00:00:00";

    // produces a be-zoned timestamp, e.g. "2007-12-25T00:00:00-05:00"
    var zoned = new moment.tz(unzoned, timezone);

    // produces a Date in UTC but based in the intended timezone
    // e.g. 2007-12-25T05:00:00.000Z
    return new Date(zoned);
  },


/*

Missing translations for the list of countries below.
File tickets at: https://github.com/isitchristmas/web/issues

  Afghanistan, Albania, Algeria, American Samoa, Andorra, Angola, Anguilla,
  Antarctica, Antigua and Barbuda, Aruba, Asia/Pacific Region,
  Azerbaijan, Bahamas, Bahrain, Bangladesh, Belarus, Benin, Bhutan, Bonaire,
  Saint Eustatius and Saba, Bosnia and Herzegovina, Botswana, Bouvet Island,
  British Indian Ocean Territory, Brunei Darussalam, Burkina Faso, Burundi, Cambodia,
  Cameroon, Cape Verde, Central African Republic, Chad, Comoros, Congo, Congo (DRC),
  Cook Islands, Cote D'Ivoire (Ivory Coast), Cuba, Curacao, Djibouti, Egypt,
  Equatorial Guinea, Eritrea, Esperanto, Ethiopia, Europe, Falkland Islands (Malvinas),
  Faroe Islands, Fiji, French Guiana, French Polynesia, Gabon, Gambia, Georgia, Ghana,
  Gibraltar, Greenland, Grenada, Guadeloupe, Guam, Guernsey, Guinea, Guinea-Bissau,
  Guyana, Heard Island and McDonald Islands, Holy See (Vatican City State), Honduras,
  Indonesia, Iran, Iraq, Isle of Man, Jersey, Jordan, Kazakhstan, Kiribati,
  Kuwait, Kyrgyzstan, Laos, Lebanon, Lesotho,
  Liberia, Libya, Liechtenstein, Luxembourg, Macedonia, Madagascar, Malawi,
  Maldives, Mali, Malta, Marshall Islands, Martinique, Mauritania, Mayotte,
  Micronesia, Moldova, Monaco, Montenegro,
  Montserrat, Morocco, Mozambique, Namibia, Nauru, Nepal, New Caledonia, Niger,
  Nigeria, Niue, Norfolk Island, Northern Mariana Islands, Oman, Palau,
  Palestinian Territory, Papua New Guinea, Qatar, Reunion, Rwanda, Saint Barthelemy,
  Saint Helena, Saint Kitts and Nevis, Saint Lucia, Saint Martin,
  Saint Pierre and Miquelon, Saint Vincent and the Grenadines, Samoa, San Marino,
  Sao Tome and Principe, Saudi Arabia, Senegal, Serbia,
  Seychelles, Sierra Leone, Solomon Islands, Somalia, Sri Lanka, Sudan, Suriname,
  Swaziland, Syrian Arab Republic, Tajikistan,
  Timor-Leste, Togo, Tokelau, Tonga, Tunisia, Turkmenistan, Turks and Caicos Islands,
  Tuvalu, Uganda, United Arab Emirates,
  United States Minor Outlying Islands, Uzbekistan, Vanuatu, Virgin Islands (British),
  Virgin Islands (U.S.), Wallis and Futuna, Yemen, Zimbabwe

*/

  yes: function(countryCode) {

    var codes = {
      "US": "YES", // United States
      "FR": "OUI", // France
      "NL": "JA", // Netherlands
      "ZA": "JA", // South Africa
      "ES": "S??", // Spain
      "UK": "YES", // United Kingdom
      "CA": "YES/OUI", // Canada (English/French)
      "PL": "TAK", // Poland
      "AX": "JA", // ??land Islands
      "SE": "JA", // Sweden
      "LT": "TAIP", // Lithuania
      "DE": "JA", // Germany
      "IE": "IS EA", // Ireland
      "AU": "YES", // Australia
      "JP": "??????", // Japan
      "NO": "JA", // Norway
      "IT": "S??", // Italy
      "HU": "IGEN", // Hungary
      "DK": "JA", // Denmark
      "FI": "KYLL??", // Finland
      "BE": "JA", // Belgium
      "CL": "S??", // Chile
      "MX": "S??", // Mexico
      "NZ": "YES", // New Zealand
      "AT": "JA", // Austria
      "RO": "DA", // Romania
      "CH": "JA/OUI/S??/GEA", // Switzerland (German/French/Italian/Romansh)
      "PT": "SIM", // Portugal
      "BR": "SIM", // Brazil
      "AR": "S??", // Argentina
      "EE": "JAA", // Estonia
      "HR": "DA", // Croatia
      "CN": "???", // China (Mandarin)
      "TW": "???", // Taiwan (Mandarin)
      "IN": "?????????", // India (Hindi)
      "SG": "YA", // Singapore
      "PH": "??O", // Phillipines
      "IL": "????", // Israel
      "KR": "???", // Korea
      "PK": "???? ??????", // Pakistan
      "CZ": "ANO", // Czech Republic
      "BG": "????", // Bulgaria
      "SK": "??NO", // Slovakia
      "GR": "??????", // Greece
      "IS": "J??", // Iceland
      "VE": "S??", // Venezuela
      "SI": "DA", // Slovenia
      "TH": "?????????", // Thailand
      "LV": "J??", // Latvia
      "RU": "????", // Russia
      "HK": "???", // Hong Kong (Cantonese)
      "MO": "???", // Macau (Cantonese)
      "TR": "EVET", // Turkey
      "MY": "YA", // Malaysia
      "PR": "S??", // Puerto Rico
      "CO": "S??", // Colombia
      "EC": "S??", // Ecuador
      "PE": "S??", // Peru
      "CR": "S??", // Costa Rica
      "UY": "S??", // Uruguay
      "CY": "NE", // Cyprus
      "GT": "S??", // Guatemala
      "SV": "S??", // El Salvador
      "DO": "S??", // Dominican Republic
      "BM": "SIM", // Bermuda
      "PA": "S??", // Panama
      "BO": "S??", // Bolivia
      "TT": "S??", // Trinidad & Tobago
      "DM": "W??", // Dominica (Creole)
      "HT": "W??", // Haiti (Creole)
      "JM": "YES", // Jamaica
      "BB": "YES", // Barbado
      "BZ": "YES", // Belize
      "UA": "??????", // Ukraine - https://github.com/isitchristmas/web/issues/67
      "AM": "??????", // Armenia - https://github.com/isitchristmas/web/issues/71
      "KY": "YES", // Cayman Islands
      "NI": "S??", // Nicaragua
      "PY": "H??E", // Paraguay
      "VN": "????NG", // Vietnam
      "MM": "????????????????????????", // Myanmar (Burmese)
      "TZ": "NDIO", //Tanzania (Swahili)
      "KE": "NDIO", //Kenya (Swahili)
      "ZM": "EYA", //Zambia (Bemba)
      "MN": "????????", // Mongolian
      "MU": "WI" // Mauritius (French Creole?)
    }

    return codes[countryCode] || "YES";
  },

  // missing your country?
  // post a ticket here: https://github.com/isitchristmas/web/issues
  no: function(countryCode) {

    var codes = {
      "US": "NO", // United States
      "FR": "NON", // France
      "NL": "NEE", // Netherlands
      "ZA": "NEE", // South Africa
      "ES": "NO", // Spain
      "UK": "NO", // United Kingdom
      "CA": "NO/NON", // Canada (English/French)
      "PL": "NIE", // Poland
      "AX": "NEJ", // ??land Islands
      "SE": "NEJ", // Sweden
      "LT": "NE", // Lithuania
      "DE": "NEIN", // Germany
      "IE": "N?? hEA", // Ireland
      "AU": "NO", // Australia
      "JP": "?????????", // Japan
      "NO": "NEI", // Norway
      "IT": "NO", // Italy
      "HU": "NEM", // Hungary
      "DK": "NEJ", // Denmark
      "FI": "EI", // Finland
      "BE": "NEE", // Belgium
      "CL": "NO", // Chile
      "MX": "NO", // Mexico
      "NZ": "NO", // New Zealand
      "AT": "NEIN", // Austria
      "RO": "NU", // Romania
      "CH": "NEIN/NON/NO/NA", // Switzerland (German/French/Italian/Romansh)
      "PT": "N??O", // Portugal
      "BR": "N??O", // Brazil
      "AR": "NO", // Argentina
      "EE": "EI", // Estonia
      "HR": "NE", // Croatia
      "CN": "??????", // China (Mandarin)
      "TW": "??????", // Taiwan (Mandarin)
      "IN": "????????????", // India (Hindi)
      "SG": "TIDAK", // Singapore
      "PH": "HINDI", // Phillipines
      "IL": "????", // Israel
      "KR": "?????????", // Korea
      "PK": "????????", // Pakistan
      "CZ": "NE", // Czech Republic
      "BG": "????", // Bulgaria
      "SK": "NIE", // Slovakia
      "GR": "??????", // Greece
      "IS": "NEI", // Iceland
      "VE": "NO", // Venezuela
      "SI": "NE", // Slovenia
      "TH": "??????????????????", // Thailand
      "LV": "N??", // Latvia
      "RU": "??????", // Russia
      "HK": "??????", // Hong Kong (Cantonese)
      "MO": "??????", // Macau (Cantonese)
      "TR": "HAYIR", // Turkey
      "MY": "TIDAK", // Malaysia
      "PR": "NO", // Puerto Rico
      "CO": "NO", // Colombia
      "EC": "NO", // Ecuador
      "PE": "NO", // Peru
      "CR": "NO", // Costa Rica
      "UY": "NO", // Uruguay
      "CY": "OHI", // Cyprus
      "GT": "NO", // Guatemala
      "SV": "NO", // El Salvador
      "DO": "NO", // Dominican Republic
      "BM": "N??O", // Bermuda
      "PA": "NO", // Panama
      "BO": "NO", // Bolivia
      "TT": "NO", // Trinidad & Tobago
      "DM": "NON", // Dominica (Creole)
      "HT": "NON", // Haiti (Creole)
      "JM": "NO", // Jamaica
      "BB": "NO", // Barbado
      "BZ": "NO", // Belize
      "UA": "????", // Ukraine - https://github.com/isitchristmas/web/issues/67
      "AM": "????", // Armenia - https://github.com/isitchristmas/web/issues/71
      "KY": "NO", // Cayman Islands
      "NI": "NO", // Nicaragua
      "PY": "NO", // Paraguay
      "VN": "SAI", // Vietnam
      "MM": "???????????????????????????", // Myanmar (Burmese) - https://github.com/isitchristmas/web/issues/151
      "TZ": "HAPANA", //Tanzania (Swahili)
      "KE": "NDIO", //Kenya (Swahili)
      "ZM": "AWEH", //Zambia (Bemba)
      "MN": "????????", // Mongolian
      "MU": "NON" // Mauritius (French Creole?)
    }

    return codes[countryCode] || "NO";
  },

  countries: {
    "AD": {
      "name": "Andorra",
      "width": 29,
      "height": 20,
      "names": [
        "Andorra"
      ]
    },
    "AE": {
      "name": "United Arab Emirates",
      "width": 40,
      "height": 20,
      "names": [
        "???????????????? ?????????????? ??????????????",
        "United Arab Emirates"
      ]
    },
    "AF": {
      "name": "Afghanistan",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????????",
        "Afghanistan"
      ]
    },
    "AG": {
      "name": "Antigua and Barbuda",
      "width": 30,
      "height": 20,
      "names": [
        "Antigua and Barbuda"
      ]
    },
    "AI": {
      "name": "Anguilla",
      "width": 40,
      "height": 20,
      "names": [
        "Anguilla"
      ]
    },
    "AL": {
      "name": "Albania",
      "width": 28,
      "height": 20,
      "names": [
        "Shqip??ria",
        "Albania"
      ]
    },
    "AM": {
      "name": "Armenia",
      "width": 40,
      "height": 20,
      "names": [
        "????????????????",
        "Armenia"
      ]
    },
    "AR": {
      "name": "Argentina",
      "width": 31,
      "height": 20,
      "names": [
        "Argentina"
      ]
    },
    "AT": {
      "name": "Austria",
      "width": 30,
      "height": 20,
      "names": [
        "??sterreich",
        "Austria"
      ]
    },
    "AU": {
      "name": "Australia",
      "width": 40,
      "height": 20,
      "names": [
        "Australia"
      ]
    },
    "AW": {
      "name": "Aruba",
      "names": [
        "Aruba"
      ]
    },
    "AZ": {
      "name": "Azerbaijan",
      "width": 40,
      "height": 20,
      "names": [
        "Az??rbaycan",
        "Azerbaijan"
      ]
    },
    "BA": {
      "name": "Bosnia and Herzegovina",
      "width": 40,
      "height": 20,
      "names": [
        "Bosna i Hercegovina",
        "Bosnia and Herzegovina"
      ]
    },
    "BB": {
      "name": "Barbados",
      "width": 30,
      "height": 20,
      "names": [
        "Barbados"
      ]
    },
    "BD": {
      "name": "Bangladesh",
      "width": 33,
      "height": 20,
      "names": [
        "????????????????????????",
        "Bangladesh"
      ]
    },
    "BE": {
      "name": "Belgium",
      "width": 23,
      "height": 20,
      "names": [
        "Belgien",
        "Belgique",
        "Belgi??",
        "Belgium"
      ]
    },
    "BF": {
      "name": "Burkina Faso",
      "width": 30,
      "height": 20,
      "names": [
        "Burkina Faso"
      ]
    },
    "BG": {
      "name": "Bulgaria",
      "width": 33,
      "height": 20,
      "names": [
        "????????????????",
        "Bulgaria"
      ]
    },
    "BH": {
      "name": "Bahrain",
      "width": 33,
      "height": 20,
      "names": [
        "??????????????",
        "Bahrain"
      ]
    },
    "BM": {
      "name": "Bermuda",
      "width": 40,
      "height": 20,
      "names": [
        "Bermuda"
      ]
    },
    "BN": {
      "name": "Brunei Darussalam",
      "width": 40,
      "height": 20,
      "names": [
        "Brunei"
      ]
    },
    "BO": {
      "name": "Bolivia",
      "width": 29,
      "height": 20,
      "names": [
        "Buliwya",
        "Vol??via",
        "Wuliwya",
        "Bolivia"
      ]
    },
    "BR": {
      "name": "Brazil",
      "width": 29,
      "height": 20,
      "names": [
        "Brasil",
        "Brazil"
      ]
    },
    "BS": {
      "name": "Bahamas",
      "width": 40,
      "height": 20,
      "names": [
        "Bahamas"
      ]
    },
    "BW": {
      "name": "Botswana",
      "width": 30,
      "height": 20,
      "names": [
        "Botswana"
      ]
    },
    "BY": {
      "name": "Belarus",
      "width": 40,
      "height": 20,
      "names": [
        "????????????????",
        "Belarus"
      ]
    },
    "BZ": {
      "name": "Belize",
      "width": 30,
      "height": 20,
      "names": [
        "Belize"
      ]
    },
    "CA": {
      "name": "Canada",
      "width": 40,
      "height": 20,
      "names": [
        "Canada"
      ]
    },
    "CD": {
      "name": "Congo (DRC)",
      "width": 30,
      "height": 20,
      "names": [
        "Congo, R??publique d??mocratique",
        "Congo, Democratic Republic"
      ]
    },
    "CH": {
      "name": "Switzerland",
      "width": 20,
      "height": 20,
      "names": [
        "Svizra",
        "Svizzera",
        "Suisse",
        "Schweiz",
        "Switzerland"
      ]
    },
    "CI": {
      "name": "Cote D'Ivoire (Ivory Coast)",
      "width": 30,
      "height": 20,
      "names": [
        "C??te d'Ivoire"
      ]
    },
    "CL": {
      "name": "Chile",
      "width": 30,
      "height": 20,
      "names": [
        "Chile"
      ]
    },
    "CM": {
      "name": "Cameroon",
      "width": 30,
      "height": 20,
      "names": [
        "Cameroun",
        "Cameroon"
      ]
    },
    "CN": {
      "name": "China",
      "width": 30,
      "height": 20,
      "names": [
        "??????/??????",
        "China"
      ]
    },
    "CO": {
      "name": "Colombia",
      "width": 30,
      "height": 20,
      "names": [
        "Colombia"
      ]
    },
    "CR": {
      "name": "Costa Rica",
      "width": 33,
      "height": 20,
      "names": [
        "Costa Rica"
      ]
    },
    "CU": {
      "name": "Cuba",
      "width": 40,
      "height": 20,
      "names": [
        "Cuba"
      ]
    },
    "CY": {
      "name": "Cyprus",
      "width": 33,
      "height": 20,
      "names": [
        "K??br??s",
        "????????????",
        "Cyprus"
      ]
    },
    "CZ": {
      "name": "Czech Republic",
      "width": 30,
      "height": 20,
      "names": [
        "??esko",
        "Czechia"
      ]
    },
    "DE": {
      "name": "Germany",
      "width": 33,
      "height": 20,
      "names": [
        "Deutschland",
        "Germany"
      ]
    },
    "DK": {
      "name": "Denmark",
      "width": 26,
      "height": 20,
      "names": [
        "Danmark",
        "Denmark"
      ]
    },
    "DM": {
      "name": "Dominica",
      "width": 40,
      "height": 20,
      "names": [
        "Dominica"
      ]
    },
    "DO": {
      "name": "Dominican Republic",
      "width": 32,
      "height": 20,
      "names": [
        "Rep??blica Dominicana",
        "Dominican Republic"
      ]
    },
    "DZ": {
      "name": "Algeria",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????",
        "Algeria"
      ]
    },
    "EC": {
      "name": "Ecuador",
      "width": 40,
      "height": 20,
      "names": [
        "Ecuador"
      ]
    },
    "EE": {
      "name": "Estonia",
      "width": 31,
      "height": 20,
      "names": [
        "Eesti",
        "Estonia"
      ]
    },
    "EG": {
      "name": "Egypt",
      "width": 30,
      "height": 20,
      "names": [
        "??????",
        "Egypt"
      ]
    },
    "ES": {
      "name": "Spain",
      "width": 30,
      "height": 20,
      "names": [
        "Espa??a",
        "Spain"
      ]
    },
    "ET": {
      "name": "Ethiopia",
      "width": 40,
      "height": 20,
      "names": [
        "???????????????",
        "Ethiopia"
      ]
    },
    "FI": {
      "name": "Finland",
      "width": 33,
      "height": 20,
      "names": [
        "Suomi",
        "Finland"
      ]
    },
    "FJ": {
      "name": "Fiji",
      "width": 40,
      "height": 20,
      "names": [
        "???????????????",
        "Viti",
        "Fiji"
      ]
    },
    "FO": {
      "name": "Faroe Islands",
      "width": 27,
      "height": 20,
      "names": [
        "Faroe Islands"
      ]
    },
    "FR": {
      "name": "France",
      "width": 30,
      "height": 20,
      "names": [
        "France"
      ]
    },
    "GA": {
      "name": "Gabon",
      "width": 27,
      "height": 20,
      "names": [
        "Gabon"
      ]
    },
    "GB": {
      "name": "United Kingdom",
      "width": 40,
      "height": 20,
      "names": [
        "United Kingdom"
      ]
    },
    "GD": {
      "name": "Grenada",
      "width": 33,
      "height": 20,
      "names": [
        "Grenada"
      ]
    },
    "GE": {
      "name": "Georgia",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????????????????????",
        "Georgia"
      ]
    },
    "GG": {
      "name": "Guernsey",
      "width": 30,
      "height": 20,
      "names": [
        "Guernsey"
      ]
    },
    "GH": {
      "name": "Ghana",
      "width": 30,
      "height": 20,
      "names": [
        "Ghana"
      ]
    },
    "GI": {
      "name": "Gibraltar",
      "width": 40,
      "height": 20,
      "names": [
        "Gibraltar"
      ]
    },
    "GL": {
      "name": "Greenland",
      "width": 30,
      "height": 20,
      "names": [
        "Greenland"
      ]
    },
    "GM": {
      "name": "Gambia",
      "width": 30,
      "height": 20,
      "names": [
        "Gambia"
      ]
    },
    "GP": {
      "name": "Guadeloupe",
      "width": 30,
      "height": 20,
      "names": [
        "Guadeloupe"
      ]
    },
    "GR": {
      "name": "Greece",
      "width": 30,
      "height": 20,
      "names": [
        "????????????",
        "Greece"
      ]
    },
    "GT": {
      "name": "Guatemala",
      "width": 32,
      "height": 20,
      "names": [
        "Guatemala"
      ]
    },
    "GU": {
      "name": "Guam",
      "width": 37,
      "height": 20,
      "names": [
        "Guam"
      ]
    },
    "GY": {
      "name": "Guyana",
      "width": 33,
      "height": 20,
      "names": [
        "Guyana"
      ]
    },
    "HK": {
      "name": "Hong Kong",
      "width": 30,
      "height": 20,
      "names": [
        "??????",
        "Hong Kong"
      ]
    },
    "HN": {
      "name": "Honduras",
      "width": 40,
      "height": 20,
      "names": [
        "Honduras"
      ]
    },
    "HR": {
      "name": "Croatia",
      "width": 40,
      "height": 20,
      "names": [
        "Hrvatska",
        "Croatia"
      ]
    },
    "HT": {
      "name": "Haiti",
      "width": 33,
      "height": 20,
      "names": [
        "Ayiti",
        "Ha??ti",
        "Haiti"
      ]
    },
    "HU": {
      "name": "Hungary",
      "width": 40,
      "height": 20,
      "names": [
        "Magyarorsz??g",
        "Hungary"
      ]
    },
    "ID": {
      "name": "Indonesia",
      "width": 30,
      "height": 20,
      "names": [
        "Indonesia"
      ]
    },
    "IE": {
      "name": "Ireland",
      "width": 40,
      "height": 20,
      "names": [
        "??ire",
        "Ireland"
      ]
    },
    "IL": {
      "name": "Israel",
      "width": 28,
      "height": 20,
      "names": [
        "??????????",
        "??????????????",
        "Israel"
      ]
    },
    "IM": {
      "name": "Isle of Man",
      "width": 40,
      "height": 20,
      "names": [
        "Isle of Man"
      ]
    },
    "IN": {
      "name": "India",
      "width": 30,
      "height": 20,
      "names": [
        "????????????",
        "India"
      ]
    },
    "IO": {
      "name": "British Indian Ocean Territory",
      "width": 40,
      "height": 20,
      "names": [
        "British Indian Ocean Territory"
      ]
    },
    "IQ": {
      "name": "Iraq",
      "width": 30,
      "height": 20,
      "names": [
        "????????????",
        "Iraq"
      ]
    },
    "IR": {
      "name": "Iran",
      "width": 35,
      "height": 20,
      "names": [
        "??????????",
        "Iran"
      ]
    },
    "IS": {
      "name": "Iceland",
      "width": 28,
      "height": 20,
      "names": [
        "??sland",
        "Iceland"
      ]
    },
    "IT": {
      "name": "Italy",
      "width": 30,
      "height": 20,
      "names": [
        "Italia",
        "Italy"
      ]
    },
    "JE": {
      "name": "Jersey",
      "width": 33,
      "height": 20,
      "names": [
        "Jersey"
      ]
    },
    "JM": {
      "name": "Jamaica",
      "width": 40,
      "height": 20,
      "names": [
        "Jamaica"
      ]
    },
    "JO": {
      "name": "Jordan",
      "width": 40,
      "height": 20,
      "names": [
        "????????????",
        "Jordan"
      ]
    },
    "JP": {
      "name": "Japan",
      "width": 30,
      "height": 20,
      "names": [
        "??????",
        "Japan"
      ]
    },
    "KE": {
      "name": "Kenya",
      "width": 30,
      "height": 20,
      "names": [
        "Kenya"
      ]
    },
    "KG": {
      "name": "Kyrgyzstan",
      "width": 33,
      "height": 20,
      "names": [
        "????????????????????",
        "Kyrgyzstan"
      ]
    },
    "KH": {
      "name": "Cambodia",
      "width": 30,
      "height": 20,
      "names": [
        "?????????????????????",
        "Cambodia"
      ]
    },
    "KN": {
      "name": "Saint Kitts and Nevis",
      "width": 30,
      "height": 20,
      "names": [
        "Saint Kitts  Nevis"
      ]
    },
    "KR": {
      "name": "South Korea",
      "width": 30,
      "height": 20,
      "names": [
        "??????",
        "Korea, South"
      ]
    },
    "KW": {
      "name": "Kuwait",
      "width": 40,
      "height": 20,
      "names": [
        "????????????",
        "Kuwait"
      ]
    },
    "KY": {
      "name": "Cayman Islands",
      "width": 40,
      "height": 20,
      "names": [
        "Cayman Islands"
      ]
    },
    "KZ": {
      "name": "Kazakhstan",
      "width": 40,
      "height": 20,
      "names": [
        "??????????????????",
        "Kazakhstan"
      ]
    },
    "LA": {
      "name": "Laos",
      "width": 30,
      "height": 20,
      "names": [
        "???????????????????????????",
        "Laos"
      ]
    },
    "LB": {
      "name": "Lebanon",
      "width": 30,
      "height": 20,
      "names": [
        "??????????",
        "Lebanon"
      ]
    },
    "LI": {
      "name": "Liechtenstein",
      "width": 33,
      "height": 20,
      "names": [
        "Liechtenstein"
      ]
    },
    "LK": {
      "name": "Sri Lanka",
      "width": 40,
      "height": 20,
      "names": [
        "??????????????????",
        "???????????? ???????????????",
        "Sri Lanka"
      ]
    },
    "LS": {
      "name": "Lesotho",
      "width": 30,
      "height": 20,
      "names": [
        "Lesotho"
      ]
    },
    "LT": {
      "name": "Lithuania",
      "width": 33,
      "height": 20,
      "names": [
        "Lietuva",
        "Lithuania"
      ]
    },
    "LU": {
      "name": "Luxembourg",
      "width": 33,
      "height": 20,
      "names": [
        "L??tzebuerg",
        "Luxemburg",
        "Luxembourg"
      ]
    },
    "LV": {
      "name": "Latvia",
      "width": 40,
      "height": 20,
      "names": [
        "Latvija",
        "Latvia"
      ]
    },
    "LY": {
      "name": "Libya",
      "width": 40,
      "height": 20,
      "names": [
        "??????????",
        "Libya"
      ]
    },
    "MA": {
      "name": "Morocco",
      "width": 30,
      "height": 20,
      "names": [
        "????????????",
        "Morocco"
      ]
    },
    "MC": {
      "name": "Monaco",
      "width": 25,
      "height": 20,
      "names": [
        "Monaco"
      ]
    },
    "MD": {
      "name": "Moldova, Republic of",
      "width": 40,
      "height": 20,
      "names": [
        "Moldova"
      ]
    },
    "ME": {
      "name": "Montenegro",
      "width": 40,
      "height": 20,
      "names": [
        "Crna Gora / ???????? ????????",
        "Montenegro"
      ]
    },
    "MG": {
      "name": "Madagascar",
      "width": 30,
      "height": 20,
      "names": [
        "Madagasikara",
        "Madagascar"
      ]
    },
    "MK": {
      "name": "Macedonia",
      "width": 40,
      "height": 20,
      "names": [
        "????????????????????",
        "Macedonia"
      ]
    },
    "ML": {
      "name": "Mali",
      "width": 30,
      "height": 20,
      "names": [
        "Mali"
      ]
    },
    "MM": {
      "name": "Myanmar",
      "width": 36,
      "height": 20,
      "names": [
        "??????????????????",
        "Burma"
      ]
    },
    "MN": {
      "name": "Mongolia",
      "width": 40,
      "height": 20,
      "names": [
        "???????????? ??????",
        "Mongolia"
      ]
    },
    "MO": {
      "name": "Macau",
      "width": 30,
      "height": 20,
      "names": [
        "??????",
        "Macao",
        "Macau"
      ]
    },
    "MP": {
      "name": "Northern Mariana Islands",
      "width": 40,
      "height": 20,
      "names": [
        "Northern Mariana Islands"
      ]
    },
    "MQ": {
      "name": "Martinique",
      "width": 30,
      "height": 20,
      "names": [
        "Martinique"
      ]
    },
    "MT": {
      "name": "Malta",
      "width": 30,
      "height": 20,
      "names": [
        "Malta"
      ]
    },
    "MU": {
      "name": "Mauritius",
      "width": 30,
      "height": 20,
      "names": [
        "Maurice",
        "Mauritius"
      ]
    },
    "MV": {
      "name": "Maldives",
      "width": 30,
      "height": 20,
      "names": [
        "????????????????????????",
        "Maldives"
      ]
    },
    "MW": {
      "name": "Malawi",
      "width": 30,
      "height": 20,
      "names": [
        "Mala??i",
        "Malawi"
      ]
    },
    "MX": {
      "name": "Mexico",
      "width": 35,
      "height": 20,
      "names": [
        "M??xihco",
        "M??xico",
        "Mexico"
      ]
    },
    "MY": {
      "name": "Malaysia",
      "width": 40,
      "height": 20,
      "names": [
        "Malaysia"
      ]
    },
    "NA": {
      "name": "Namibia",
      "width": 30,
      "height": 20,
      "names": [
        "Namibia"
      ]
    },
    "NC": {
      "name": "New Caledonia",
      "width": 40,
      "height": 20,
      "names": [
        "New Caledonia"
      ]
    },
    "NG": {
      "name": "Nigeria",
      "width": 40,
      "height": 20,
      "names": [
        "Nigeria"
      ]
    },
    "NI": {
      "name": "Nicaragua",
      "width": 33,
      "height": 20,
      "names": [
        "Nicaragua"
      ]
    },
    "NL": {
      "name": "Netherlands",
      "width": 30,
      "height": 20,
      "names": [
        "Nederland",
        "Netherlands"
      ]
    },
    "NO": {
      "name": "Norway",
      "width": 28,
      "height": 20,
      "names": [
        "Norge / Noreg",
        "Norway"
      ]
    },
    "NP": {
      "name": "Nepal",
      "width": 16,
      "height": 20,
      "names": [
        "???????????????",
        "Nepal"
      ]
    },
    "NZ": {
      "name": "New Zealand",
      "width": 40,
      "height": 20,
      "names": [
        "Aotearoa",
        "New Zealand"
      ]
    },
    "OM": {
      "name": "Oman",
      "width": 40,
      "height": 20,
      "names": [
        "????????",
        "Oman"
      ]
    },
    "PA": {
      "name": "Panama",
      "width": 30,
      "height": 20,
      "names": [
        "Panam??",
        "Panama"
      ]
    },
    "PE": {
      "name": "Peru",
      "width": 30,
      "height": 20,
      "names": [
        "Per??",
        "Peru"
      ]
    },
    "PF": {
      "name": "French Polynesia",
      "width": 30,
      "height": 20,
      "names": [
        "French Polynesia"
      ]
    },
    "PG": {
      "name": "Papua New Guinea",
      "width": 27,
      "height": 20,
      "names": [
        "Papua Niugini",
        "Papua New Guinea"
      ]
    },
    "PH": {
      "name": "Philippines",
      "width": 40,
      "height": 20,
      "names": [
        "Pilipinas",
        "Philippines"
      ]
    },
    "PK": {
      "name": "Pakistan",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????",
        "Pakistan"
      ]
    },
    "PL": {
      "name": "Poland",
      "width": 32,
      "height": 20,
      "names": [
        "Polska",
        "Poland"
      ]
    },
    "PM": {
      "name": "Saint Pierre and Miquelon",
      "width": 30,
      "height": 20,
      "names": [
        "Saint Pierre and Miquelon"
      ]
    },
    "PR": {
      "name": "Puerto Rico",
      "width": 30,
      "height": 20,
      "names": [
        "Puerto Rico"
      ]
    },
    "PS": {
      "name": "Palestinian Territory",
      "width": 40,
      "height": 20,
      "names": [
        "????????????",
        "Palestine"
      ]
    },
    "PT": {
      "name": "Portugal",
      "width": 30,
      "height": 20,
      "names": [
        "Portugal"
      ]
    },
    "PY": {
      "name": "Paraguay",
      "width": 33,
      "height": 20,
      "names": [
        "Paragu??i",
        "Paraguay"
      ]
    },
    "QA": {
      "name": "Qatar",
      "width": 51,
      "height": 20,
      "names": [
        "??????",
        "Qatar"
      ]
    },
    "RE": {
      "name": "Reunion",
      "width": 37,
      "height": 20,
      "names": [
        "Reunion"
      ]
    },
    "RO": {
      "name": "Romania",
      "width": 30,
      "height": 20,
      "names": [
        "Rom??nia",
        "Romania"
      ]
    },
    "RS": {
      "name": "Serbia",
      "width": 30,
      "height": 20,
      "names": [
        "???????????? / Srbija",
        "Serbia"
      ]
    },
    "RU": {
      "name": "Russian Federation",
      "width": 30,
      "height": 20,
      "names": [
        "????????????",
        "Russia"
      ]
    },
    "RW": {
      "name": "Rwanda",
      "width": 30,
      "height": 20,
      "names": [
        "Rwanda"
      ]
    },
    "SA": {
      "name": "Saudi Arabia",
      "width": 30,
      "height": 20,
      "names": [
        "????????????????",
        "Saudi Arabia"
      ]
    },
    "SC": {
      "name": "Seychelles",
      "width": 40,
      "height": 20,
      "names": [
        "Sesel",
        "Seychelles"
      ]
    },
    "SD": {
      "name": "Sudan",
      "width": 40,
      "height": 20,
      "names": [
        "??????????????",
        "Sudan"
      ]
    },
    "SE": {
      "name": "Sweden",
      "width": 32,
      "height": 20,
      "names": [
        "Sverige",
        "Sweden"
      ]
    },
    "SG": {
      "name": "Singapore",
      "width": 30,
      "height": 20,
      "names": [
        "?????????????????????????????????",
        "Singapura",
        "?????????",
        "Singapore"
      ]
    },
    "SI": {
      "name": "Slovenia",
      "width": 40,
      "height": 20,
      "names": [
        "Slovenija",
        "Slovenia"
      ]
    },
    "SK": {
      "name": "Slovakia",
      "width": 30,
      "height": 20,
      "names": [
        "Slovensko",
        "Slovakia"
      ]
    },
    "SN": {
      "name": "Senegal",
      "width": 30,
      "height": 20,
      "names": [
        "S??n??gal",
        "Senegal"
      ]
    },
    "SR": {
      "name": "Suriname",
      "width": 30,
      "height": 20,
      "names": [
        "Suriname"
      ]
    },
    "ST": {
      "name": "Sao Tome and Principe",
      "width": 40,
      "height": 20,
      "names": [
        "S??o Tom?? e Pr??ncipe",
        "Sao Tome  Principe"
      ]
    },
    "SV": {
      "name": "El Salvador",
      "width": 35,
      "height": 20,
      "names": [
        "El Salvador"
      ]
    },
    "SY": {
      "name": "Syrian Arab Republic",
      "width": 30,
      "height": 20,
      "names": [
        "??????????",
        "Syria"
      ]
    },
    "SZ": {
      "name": "Swaziland",
      "width": 30,
      "height": 20,
      "names": [
        "eSwatini",
        "Swaziland"
      ]
    },
    "TC": {
      "name": "Turks and Caicos Islands",
      "width": 40,
      "height": 20,
      "names": [
        "Turks and Caicos Islands"
      ]
    },
    "TH": {
      "name": "Thailand",
      "width": 30,
      "height": 20,
      "names": [
        "???????????????????????????",
        "Thailand"
      ]
    },
    "TJ": {
      "name": "Tajikistan",
      "width": 40,
      "height": 20,
      "names": [
        "????????????????????",
        "Tajikistan"
      ]
    },
    "TN": {
      "name": "Tunisia",
      "width": 30,
      "height": 20,
      "names": [
        "????????",
        "Tunisia"
      ]
    },
    "TR": {
      "name": "Turkey",
      "width": 30,
      "height": 20,
      "names": [
        "T??rkiye",
        "Turkey"
      ]
    },
    "TT": {
      "name": "Trinidad and Tobago",
      "width": 33,
      "height": 20,
      "names": [
        "Trinidad and Tobago"
      ]
    },
    "TW": {
      "name": "Taiwan",
      "width": 30,
      "height": 20,
      "names": [
        "??????/??????",
        "Taiwan"
      ]
    },
    "TZ": {
      "name": "Tanzania, United Republic of",
      "width": 30,
      "height": 20,
      "names": [
        "Tanzania"
      ]
    },
    "UA": {
      "name": "Ukraine",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????",
        "Ukraine"
      ]
    },
    "UG": {
      "name": "Uganda",
      "width": 30,
      "height": 20,
      "names": [
        "Uganda"
      ]
    },
    "US": {
      "name": "United States",
      "width": 38,
      "height": 20,
      "names": [
        "United States"
      ]
    },
    "UY": {
      "name": "Uruguay",
      "width": 30,
      "height": 20,
      "names": [
        "Uruguay"
      ]
    },
    "UZ": {
      "name": "Uzbekistan",
      "width": 40,
      "height": 20,
      "names": [
        "O??zbekiston",
        "Uzbekistan"
      ]
    },
    "VC": {
      "name": "Saint Vincent and the Grenadines",
      "width": 30,
      "height": 20,
      "names": [
        "Saint Vincent  the Grenadines"
      ]
    },
    "VE": {
      "name": "Venezuela",
      "width": 30,
      "height": 20,
      "names": [
        "Venezuela"
      ]
    },
    "VG": {
      "name": "Virgin Islands, British",
      "width": 40,
      "height": 20,
      "names": [
        "Virgin Islands, British"
      ]
    },
    "VI": {
      "name": "Virgin Islands, U.S.",
      "width": 30,
      "height": 20,
      "names": [
        "Virgin Islands, U.S."
      ]
    },
    "VN": {
      "name": "Vietnam",
      "width": 30,
      "height": 20,
      "names": [
        "Vi???t Nam",
        "Vietnam"
      ]
    },
    "WS": {
      "name": "Samoa",
      "width": 40,
      "height": 20,
      "names": [
        "S??moa",
        "Samoa"
      ]
    },
    "YE": {
      "name": "Yemen",
      "width": 30,
      "height": 20,
      "names": [
        "??????????",
        "Yemen"
      ]
    },
    "ZA": {
      "name": "South Africa",
      "width": 30,
      "height": 20,
      "names": [
        "Suid-Afrika",
        "South Africa"
      ]
    },
    "ZM": {
      "name": "Zambia",
      "width": 30,
      "height": 20,
      "names": [
        "Zambia"
      ]
    },
    "ZW": {
      "name": "Zimbabwe",
      "width": 40,
      "height": 20,
      "names": [
        "Zimbabwe"
      ]
    },
    "AO": {
      "name": "Angola",
      "width": 30,
      "height": 20,
      "names": [
        "Angola"
      ]
    },
    "AX": {
      "name": "??land Islands",
      "width": 31,
      "height": 20,
      "names": [
        "??land Islands"
      ]
    },
    "BI": {
      "name": "Burundi",
      "width": 33,
      "height": 20,
      "names": [
        "Uburundi",
        "Burundi"
      ]
    },
    "BJ": {
      "name": "Benin",
      "width": 30,
      "height": 20,
      "names": [
        "B??nin",
        "Benin"
      ]
    },
    "BL": {
      "name": "Saint Barthelemy",
      "width": 30,
      "height": 20,
      "names": [
        "Saint Barthelemy"
      ]
    },
    "BQ": {
      "name": "Bonaire, Saint Eustatius and Saba",
      "width": 30,
      "height": 20,
      "names": [
        "Bonaire, Saint Eustatius and Saba"
      ]
    },
    "BT": {
      "name": "Bhutan",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????????????????????",
        "Bhutan"
      ]
    },
    "BV": {
      "name": "Bouvet Island",
      "names": [
        "Bouvet Island"
      ]
    },
    "CF": {
      "name": "Central African Republic",
      "width": 30,
      "height": 20,
      "names": [
        "B??afr??ka",
        "Centrafrique",
        "Central African Republic"
      ]
    },
    "CG": {
      "name": "Congo",
      "width": 30,
      "height": 20,
      "names": [
        "Congo, R??publique",
        "Congo, Republic"
      ]
    },
    "CK": {
      "name": "Cook Islands",
      "width": 40,
      "height": 20,
      "names": [
        "Cook Islands"
      ]
    },
    "CV": {
      "name": "Cape Verde",
      "width": 34,
      "height": 20,
      "names": [
        "Cabo Verde",
        "Cape Verde"
      ]
    },
    "CW": {
      "name": "Curacao",
      "width": 30,
      "height": 20,
      "names": [
        "Curacao"
      ]
    },
    "DJ": {
      "name": "Djibouti",
      "width": 30,
      "height": 20,
      "names": [
        "????????????",
        "Djibouti"
      ]
    },
    "ER": {
      "name": "Eritrea",
      "width": 40,
      "height": 20,
      "names": [
        "????????????",
        "????????????",
        "Eritrea"
      ]
    },
    "FK": {
      "name": "Falkland Islands (Malvinas)",
      "width": 40,
      "height": 20,
      "names": [
        "Falkland Islands (Malvinas)"
      ]
    },
    "FM": {
      "name": "Micronesia, Federated States of",
      "width": 38,
      "height": 20,
      "names": [
        "Micronesia"
      ]
    },
    "GF": {
      "name": "French Guiana",
      "width": 30,
      "height": 20,
      "names": [
        "French Guiana"
      ]
    },
    "GN": {
      "name": "Guinea",
      "width": 30,
      "height": 20,
      "names": [
        "Guin??e",
        "Guinea"
      ]
    },
    "GQ": {
      "name": "Equatorial Guinea",
      "width": 30,
      "height": 20,
      "names": [
        "Guin?? Equatorial",
        "Guin??e ??quatoriale",
        "Guinea Ecuatorial",
        "Equatorial Guinea"
      ]
    },
    "GW": {
      "name": "Guinea-Bissau",
      "width": 40,
      "height": 20,
      "names": [
        "Guin??-Bissau",
        "Guinea-Bissau"
      ]
    },
    "HM": {
      "name": "Heard Island and McDonald Islands",
      "names": [
        "Heard Island and McDonald Islands"
      ]
    },
    "KI": {
      "name": "Kiribati",
      "width": 40,
      "height": 20,
      "names": [
        "Kiribati"
      ]
    },
    "KM": {
      "name": "Comoros",
      "width": 33,
      "height": 20,
      "names": [
        "?????? ??????????",
        "Comores",
        "Komori",
        "Comoros"
      ]
    },
    "KP": {
      "name": "Korea, Democratic People's Republic of",
      "width": 40,
      "height": 20,
      "names": [
        "??????",
        "Korea, North"
      ]
    },
    "LC": {
      "name": "Saint Lucia",
      "width": 40,
      "height": 20,
      "names": [
        "Saint Lucia"
      ]
    },
    "LR": {
      "name": "Liberia",
      "width": 38,
      "height": 20,
      "names": [
        "Liberia"
      ]
    },
    "MF": {
      "name": "Saint Martin",
      "names": [
        "Saint Martin"
      ]
    },
    "MH": {
      "name": "Marshall Islands",
      "width": 38,
      "height": 20,
      "names": [
        "Ael????in ???aje???",
        "Marshall Islands"
      ]
    },
    "MR": {
      "name": "Mauritania",
      "width": 30,
      "height": 20,
      "names": [
        "Mauritanie",
        "??????????????????",
        "Mauritania"
      ]
    },
    "MS": {
      "name": "Montserrat",
      "width": 40,
      "height": 20,
      "names": [
        "Montserrat"
      ]
    },
    "MZ": {
      "name": "Mozambique",
      "width": 30,
      "height": 20,
      "names": [
        "Mo??ambique",
        "Mozambique"
      ]
    },
    "NE": {
      "name": "Niger",
      "width": 23,
      "height": 20,
      "names": [
        "Niger"
      ]
    },
    "NF": {
      "name": "Norfolk Island",
      "width": 40,
      "height": 20,
      "names": [
        "Norfolk Island"
      ]
    },
    "NR": {
      "name": "Nauru",
      "width": 40,
      "height": 20,
      "names": [
        "Naoero",
        "Nauru"
      ]
    },
    "NU": {
      "name": "Niue",
      "width": 40,
      "height": 20,
      "names": [
        "Niue"
      ]
    },
    "PW": {
      "name": "Palau",
      "width": 32,
      "height": 20,
      "names": [
        "Belau",
        "Palau"
      ]
    },
    "SB": {
      "name": "Solomon Islands",
      "width": 40,
      "height": 20,
      "names": [
        "Solomon Islands"
      ]
    },
    "SH": {
      "name": "Saint Helena",
      "width": 40,
      "height": 20,
      "names": [
        "Saint Helena"
      ]
    },
    "SL": {
      "name": "Sierra Leone",
      "width": 30,
      "height": 20,
      "names": [
        "Sierra Leone"
      ]
    },
    "SM": {
      "name": "San Marino",
      "width": 27,
      "height": 20,
      "names": [
        "San Marino"
      ]
    },
    "SO": {
      "name": "Somalia",
      "width": 30,
      "height": 20,
      "names": [
        "??????????????",
        "Soomaaliya",
        "Somalia"
      ]
    },
    "TD": {
      "name": "Chad",
      "width": 30,
      "height": 20,
      "names": [
        "????????",
        "Tchad",
        "Chad"
      ]
    },
    "TG": {
      "name": "Togo",
      "width": 32,
      "height": 20,
      "names": [
        "Togo"
      ]
    },
    "TK": {
      "name": "Tokelau",
      "width": 40,
      "height": 20,
      "names": [
        "Tokelau"
      ]
    },
    "TL": {
      "name": "Timor-Leste",
      "width": 40,
      "height": 20,
      "names": [
        "Timor-Leste",
        "Tim??r-Leste",
        "East Timor"
      ]
    },
    "TM": {
      "name": "Turkmenistan",
      "width": 30,
      "height": 20,
      "names": [
        "T??rkmenistan",
        "Turkmenistan"
      ]
    },
    "TO": {
      "name": "Tonga",
      "width": 40,
      "height": 20,
      "names": [
        "Tonga"
      ]
    },
    "TV": {
      "name": "Tuvalu",
      "width": 40,
      "height": 20,
      "names": [
        "Tuvalu"
      ]
    },
    "UM": {
      "name": "United States Minor Outlying Islands",
      "names": [
        "United States Minor Outlying Islands"
      ]
    },
    "VA": {
      "name": "Holy See (Vatican City State)",
      "width": 20,
      "height": 20,
      "names": [
        "Civitas Vaticana",
        "Vatican City"
      ]
    },
    "VU": {
      "name": "Vanuatu",
      "width": 33,
      "height": 20,
      "names": [
        "Vanuatu"
      ]
    },
    "WF": {
      "name": "Wallis and Futuna",
      "width": 30,
      "height": 20,
      "names": [
        "Wallis and Futuna"
      ]
    },
    "YT": {
      "name": "Mayotte",
      "width": 30,
      "height": 20,
      "names": [
        "Mayotte"
      ]
    },
    "A1": {
      "name": "Anonymous Proxy",
      "names": [
        "Anonymous Proxy"
      ]
    },
    "A2": {
      "name": "Satellite Provider",
      "names": [
        "Satellite Provider"
      ]
    },
    "AS": {
      "name": "American Samoa",
      "width": 40,
      "height": 20,
      "names": [
        "American Samoa"
      ]
    },
    "AP": {
      "name": "Asia/Pacific Region",
      "names": [
        "Asia/Pacific Region"
      ]
    },
    "AQ": {
      "name": "Antarctica",
      "width": 30,
      "height": 20,
      "names": [
        "Antarctica"
      ]
    },
    "EU": {
      "name": "Europe",
      "names": [
        "Europe"
      ]
    },
    "EO": {
      "name": "Esperanto",
      "width": 30,
      "height": 20,
      "names": [
        "Esperanto"
      ]
    }
  }
};


// // use this client-side and server-side

if (typeof(window) !== "undefined")
  window.Christmas = Christmas;

if (typeof(module) !== "undefined" && module.exports)
  module.exports = Christmas;

}
}());
