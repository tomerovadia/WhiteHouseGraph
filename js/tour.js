var introJs = require("intro.js");

export default () => {

  setTimeout(() => {
    introJs.introJs().setOptions({
      exitOnOverlayClick: true,
      showStepNumbers: false,
      showProgress: true,
      hideNext: true,
      hidePrev: true,
      steps: [
        {intro: "<div style='font-size:15px;'><h3><b>White House Graph</b></h3>This visualization depicts the fields and domains from which <b>President Trump</b> and <b>President Obama</b> drew their cabinet secretaries and staff members.<br><br>Click <b>Next</b> below to begin a tour.<br><br></div>"},
        {
          intro: '<b>The President</b> is at the <b>center.</b>',
          element: document.querySelector("g[id='White House Institution']")
        },
        {
          intro: 'His <b>staff</b> surrounds him.',
          element: document.querySelector("g[id='KellyanneConwayNode']")
        },
        {
          intro: 'Many of his <b>former staff members</b> are included and dimmed.',
          element: document.querySelector("g[id='SteveBannonNode']")
        },
        {
          intro: '<b>Solid lines</b> connect <b><i>current</i> White House staffers</b> to the President</b>.',
          element: document.querySelector('#KellyanneConwayWhiteHouseLink')
        },
        {
          intro: '<b>Dashed, dimmed lines</b> connect <b><i>former</i> White House staffers</b> to the President</b>.',
          element: document.querySelector('#SteveBannonWhiteHouseLink')
        },
        {
          intro: "On the outer ring are <b>clusters of institutions</b> where White House staff members worked previously, <b>colored and clustered</b> by <b>field</b>.<br><br>For example, you can see that many of President Trump's advisers from the <b>RNC</b> have departed.",
          element: document.querySelector("line[id='ReincePriebusRNCLink']")
        },
        {
          intro: "You can also see that many of President Trump's advisers have come from the <b>business community</b>.",
          element: document.querySelector("line[id='AnthonyScaramucciWhiteHouseLink']")
        },
        {
          intro: "Use this control panel to toggle between <b>administrations</b>.",
          element: document.querySelector("#control-panel"),
          onToolTipShow: () => alert('asdf')
        },
        {intro: "That should be enough to get you started. Enjoy!"},
      ]
    }).start();
  }, 1500)
}
