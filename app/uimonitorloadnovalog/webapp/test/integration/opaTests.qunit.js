sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/uimonitorloadnovalog/uimonitorloadnovalog/test/integration/FirstJourney',
		'com/uimonitorloadnovalog/uimonitorloadnovalog/test/integration/pages/LoadList',
		'com/uimonitorloadnovalog/uimonitorloadnovalog/test/integration/pages/LoadObjectPage'
    ],
    function(JourneyRunner, opaJourney, LoadList, LoadObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/uimonitorloadnovalog/uimonitorloadnovalog') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheLoadList: LoadList,
					onTheLoadObjectPage: LoadObjectPage
                }
            },
            opaJourney.run
        );
    }
);