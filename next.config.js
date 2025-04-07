// const rewriteRules = [
//   "my-bookings",
//   'new-booking',
//   "payment",
//   "quotation",
//   'terms',
//   "reservations-document",
//   "transfer-details",
//   "contact-us",
// ];
module.exports = {
  // basePath: '/Agency',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
    });

    return config;
  },
  images: {
    domains: ['api.london-tech.com'],
  },
  env: {
    mapApiKey: "AIzaSyDulwIwncfuxBve8MKXPIIPmPLRve6ySw8",
  },

  async redirects() {

    // Extra redirects (if any)
    const axtraReDirection = [{
      source: '/about-us',
      destination: '/',
      permanent: true
    },
    {
      source: '/airports',
      destination: '/',
      permanent: true
    },
    {
      source: '/api/v1/payment/elavon/create',
      destination: '/',
      permanent: true
    },
    {
      source: '/api/v1/payment/paypal/create',
      destination: '/',
      permanent: true
    },
    {
      source: '/api/v1/payment/stripe/create',
      destination: '/',
      permanent: true
    },
    {
      source: '/corporate',
      destination: '/',
      permanent: true
    },
    {
      source: '/new-istanbul-airport',
      destination: '/',
      permanent: true
    }
      , {
      source: '/news',
      destination: '/',
      permanent: true
    }, {
      source: '/sabiha-gokcen-airport',
      destination: '/',
      permanent: true
    }
    ];

    // Combine all redirects
    return [
      ...axtraReDirection,
    ];
  }
  ,
};
