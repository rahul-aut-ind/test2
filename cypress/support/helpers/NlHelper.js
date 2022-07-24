class NlHelper {
  /**
   * Extract parameter value from list of links
   * @param  {Array} links - String list of links
   * @param  {string} parameterName - For example 'wpset'
   * @return {Array} - List of link and parameter value
   * */
  extractParameterValues = function (links, parameterName) {
    /** @type {URL} */
    let linkUrl;
    /** @type {*[]} */
    let result = [];

    for (let i = 0; i < links.length; i++) {
      linkUrl = new URL(links[i].toString());
      result.push({
        link: linkUrl.href,
        parameterValue: linkUrl.searchParams.get(parameterName),
      });
    }
    return result;
  };

  /**
   * Extract parameter value from list of links and compares for equality
   * @param  {Array} arrayOfValues - List of link and parameter value
   * @param  {string} parameterValue
   * @return {boolean} - boolean result
   * */
  checkValueForEquality = function (
    arrayOfValues,
    keyToCheck = "parameterValue"
  ) {
    let valueToCheck = arrayOfValues[0][keyToCheck];
    let result = arrayOfValues.every((link) => {
      return link[keyToCheck] == valueToCheck;
    });
    return result;
  };

  /**
   * Returns a data object from a given fixture
   * @param  {string} fixture - fixture name
   * @return {JSON}
   * */
  getTestData = (fixture) => require("../../fixtures/" + fixture);
}
export default NlHelper;
