window.dxSample = {};

const generale = {"island_type": ""};
const cere = {"island_type": "CERE"};
const cn = {"island_type": "CN"};
const defpl = {"island_type": "DEFPL"};
const it = {"island_type": "IT"};

$(function () {
	$.when(
	  $.getJSON("lib/globalize/cldr/main/it/ca-gregorian.json"),
	  $.getJSON("lib/globalize/cldr/main/it/numbers.json"),
	  $.getJSON("lib/globalize/cldr/main/it/currencies.json"),
	  $.getJSON("lib/globalize/cldr/supplemental/likelySubtags.json"),
	  $.getJSON("lib/globalize/cldr/supplemental/timeData.json"),
	  $.getJSON("lib/globalize/cldr/supplemental/weekData.json"),
	  $.getJSON("lib/globalize/cldr/supplemental/currencyData.json"),
	  $.getJSON("lib/globalize/cldr/supplemental/numberingSystems.json")
	).then(function () {
		return [].slice.apply(arguments, [0]).map(function (result) {
			return result[0];
		});
	}).then(
		Globalize.load
	).then(function () {
			Globalize.locale('it');
			console.log("globolize");
	}).then(
		function(){$.when(
			$.get("lib/globalize/localization/dx.all.it.json")
		).then(function(data){
				Globalize.loadMessages(data);
				 
					dxSample.app = new DevExpress.framework.html.HtmlApplication({
						namespace: dxSample,
						mode: 'webSite',
						navigation: [{title: "clock", onExecute: "#clock" }]
					});
				
					dxSample.app.router.register(":view/:loginHand/:isola/:data/:navigate/:login", { view: undefined, loginHand: undefined, isola: undefined, data: undefined, navigate: undefined, login: undefined });

					dxSample.app.navigate({ view: "clock" , login:{ } });
				 
			});
		}
	)
	
});