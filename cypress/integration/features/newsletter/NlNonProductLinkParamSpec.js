import NlTemplatePO from "../../../support/pageObjects/NlTemplatePO";
import NlHelper from "../../../support/helpers/NlHelper";
/// <reference types="Cypress" />

describe("Shopping QA Challenge: Newsletter Testing", () => {
  /** @type {NlHelper} */
  const nlHelper = new NlHelper();

  /** @type {object} */
  const nlUrlList = nlHelper.getTestData("nlUrls.json");

  //   //hard coded and outdated test data -> new test data is in nlUrls.json
  //   /** @type {string} */
  //   let nlUrl =
  //     "https://news.shopping.check24.de/u/gm.php?prm=VDLjGz1AeJ_766749435_6267609_1";
  //   nlUrl = "./cypress/fixtures/20220715-Category-Mailing_Haushalt.html";

  //   /** @type {NlTemplatePO} */
  //   const nlTemplatePO = new NlTemplatePO(nlUrl);

  Object.keys(nlUrlList).forEach(function (category, index) {
    /** @type {string} */
    let nlUrl = nlUrlList[category];

    /** @type {NlTemplatePO} */
    const nlTemplatePO = new NlTemplatePO(nlUrl);

    // Ignore errors from the site itself
    Cypress.on("uncaught:exception", () => {
      return false;
    });

    let arrayOfLinks = [],
      arrayOfLinkAttributes = [];

    it(
      "C962349 Check if utm_campaign value of all non product links is the same, tested " +
        category +
        " newsletter url: " +
        nlUrlList[category],
      async () => {
        //open nl
        cy.visit(nlTemplatePO.url);
        /*Add your test code here*/
        //filter out all links which contain utm_campaign
        arrayOfLinks = await nlTemplatePO.getLinksByElementAttribute(
          '[href*="utm_campaign"]',
          "href"
        );
        //check if the links were found
        expect(arrayOfLinks).not.to.be.empty;
        cy.log(arrayOfLinks);

        //check if all paramter values are equal to each other
        arrayOfLinkAttributes = nlHelper.extractParameterValues(
          arrayOfLinks,
          "utm_campaign"
        );
        cy.log(arrayOfLinkAttributes);
        expect(
          nlHelper.checkValueForEquality(
            arrayOfLinkAttributes,
            "parameterValue"
          )
        ).to.be.true;
      }
    );

    it(
      "C955682 Check if wpset value of all non product links is the same, tested " +
        category +
        " newsletter url: " +
        nlUrlList[category],
      async () => {
        //open nl
        cy.visit(nlTemplatePO.url);
        /*Add your test code here*/
        //filter out all links which contain wpset
        arrayOfLinks = await nlTemplatePO.getLinksByElementAttribute(
          '[href*="wpset"]',
          "href"
        );
        //check if the links were found
        expect(arrayOfLinks).not.to.be.empty;
        cy.log(arrayOfLinks);

        //check if all paramter values are equal to each other
        arrayOfLinkAttributes = nlHelper.extractParameterValues(
          arrayOfLinks,
          "wpset"
        );
        cy.log(arrayOfLinkAttributes);
        expect(
          nlHelper.checkValueForEquality(
            arrayOfLinkAttributes
            //"parameterValue"
          )
        ).to.be.true;
      }
    );
  });
});
