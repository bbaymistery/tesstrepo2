module.exports = {
  images: {
    domains: ["q-taxis.com", "'widget.reviews.co.uk'"],
  },
  // "assetPrefix": "https://www.london-heathrow.taxi",
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
    });

    return config;
  },
  env: {
    mapApiKey: "AIzaSyDulwIwncfuxBve8MKXPIIPmPLRve6ySw8",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: "UA-99673497-1",
  },
};
