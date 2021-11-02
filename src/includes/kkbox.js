import { Auth, Api } from '@kkbox/kkbox-js-sdk';

// Create an auth object with client id and secret
const auth = new Auth(
  '544cc7f885faf94ba175792c5269ddf4',
  '64c8ab6bdbbeff4ee159847a60633009',
);
// Feotch your access tken
auth.clientCredentialsFlow
  .fetchAccessToken()
  .then((response) => {
    const accessToken = response.data.access_token;

    // Create an API object with your access token
    const api = new Api(accessToken);

    // Fetch content with various fetchers
    api.searchFetcher
      .setSearchCriteria('五月天 派對動物', 'track')
      .fetchSearchResult()
      // eslint-disable-next-line no-shadow
      .then((response) => {
        // Content from the KKBOX Open API
        console.log(response.data);

        // Continue to the next page
        // eslint-disable-next-line no-shadow
        api.searchFetcher.fetchNextPage(response).then((response) => {
          console.log(response.data);
        });
      });
  });
