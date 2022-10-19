const axios = require("axios");

exports.callApi = async (requestURL, headers) => {
  headers.Authorization = "Basic " + process.env.SNOW_PASSWORD;
  const options = {
    headers
  };

  try {
    return await axios.default.get(requestURL, options);
  } catch (error) {
    console.log("Error getting calling API " + requestURL, error)
    throw error;
  }
};

buildRequestSearch = (query) => {
  let queryParameters = "";

  if (query.requestedFor) {
    queryParameters += "&request.requested_for.u_ad_object_id=" + query.requestedFor;
  }

  if (query.catalogItem) {
    queryParameters += "&cat_item=" + query.catalogItem;
  }

  return queryParameters;
}

exports.findRequests = async (query) => {
  const requestEndpoint = process.env.SNOW_API_URL + "/" + process.env.SNOW_REQUEST_ENDPOINT;

  let queryParameters = "?sysparm_fields=request";
  queryParameters += "&sysparm_limit=" + (query.limit ? query.limit : "5");
  queryParameters += "&sysparm_display_value=true";
  queryParameters += "&sysparm_exclude_reference_link=true";
  queryParameters += buildRequestSearch(query);
  queryParameters = encodeURI(queryParameters);

  let response = await this.callApi(requestEndpoint + queryParameters, {});

  return response.data;
}

exports.getRequestDetails = async (query) => {
  const requestEndpoint = process.env.SNOW_API_URL + "/" + process.env.SNOW_DAR_ENDPOINT;

  let headers = {};

  if (query.requestId) {
    if (Array.isArray(query.requestId)) {
      headers.Request = query.requestId.join(",");
    } else {
      headers.Request = query.requestId;
    }
  }

  let requestDetails = (await this.callApi(requestEndpoint, headers)).data.result;

  for (const reqProperty in (requestDetails)) {
    let request = requestDetails[reqProperty];
    request.id = reqProperty;
  }
  const response = [];
  for (const request of Object.values(requestDetails)) {
    const updated = this.toCamelCase(request, "task_");

    updated.taskData = updated.data;
    delete updated.data;

    if (updated.taskData) {
      for (const task of updated.taskData) {
        task.requestId = request.id;
      }
    }

    response.push(updated);
  }

  return response;
}

exports.toCamelCase = (object, prefix) => {
  var newO, origKey, newKey, value;
  if (object instanceof Array) {
    return object.map((value) => {
      if (typeof value === "object") {
        value = this.toCamelCase(value, prefix);
      }
      return value;
    })
  } else {
    newO = {};
    for (origKey in object) {
      if (object.hasOwnProperty(origKey)) {
        value = object[origKey];
        if (!value) {
          continue;
        }
        newKey = origKey.startsWith(prefix) ? origKey.slice(prefix.length) : origKey;
        newKey =
          (newKey.charAt(0).toLowerCase() + newKey.slice(1) || newKey)
            .split("_")
            .reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1)).toString();
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = this.toCamelCase(value, prefix);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

exports.findAndSaveRequests = async (query) => {
  const requests = await this.findRequests(query);

  if (requests.result.length == 0)
    return [];

  const requestIDs = requests.result.map((item) => item['request']);

  const requestDetails = await this.getRequestDetails({ requestId: requestIDs });

  return requestDetails;
}

exports.removeElement = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}