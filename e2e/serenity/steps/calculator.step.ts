import { Before, Given, Then, When } from 'cucumber';
import { by } from 'protractor';
import { Click, Enter, isVisible, Navigate, Target, Text, Wait } from '@serenity-js/protractor';
import { actorCalled, actorInTheSpotlight, Duration, engage, Task } from '@serenity-js/core';
import { Actors } from '../support/screenplay/actors';
import { Ensure, equals } from '@serenity-js/assertions';

class LeanPO {
  static destination = 'http://juliemr.github.io/protractor-demo/';
  static firstNumber = Target.the('First number').located(by.model('first'));
  static secondNumber = Target.the('Second number').located(by.model('second'));
  static goButton = Target.the('Go button').located(by.id('gobutton'));
  static latestResult = Target.the('Latest result').located(by.binding('latest'));
}

const LaunchTheApp = () => Task.where(
  `#actor launches the app`,
  Navigate.to(LeanPO.destination),
  Wait.until(LeanPO.firstNumber, isVisible())
);

Before(() => {
  engage(new Actors());
});

Given(/^(.*) have navigated to the calculator$/, (actorName: string) => actorCalled(actorName).attemptsTo(
  LaunchTheApp()
));

When('I add two numbers {string} and {string}', (string, string2) => actorInTheSpotlight().attemptsTo(
  Enter.theValue(string).into(LeanPO.firstNumber),
  Enter.theValue(string2).into(LeanPO.secondNumber),
  Click.on(LeanPO.goButton)
));

Then('the displayed output should be {string}', string => actorInTheSpotlight().attemptsTo(
  Wait.for(Duration.ofSeconds(3)),
  Ensure.that(Text.of(LeanPO.latestResult), equals(string))
));
