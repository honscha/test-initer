#!/usr/bin/env node

const fs = require('fs');
const clipboardy = require('clipboardy');

const [, , ...args] = process.argv;

const lifecyleEvents = [
  'ngOnChanges',
  'ngOnInit',
  'ngDoCheck',
  'ngAfterContentInit',
  'ngAfterContentChecked',
  'ngAfterViewInit',
  'ngAfterViewChecked',
  'ngOnDestroy',
];

fs.readFile(`./${args[0]}.component.ts`, 'utf8', (err, data) => {
  if (err) {
    return fs.readFile(
      `./${args[0]}/${args[0]}.component.ts`,
      'utf8',
      (err, data) => {
        if (err) {
          return console.error(err);
        }

        start(data);
      }
    );
  }

  start(data);
});

function start(data) {
  const matches = data.match(/([a-zA-Z])\w+\(.*\).*{/g);
  let getters = data.match(/get ([a-zA-Z])\w+/g);

  getters = getters && getters.map((getter) => getter && getter.split(' ')[1]);

  const functions = getFunctions(
    matches,
    getters,
    !!args.find((arg) => arg === '--lifecycle')
  );

  if (!!args.find((arg) => arg === '--clipboard')) {
    clipboardy.writeSync(funcToText(functions));
  } else {
    console.log(funcToText(functions));
  }
}

function getFunctions(matches, getters, includeLifeCycle = false) {
  const dic = [];
  matches.forEach((match) => {
    let funcName = match.split('(')[0];
    params = getParams(match);
    if (
      !(getters && getters.find((getter) => getter === funcName)) &&
      !(
        !includeLifeCycle &&
        lifecyleEvents.find((lifecycle) => lifecycle === funcName)
      )
    ) {
      dic.push({ funcName, params });
    }
  });

  return dic;
}

function getParams(match) {
  rawParams = match
    .split('(')[1]
    .split(')')[0]
    .split(',')
    .filter((item) => item && item !== '');
  return rawParams.map((param) => {
    let optional = false;
    if (param.includes('?')) {
      optional = true;
    }
    const splitParam = param.split(':').map((param) => param.trim());
    const paramName = splitParam.shift().replace('?', '');
    const type = splitParam.length > 0 ? splitParam.join(':') : 'any';
    return {
      paramName,
      type,
      optional,
    };
  });
}

function funcToText(functions) {
  return functions
    .map((func) => {
      return `
describe('${func.funcName}'), () => {
  /*
  * Params:
  * ${paramsToText(func.params)}
  */

  it('should work', ()=> {})
  it('shouldnt work', ()=> {})
}
`;
    })
    .join('\n');
}

function paramsToText(params) {
  return params
    .map(
      (param) =>
        `${param.paramName}: ${param.type} ${
          param.optional ? '(optional)' : ''
        }`
    )
    .join('\n  * ');
}
