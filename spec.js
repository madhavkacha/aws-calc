//https://github.com/sakshisingla/Protractor-Non-Angular-Tests/wiki/Creating-test-scripts-using-Protractor-for-non-angular-application
//https://scriptverse.academy/tutorials/protractor-non-angular.html
//http://www.gjermundbjaanes.com/performing-a-rest-call-from-protractor-e2e-tests/

var Common = require('./request.js');
var myCommon = new Common();

describe('AWS Pricing Calculator', function() {

      beforeAll(function() {
        browser.ignoreSynchronization = true;

        myCommon.send().then(function () {
          console.log("URL: " + myCommon.url);
          browser.driver.get(myCommon.url, 20000);
        });
      });

      it('Data is correct?', function() {

          var e = element(by.id('current-group-label'));
          var EC = protractor.ExpectedConditions;
          var condition = EC.textToBePresentInElement(e, 'E2ETest');
          browser.wait(condition, 15000, 'text is still not present').then(function() 
          {
              e.getText().then(function (text) {
                  expect(text).toEqual('E2ETestEdit');
              });
          });

          element.all(by.css('.price-banner-cell')).each(function(element, index)
          {
              element.getText().then(function (text) {

                if(text.includes("Total upfront"))
                {
                  var upfront = parseFloat(text.replace("Total upfront","").replace(" USD","").replace(/,/g,""));
                  console.log(upfront);
                  expect(upfront).toEqual(963100.00);
                }
                
                if(text.includes("Total monthly"))
                {
                  var monthly = parseFloat(text.replace("Total monthly","").replace(" USD","").replace(/,/g,""));
                  console.log(monthly);
                  expect(monthly).toEqual(10055.75);
                }
              });

          });

          //SAVE AND SHARE

          element.all(by.css('.awsui-button-variant-primary')).first().click();

          browser.driver.sleep(5000);

          element.all(by.css('.awsui-checkbox-label')).first().click();

          browser.driver.sleep(5000);

          element(by.id('awsui-input-1')).getAttribute("value").then(function (value) {
            myCommon.url = value;
            console.log("URL: " + myCommon.url);
          });

      });

      it('Summary correct?', function() {

        browser.driver.get("https://dev.drwmi4wa6c6dl.amplifyapp.com/index_no_stats.html");

        browser.driver.sleep(5000);

        element(by.id('aws_calc_ext_summary_btn_open_modal')).click();

        element(by.id('aws_calc_ext_summary_choose_url_input')).sendKeys(myCommon.url);

        element(by.id('aws_calc_ext_summary_choose_url_action')).click();

        browser.driver.sleep(20000);

        expect(element(by.id('aws_calc_ext_summary_total_instances')).getText()).toEqual("9");
        expect(element(by.id('aws_calc_ext_summary_total_storage')).getText()).toEqual("19409 GB");
        expect(element(by.id('aws_calc_ext_summary_total_3yr')).getText()).toEqual("1299186.64 USD");
        expect(element(by.id('aws_calc_ext_summary_total_saps')).getText()).toEqual("1133539");

      });
});
