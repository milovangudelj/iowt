// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

export type CountryCode =
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ-BO"
  | "BQ-SA"
  | "BQ-SE"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "UM"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW";

export const countries: { code: CountryCode; name: string; prefix: string }[] =
  [
    { code: "AD", name: `Andorra`, prefix: "" },
    { code: "AE", name: `United Arab Emirates`, prefix: "" },
    { code: "AF", name: `Afghanistan`, prefix: "" },
    { code: "AG", name: `Antigua and Barbuda`, prefix: "" },
    { code: "AI", name: `Anguilla`, prefix: "" },
    { code: "AL", name: `Albania`, prefix: "" },
    { code: "AM", name: `Armenia`, prefix: "" },
    { code: "AO", name: `Angola`, prefix: "" },
    { code: "AQ", name: `Antarctica`, prefix: "" },
    { code: "AR", name: `Argentina`, prefix: "" },
    { code: "AS", name: `American Samoa`, prefix: "" },
    { code: "AT", name: `Austria`, prefix: "" },
    { code: "AU", name: `Australia`, prefix: "" },
    { code: "AW", name: `Aruba`, prefix: "" },
    { code: "AX", name: `Aland Islands`, prefix: "" },
    { code: "AZ", name: `Azerbaijan`, prefix: "" },
    { code: "BA", name: `Bosnia and Herzegovina`, prefix: "" },
    { code: "BB", name: `Barbados`, prefix: "" },
    { code: "BD", name: `Bangladesh`, prefix: "" },
    { code: "BE", name: `Belgium`, prefix: "" },
    { code: "BF", name: `Burkina Faso`, prefix: "" },
    { code: "BG", name: `Bulgaria`, prefix: "" },
    { code: "BH", name: `Bahrain`, prefix: "" },
    { code: "BI", name: `Burundi`, prefix: "" },
    { code: "BJ", name: `Benin`, prefix: "" },
    { code: "BL", name: `Saint Barthélemy`, prefix: "" },
    { code: "BM", name: `Bermuda`, prefix: "" },
    { code: "BN", name: `Brunei Darussalam`, prefix: "" },
    { code: "BO", name: `Bolivia`, prefix: "" },
    { code: "BQ-BO", name: `Bonaire`, prefix: "" },
    { code: "BQ-SA", name: `Saba`, prefix: "" },
    { code: "BQ-SE", name: `Sint Eustatius`, prefix: "" },
    { code: "BR", name: `Brazil`, prefix: "" },
    { code: "BS", name: `Bahamas`, prefix: "" },
    { code: "BT", name: `Bhutan`, prefix: "" },
    { code: "BV", name: `Bouvet Island`, prefix: "" },
    { code: "BW", name: `Botswana`, prefix: "" },
    { code: "BY", name: `Belarus`, prefix: "" },
    { code: "BZ", name: `Belize`, prefix: "" },
    { code: "CA", name: `Canada`, prefix: "" },
    { code: "CC", name: `Cocos (Keeling) Islands`, prefix: "" },
    { code: "CD", name: `Democratic Republic of the Congo`, prefix: "" },
    { code: "CF", name: `Central African Republic`, prefix: "" },
    { code: "CG", name: `Republic of the Congo`, prefix: "" },
    { code: "CH", name: `Switzerland`, prefix: "" },
    { code: "CI", name: `Côte d'Ivoire (Ivory Coast)`, prefix: "" },
    { code: "CK", name: `Cook Islands`, prefix: "" },
    { code: "CL", name: `Chile`, prefix: "" },
    { code: "CM", name: `Cameroon`, prefix: "" },
    { code: "CN", name: `China`, prefix: "" },
    { code: "CO", name: `Colombia`, prefix: "" },
    { code: "CR", name: `Costa Rica`, prefix: "" },
    { code: "CU", name: `Cuba`, prefix: "" },
    { code: "CV", name: `Cabo Verde`, prefix: "" },
    { code: "CW", name: `Curaçao`, prefix: "" },
    { code: "CX", name: `Christmas Island`, prefix: "" },
    { code: "CY", name: `Cyprus`, prefix: "" },
    { code: "CZ", name: `Czech Republic`, prefix: "" },
    { code: "DE", name: `Germany`, prefix: "" },
    { code: "DJ", name: `Djibouti`, prefix: "" },
    { code: "DK", name: `Denmark`, prefix: "" },
    { code: "DM", name: `Dominica`, prefix: "" },
    { code: "DO", name: `Dominican Republic`, prefix: "" },
    { code: "DZ", name: `Algeria`, prefix: "" },
    { code: "EC", name: `Ecuador`, prefix: "" },
    { code: "EE", name: `Estonia`, prefix: "" },
    { code: "EG", name: `Egypt`, prefix: "" },
    { code: "EH", name: `Western Sahara`, prefix: "" },
    { code: "ER", name: `Eritrea`, prefix: "" },
    { code: "ES", name: `Spain`, prefix: "" },
    { code: "ET", name: `Ethiopia`, prefix: "" },
    { code: "FI", name: `Finland`, prefix: "" },
    { code: "FJ", name: `Fiji`, prefix: "" },
    { code: "FK", name: `Falkland Islands`, prefix: "" },
    { code: "FM", name: `Federated States of Micronesia`, prefix: "" },
    { code: "FO", name: `Faroe Islands`, prefix: "" },
    { code: "FR", name: `France`, prefix: "" },
    { code: "GA", name: `Gabon`, prefix: "" },
    { code: "GB", name: `United Kingdom`, prefix: "" },
    { code: "GD", name: `Grenada`, prefix: "" },
    { code: "GE", name: `Georgia`, prefix: "" },
    { code: "GF", name: `French Guiana`, prefix: "" },
    { code: "GG", name: `Guernsey`, prefix: "" },
    { code: "GH", name: `Ghana`, prefix: "" },
    { code: "GI", name: `Gibraltar`, prefix: "" },
    { code: "GL", name: `Greenland`, prefix: "" },
    { code: "GM", name: `Gambia`, prefix: "" },
    { code: "GN", name: `Guinea`, prefix: "" },
    { code: "GP", name: `Guadeloupe`, prefix: "" },
    { code: "GQ", name: `Equatorial Guinea`, prefix: "" },
    { code: "GR", name: `Greece`, prefix: "" },
    { code: "GS", name: `S. Georgia and S. Sandwich Islands`, prefix: "" },
    { code: "GT", name: `Guatemala`, prefix: "" },
    { code: "GU", name: `Guam`, prefix: "" },
    { code: "GW", name: `Guinea-Bissau`, prefix: "" },
    { code: "GY", name: `Guyana`, prefix: "" },
    { code: "HK", name: `Hong Kong`, prefix: "" },
    { code: "HM", name: `Heard and McDonald Islands`, prefix: "" },
    { code: "HN", name: `Honduras`, prefix: "" },
    { code: "HR", name: `Croatia (Hrvatska)`, prefix: "" },
    { code: "HT", name: `Haiti`, prefix: "" },
    { code: "HU", name: `Hungary`, prefix: "" },
    { code: "ID", name: `Indonesia`, prefix: "" },
    { code: "IE", name: `Ireland`, prefix: "" },
    { code: "IL", name: `Isreal`, prefix: "" },
    { code: "IM", name: `Isle of Man`, prefix: "" },
    { code: "IN", name: `India`, prefix: "" },
    { code: "IO", name: `British Indian Ocean Territory`, prefix: "" },
    { code: "IQ", name: `Iraq`, prefix: "" },
    { code: "IR", name: `Iran`, prefix: "" },
    { code: "IS", name: `Iceland`, prefix: "" },
    { code: "IT", name: `Italy`, prefix: "" },
    { code: "JE", name: `Jersey`, prefix: "" },
    { code: "JM", name: `Jamaica`, prefix: "" },
    { code: "JO", name: `Jordan`, prefix: "" },
    { code: "JP", name: `Japan`, prefix: "" },
    { code: "KE", name: `Kenia`, prefix: "" },
    { code: "KG", name: `Kyrgyzstan`, prefix: "" },
    { code: "KH", name: `Cambodia`, prefix: "" },
    { code: "KI", name: `Kiribati`, prefix: "" },
    { code: "KM", name: `Comoros`, prefix: "" },
    { code: "KN", name: `Saint Kitts and Nevis`, prefix: "" },
    { code: "KP", name: `Korea (North)`, prefix: "" },
    { code: "KR", name: `Korea (South)`, prefix: "" },
    { code: "KW", name: `Kuwait`, prefix: "" },
    { code: "KY", name: `Cayman Islands`, prefix: "" },
    { code: "KZ", name: `Kazakhstan`, prefix: "" },
    { code: "LA", name: `Laos`, prefix: "" },
    { code: "LB", name: `Lebanon`, prefix: "" },
    { code: "LC", name: `Saint Lucia`, prefix: "" },
    { code: "LI", name: `Liechtenstein`, prefix: "" },
    { code: "LK", name: `Sri Lanka`, prefix: "" },
    { code: "LR", name: `Liberia`, prefix: "" },
    { code: "LS", name: `Lesotho`, prefix: "" },
    { code: "LT", name: `Lithuania`, prefix: "" },
    { code: "LU", name: `Luxembourg`, prefix: "" },
    { code: "LV", name: `Latvia`, prefix: "" },
    { code: "LY", name: `Libya`, prefix: "" },
    { code: "MA", name: `Morocco`, prefix: "" },
    { code: "MC", name: `Monaco`, prefix: "" },
    { code: "MD", name: `Moldova`, prefix: "" },
    { code: "ME", name: `Montenegro`, prefix: "" },
    { code: "MF", name: `Saint Martin`, prefix: "" },
    { code: "MG", name: `Madagascar`, prefix: "" },
    { code: "MH", name: `Marshall Islands`, prefix: "" },
    { code: "MK", name: `North Macedonia`, prefix: "" },
    { code: "ML", name: `Mali`, prefix: "" },
    { code: "MM", name: `Myanmar`, prefix: "" },
    { code: "MN", name: `Mongolia`, prefix: "" },
    { code: "MO", name: `Macao`, prefix: "" },
    { code: "MP", name: `Northern Mariana Islands`, prefix: "" },
    { code: "MQ", name: `Martinique`, prefix: "" },
    { code: "MR", name: `Mauritania`, prefix: "" },
    { code: "MS", name: `Montserrat`, prefix: "" },
    { code: "MT", name: `Malta`, prefix: "" },
    { code: "MU", name: `Mauritius`, prefix: "" },
    { code: "MV", name: `Maldives`, prefix: "" },
    { code: "MW", name: `Malawi`, prefix: "" },
    { code: "MX", name: `Mexico`, prefix: "" },
    { code: "MY", name: `Malaysia`, prefix: "" },
    { code: "MZ", name: `Mozambique`, prefix: "" },
    { code: "NA", name: `Namibia`, prefix: "" },
    { code: "NC", name: `New Caledonia`, prefix: "" },
    { code: "NE", name: `Niger`, prefix: "" },
    { code: "NF", name: `Norfolk Island`, prefix: "" },
    { code: "NG", name: `Nigeria`, prefix: "" },
    { code: "NI", name: `Nicaragua`, prefix: "" },
    { code: "NL", name: `Netherlands`, prefix: "" },
    { code: "NO", name: `Norway`, prefix: "" },
    { code: "NP", name: `Nepal`, prefix: "" },
    { code: "NR", name: `Nauru`, prefix: "" },
    { code: "NU", name: `Niue`, prefix: "" },
    { code: "NZ", name: `New Zealand (Aotearoa)`, prefix: "" },
    { code: "OM", name: `Oman`, prefix: "" },
    { code: "PA", name: `Panama`, prefix: "" },
    { code: "PE", name: `Peru`, prefix: "" },
    { code: "PF", name: `French Polynesia`, prefix: "" },
    { code: "PG", name: `Papua New Guinea`, prefix: "" },
    { code: "PH", name: `Philippines`, prefix: "" },
    { code: "PK", name: `Pakistan`, prefix: "" },
    { code: "PL", name: `Poland`, prefix: "" },
    { code: "PM", name: `Saint Pierre and Miquelon`, prefix: "" },
    { code: "PM", name: `St. Pierre & Miquelon`, prefix: "" },
    { code: "PN", name: `Pitcairn Islands`, prefix: "" },
    { code: "PR", name: `Puerto Rico`, prefix: "" },
    { code: "PS", name: `Palestinian Territory`, prefix: "" },
    { code: "PT", name: `Portugal`, prefix: "" },
    { code: "PW", name: `Palau`, prefix: "" },
    { code: "PY", name: `Paraguay`, prefix: "" },
    { code: "QA", name: `Qatar`, prefix: "" },
    { code: "RE", name: `Reunion`, prefix: "" },
    { code: "RO", name: `Romania`, prefix: "" },
    { code: "RS", name: `Serbia`, prefix: "" },
    { code: "RU", name: `Russian Federation`, prefix: "" },
    { code: "RW", name: `Rwanda`, prefix: "" },
    { code: "SA", name: `Saudi Arabia`, prefix: "" },
    { code: "SB", name: `Solomon Islands`, prefix: "" },
    { code: "SC", name: `Seychelles`, prefix: "" },
    { code: "SD", name: `Sudan`, prefix: "" },
    { code: "SE", name: `Sweden`, prefix: "" },
    { code: "SG", name: `Singapore`, prefix: "" },
    { code: "SH", name: `Saint Helena`, prefix: "" },
    { code: "SI", name: `Slovenia`, prefix: "" },
    { code: "SJ", name: `Svalbard and Jan Mayen`, prefix: "" },
    { code: "SK", name: `Slovakia`, prefix: "" },
    { code: "SL", name: `Sierra Leone`, prefix: "" },
    { code: "SM", name: `San Marino`, prefix: "" },
    { code: "SN", name: `Senegal`, prefix: "" },
    { code: "SO", name: `Somalia`, prefix: "" },
    { code: "SR", name: `Suriname`, prefix: "" },
    { code: "SS", name: `South Sudan`, prefix: "" },
    { code: "ST", name: `Sao Tome and Principe`, prefix: "" },
    { code: "SV", name: `El Salvador`, prefix: "" },
    { code: "SX", name: `Sint Maarten`, prefix: "" },
    { code: "SY", name: `Syria`, prefix: "" },
    { code: "SZ", name: `Swaziland`, prefix: "" },
    { code: "TC", name: `Turks and Caicos Islands`, prefix: "" },
    { code: "TD", name: `Chad`, prefix: "" },
    { code: "TF", name: `French Southern and Antarctic Lands`, prefix: "" },
    { code: "TG", name: `Togo`, prefix: "" },
    { code: "TH", name: `Thailand`, prefix: "" },
    { code: "TJ", name: `Tajikistan`, prefix: "" },
    { code: "TK", name: `Tokelau`, prefix: "" },
    { code: "TL", name: `Timor-Leste`, prefix: "" },
    { code: "TM", name: `Turkmenistan`, prefix: "" },
    { code: "TN", name: `Tunisia`, prefix: "" },
    { code: "TO", name: `Tonga`, prefix: "" },
    { code: "TR", name: `Turkey`, prefix: "" },
    { code: "TT", name: `Trinidad and Tobago`, prefix: "" },
    { code: "TV", name: `Tuvalu`, prefix: "" },
    { code: "TW", name: `Taiwan`, prefix: "" },
    { code: "TZ", name: `Tanzania`, prefix: "" },
    { code: "UA", name: `Ukraine`, prefix: "" },
    { code: "UG", name: `Uganda`, prefix: "" },
    { code: "UM", name: `United States Minor Outlying Islands`, prefix: "" },
    { code: "US", name: `United States`, prefix: "" },
    { code: "UY", name: `Uruguay`, prefix: "" },
    { code: "UZ", name: `Uzbekistan`, prefix: "" },
    { code: "VA", name: `Vatican City State`, prefix: "" },
    { code: "VC", name: `Saint Vincent and the Grenadines`, prefix: "" },
    { code: "VE", name: `Venezuela`, prefix: "" },
    { code: "VG", name: `Virgin Islands (British)`, prefix: "" },
    { code: "VI", name: `Virgin Islands (U.S.)`, prefix: "" },
    { code: "VN", name: `Vietnam`, prefix: "" },
    { code: "VU", name: `Vanuatu`, prefix: "" },
    { code: "WF", name: `Wallis and Futuna`, prefix: "" },
    { code: "WS", name: `Samoa`, prefix: "" },
    { code: "YE", name: `Yemen`, prefix: "" },
    { code: "YT", name: `Mayotte`, prefix: "" },
    { code: "ZA", name: `South Africa`, prefix: "" },
    { code: "ZM", name: `Zambia`, prefix: "" },
    { code: "ZW", name: `Zimbabwe`, prefix: "" },
  ];

export const countriesByName = [...countries].sort((a, b) =>
  a.name.localeCompare(b.name)
);

interface FlagProps {
  country: CountryCode;
  size?: number;
}

export const Flag = ({ country, size = 32 }: FlagProps) => {
  const countryIndex = countries.findIndex((c) => c.code === country);
  const countryData = countries[countryIndex];

  const cols = 16;
  const rows = 16;

  const w = size;
  const h = (size / 4) * 3;

  const bgWidth = cols * w;
  const bgHeight = rows * h;

  const x = countryIndex % cols;
  const y = Math.floor(countryIndex / rows);

  const posX = x * w;
  const posY = y * h;

  return (
    <span
      style={{
        display: "inline-block",
        width: w,
        height: h,
        background: "url(/assets/flags-spritesheet.png)",
        // backgroundRepeat: "no-repeat",
        backgroundPositionX: -posX,
        backgroundPositionY: -posY,
        backgroundSize: `${bgWidth}px ${bgHeight}px`,
        // objectFit: "none",
      }}
      aria-label={`Flag of ${countryData.name}`}
    ></span>
  );
};
