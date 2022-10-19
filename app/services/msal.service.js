const axios = require("axios");
const config = require("../config/msal.config");

exports.callApi = async (requestURL) => {
  const accessToken = await config.getAccessToken();

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ConsistencyLevel: "eventual"
    }
  };

  try {
    return await axios.default.get(requestURL, options);
  } catch (error) {
    console.log("Error calling API " + requestURL, error)
    throw error;
  }
};

buildFilterQuery = (filter) => {
  if (!filter) {
    return "";
  }

  let query = "&$filter=";

  let first = true;
  for (const property in filter) {
    if (!first) {
      query += " and ";
    } else {
      first = !first;
    }
    query += `startswith(${property}, '${filter[property]}')`;
  }

  return query;
}

buildSearchQuery = (search) => {
  if (!search) {
    return "";
  }

  let query = "&$search=";

  let first = true;
  for (const property in search) {
    if (!first) {
      query += " OR ";
    } else {
      first = !first;
    }
    query += `\"${property}:${search[property]}\"`;
  }

  return query;
}

buildCSVQuery = (elements, operator) => {
  if (!elements) {
    return "";
  }
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  let query = operator;

  let first = true;
  elements.forEach(element => {
    if (!first) {
      query += ", ";
    } else {
      first = !first;
    }
    query += element;
  })

  return query;
}

trySortByNameRelevance = (response, query) => {
  if (response && response.data && response.data.value && query && !query.sort && (query.filter || query.search)) {
    const filter = (query.search) ? query.search : query.filter;

    const givenSelected = !query.select || query.select.includes('givenName');
    let hasGivenFilter = 'givenName' in filter;
    let givenFilter = (hasGivenFilter) ? filter['givenName'].trim().toLowerCase() : '';

    const surSelected = !query.select || query.select.includes('surname');
    let hasSurFilter = 'surname' in filter;
    let surFilter = (hasSurFilter) ? filter['surname'].trim().toLowerCase() : '';

    const displaySelected = !query.select || query.select.includes('displayName');
    let hasDisplayFilter = 'displayName' in filter;
    let displayFilter = (hasDisplayFilter) ? filter['displayName'].trim().toLowerCase() : '';

    if (hasDisplayFilter && (!hasGivenFilter || !hasSurFilter)) {
      const firstSpaceIndex = displayFilter.indexOf(' ');

      if (!hasGivenFilter && givenSelected) {
        hasGivenFilter = true;
        givenFilter = (firstSpaceIndex != -1) ?
          displayFilter.substring(0, firstSpaceIndex) :
          displayFilter;
      }

      if (!hasSurFilter && surSelected && firstSpaceIndex != -1) {
        hasSurFilter = true;
        surFilter = displayFilter.substring(firstSpaceIndex);
      }
    }

    if (!hasDisplayFilter && (hasGivenFilter || hasSurFilter)) {
      hasDisplayFilter = true;
      displayFilter = (givenFilter + ' ' + surFilter).trim();
    }

    response.data.value.sort((a, b) => {
      let aGiven = (a.givenName) ? a.givenName.trim().toLowerCase() : '';
      let aSur = (a.surname) ? a.surname.trim().toLowerCase() : '';
      let aDisplay = (a.displayName) ? a.displayName.trim().toLowerCase() : '';

      let bGiven = (b.givenName) ? b.givenName.trim().toLowerCase() : '';
      let bSur = (b.surname) ? b.surname.trim().toLowerCase() : '';
      let bDisplay = (b.displayName) ? b.displayName.trim().toLowerCase() : '';

      if (hasGivenFilter && givenSelected) {
        const exactMatch = compareValues(aGiven, bGiven, givenFilter);
        if (exactMatch) {
          return exactMatch;
        }
      }

      if (hasSurFilter && surSelected) {
        const exactMatch = compareValues(aSur, bSur, surFilter);
        if (exactMatch) {
          return exactMatch;
        }
      }

      if (hasDisplayFilter) {
        if (!displaySelected) {
          aDisplay = aGiven + aSur;
          bDisplay = bGiven + bSur;
        }

        const exactMatch = compareValues(aDisplay, bDisplay, displayFilter);
        if (exactMatch) {
          return exactMatch;
        } else {
          return aDisplay.indexOf(displayFilter) - bDisplay.indexOf(displayFilter);
        }
      }

      return 0;
    })
  }
}

compareValues = (a, b, value) => {
  const aExact = a === value;
  const bExact = b === value;
  if (aExact && !bExact) {
    return -1;
  }
  else if (bExact && !aExact) {
    return 1;
  }
}

exports.searchUsers = async (query) => {
  const usersEndpoint = process.env.GRAPH_ENDPOINT + "/" + process.env.GRAPH_VERSION + "/users";

  //Count required for advanced query
  let queryParameters = "?$count=true";
  queryParameters += buildFilterQuery(query.filter);
  queryParameters += buildSearchQuery(query.search);
  queryParameters += buildCSVQuery(query.sort, "&$orderBy=");
  queryParameters += buildCSVQuery(query.select, "&$select=");
  queryParameters = encodeURI(queryParameters);

  let response = await this.callApi(usersEndpoint + queryParameters);

  trySortByNameRelevance(response, query);

  return response;
}